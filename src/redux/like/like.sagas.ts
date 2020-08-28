import { takeLatest, put, all, call, select } from "redux-saga/effects";

import { 
  IFetchAllLikesPayload,
  fetchAllLikesStart, fetchAllLikesSuccess, fetchAllLikesFailure, 
  likeResourceStart, likeResourceSuccess, likeResourceFailure,
  unlikeResourceStart, unlikeResourceSuccess, unlikeResourceFailure, ILikeResourceStart
} from "./like.slice";
import { getUserData, addLikeToDb, removeLikeFromDb } from "services/firebase.service";
import { DbLikeType } from "shared/interfaces/firebase.interfaces";
import { getResourcesByIds, getChannelDetails, getVideoDetails, getPlaylistDetails } from "services/youtube.service";
import { IChannel, IVideo, IPlaylist } from "shared/interfaces/youtube.interfaces";
import { selectUserId } from "redux/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { selectCurrentChannel } from "redux/channel";
import { selectCurrentPlaylist } from "redux/playlist";
import { selectCurrentVideo } from "redux/video";

export function* likeSagas() {
  yield all([
    call(likeResourceWatcher),
    call(unlikeResourceWatcher),
    call(fetchAllLikesWatcher),
  ]);
};

// Like Resource
function* likeResourceWatcher() {
  yield takeLatest(likeResourceStart.type, likeResourceWorker);
}

function* likeResourceWorker(action: PayloadAction<ILikeResourceStart>) {
  const resourceData = yield getResourceData(action);
  const { collectionName, resource, userId } = resourceData as IResourceData;

  try {
    yield addLikeToDb(collectionName, resource.id, userId);
    yield put(likeResourceSuccess(resourceData));
  }
  catch (err) {
    yield put(likeResourceFailure());
  }
}

// Unlike Resource
function* unlikeResourceWatcher() {
  yield takeLatest(unlikeResourceStart.type, unlikeResourceWorker);
}

function* unlikeResourceWorker(action: PayloadAction<ILikeResourceStart>) {
  const resourceData = yield getResourceData(action);
  const { collectionName, resource, userId } = resourceData as IResourceData;

  try {
    yield removeLikeFromDb(collectionName, resource.id, userId);
    yield put(unlikeResourceSuccess(resourceData));
  }
  catch (err) {
    yield put(unlikeResourceFailure());
  }
}

interface IResourceData {
  collectionName: DbLikeType;
  resource: IChannel | IPlaylist | IVideo;
  userId: string;
}

function* getResourceData(action: PayloadAction<ILikeResourceStart>) {
  const { collectionName } = action.payload;
  const userId = yield select(selectUserId);

  let resource: IChannel | IPlaylist | IVideo;
  if (collectionName === "channels") {
    resource = yield select(selectCurrentChannel);
  } else if (collectionName === "playlists") {
    resource = yield select(selectCurrentPlaylist);
  } else {
    resource = yield select(selectCurrentVideo);
  }

  return { collectionName, resource, userId };
}

// Fetch All Likes
function* fetchAllLikesWatcher() {
  yield takeLatest(fetchAllLikesStart.type, fetchAllLikesWorker);
}

function* fetchAllLikesWorker() {  
  try {
    const userId = yield select(selectUserId);
    const userData = yield getUserData(userId);
    const { channels, music, playlists, videos } = userData.likes;
    const requests: Promise<any>[] = [];
    const likedResourceTypes: DbLikeType[] = [];

    const hasLikedChannels = channels.length > 0;
    const hasLikedMusic = music.length > 0;
    const hasLikedPlaylists = playlists.length > 0;
    const hasLikedVideos = videos.length > 0;

    // Add all the requests into an ARR for Promise.allResolved
    if (hasLikedChannels) {
      requests.push(getResourcesByIds<IChannel>(channels, getChannelDetails))
      likedResourceTypes.push("channels");
    }

    if (hasLikedMusic) {
      requests.push(getResourcesByIds<IVideo>(music, getVideoDetails));
      likedResourceTypes.push("music");
    }

    if (hasLikedPlaylists) {
      requests.push(getResourcesByIds<IPlaylist>(playlists, getPlaylistDetails));
      likedResourceTypes.push("playlists");
    }

    if (hasLikedVideos) {
      requests.push(getResourcesByIds<IVideo>(videos, getVideoDetails));
      likedResourceTypes.push("videos");
    }

    // After loading up the ARR with the requests, make the requests
    const fetchedItems = yield Promise.all(requests);

    // Populate payload
    const userLikesPayload: IFetchAllLikesPayload = {};

    likedResourceTypes.forEach((resourceType, idx) => {
      // use reverse() to display the most recently added item at the top
      let itemsArr: any[] = fetchedItems[idx].reverse();

      if (resourceType === "channels") {
        userLikesPayload[resourceType] = itemsArr as IChannel[];
      } else if (resourceType === "playlists") {
        userLikesPayload[resourceType] = itemsArr as IPlaylist[];
      } else {
        userLikesPayload[resourceType] = itemsArr as IVideo[];
      }
    });

    yield put(fetchAllLikesSuccess(userLikesPayload));
  }
  catch (err) {
    yield put(fetchAllLikesFailure());
  }
}