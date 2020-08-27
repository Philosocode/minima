import { takeLatest, put, all, call, select } from "redux-saga/effects";

import {
  getPlaylistVideos,
  fetchLikedVideos,
  getPlaylistDetails,
  getPlaylistVideosUntilCurrentVideo,
} from "services/youtube.service";
import {
  IPlaylistItemsResponse,
  IPlaylistItem,
  IVideo,
} from "shared/interfaces/youtube.interfaces";
import { IScrollListVideo, ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { selectUserId } from "redux/auth";
import { selectCurrentVideo } from "redux/video";
import {
  selectNextPageToken,
  selectPlaylistId,
  selectPlaylistVideos,
} from "./playlist.selectors";
import {
  setNextPageToken,
  setHasMoreVideos,
  fetchPlaylistVideosSuccess,
  fetchPlaylistVideosFailure,
  fetchCurrentPlaylistFailure,
  fetchCurrentPlaylistSuccess,
  fetchPlaylistVideosStart,
} from "./playlist.slice";
import { fetchCurrentPlaylistStart } from "./playlist.slice";

export function* playlistSagas() {
  yield all([
    call(fetchCurrentPlaylistWatcher),
    call(fetchPlaylistVideosWatcher),
  ]);
}

// Fetch Current Playlist
function* fetchCurrentPlaylistWatcher() {
  yield takeLatest(fetchCurrentPlaylistStart.type, fetchCurrentPlaylistWorker);
}

function* fetchCurrentPlaylistWorker() {
  try {
    const playlistId = yield select(selectPlaylistId);
    const playlistDetails = yield getPlaylistDetails(playlistId);

    yield put(fetchCurrentPlaylistSuccess(playlistDetails));
  } catch (err) {
    yield put(fetchCurrentPlaylistFailure());
  }
}

// Fetch Playlist Videos
function* fetchPlaylistVideosWatcher() {
  yield takeLatest(
    fetchPlaylistVideosStart.type,
    fetchPlaylistVideosWorker
  );
}

function* fetchPlaylistVideosWorker() {
  try {
    const playlistId = yield select(selectPlaylistId);

    if (playlistId === ECustomPlaylistTypes.MUSIC || playlistId === ECustomPlaylistTypes.VIDEOS) {
      return yield fetchCustomPlaylistVideos(playlistId);
    }

    const loadedVideos = yield select(selectPlaylistVideos);

    loadedVideos.length <= 0
      ? yield initialFetchYouTubePlaylistVideos(playlistId)
      : yield fetchYouTubePlaylistVideos(playlistId);
  } catch (err) {
    yield put(fetchPlaylistVideosFailure());
  }
}

function* fetchCustomPlaylistVideos(customPlaylistType: ECustomPlaylistTypes) {
  try {
    const userId = yield select(selectUserId);

    const res =
      customPlaylistType === ECustomPlaylistTypes.MUSIC
        ? yield fetchLikedVideos("music", userId)
        : yield fetchLikedVideos("videos", userId);

    const likedVideos = res as IVideo[];

    const convertedVideos: IScrollListVideo[] = likedVideos.map((video) => ({
      channelTitle: video.snippet.channelTitle,
      playlistId: customPlaylistType,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      title: video.snippet.title,
      videoId: video.id,
    }));

    yield put(setHasMoreVideos(false));
    yield put(fetchPlaylistVideosSuccess(convertedVideos));
  } catch (err) {
    throw new Error(err);
  }
}

function* fetchYouTubePlaylistVideos(playlistId: string) {
  try {
    const nextPageToken = yield select(selectNextPageToken);
    const res = (yield getPlaylistVideos(
      playlistId,
      nextPageToken
    )) as IPlaylistItemsResponse;

    res.nextPageToken
      ? yield put(setNextPageToken(res.nextPageToken))
      : yield put(setHasMoreVideos(false));

    const convertedVideos: IScrollListVideo[] = res.items.map((video) => ({
      channelTitle: video.snippet.channelTitle,
      playlistId,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      title: video.snippet.title,
      videoId: video.snippet.resourceId.videoId,
    }));

    yield put(fetchPlaylistVideosSuccess(convertedVideos));
  } catch (err) {
    throw new Error(err);
  }
}

function* initialFetchYouTubePlaylistVideos(playlistId: string) {
  try {
    const watchingVideo = (yield select(selectCurrentVideo)) as
      | IVideo
      | undefined;
    if (!watchingVideo) throw new Error("Current video not found.");

    const watchingVideoId = watchingVideo.id;

    const [
      fetchedVideos,
      pageToken,
    ] = (yield getPlaylistVideosUntilCurrentVideo(
      watchingVideoId,
      playlistId
    )) as [IPlaylistItem[], string];

    if (pageToken) {
      yield put(setNextPageToken(pageToken));
    } else {
      yield put(setHasMoreVideos(false));
    }

    const convertedVideos: IScrollListVideo[] = fetchedVideos.map((video) => ({
      channelTitle: video.snippet.channelTitle,
      playlistId,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      title: video.snippet.title,
      videoId: video.snippet.resourceId.videoId,
    }));

    yield put(fetchPlaylistVideosSuccess(convertedVideos));
  } catch (err) {
    throw new Error(err);
  }
}
