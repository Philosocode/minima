import {
  EPlaylistConstants,
  ISetNextPageToken,
  ISetHasMoreVideos,
  IFetchCurrentPlaylistStart,
  IFetchCurrentPlaylistSuccess,
  IFetchCurrentPlaylistFailure,
  IFetchPlaylistVideosStart,
  IFetchPlaylistVideosSuccess,
  IFetchPlaylistVideosFailure,
  ISetPlaylistId,
  IClearPlaylist,
} from "./playlist.types";
import { IScrollListVideo } from "shared/interfaces/custom.interfaces";
import { IPlaylist } from "shared/interfaces/youtube.interfaces";

export const clearPlaylist = (): IClearPlaylist => ({
  type: EPlaylistConstants.CLEAR_PLAYLIST
});

export const setPlaylistId = (id: string): ISetPlaylistId => ({
  type: EPlaylistConstants.SET_PLAYLIST_ID,
  payload: id
});

export const setNextPageToken = (pageToken: string): ISetNextPageToken => ({
  type: EPlaylistConstants.SET_NEXT_PAGE_TOKEN,
  payload: pageToken
});

export const setHasMoreVideos = (hasMore: boolean): ISetHasMoreVideos => ({
  type: EPlaylistConstants.SET_HAS_MORE_VIDEOS,
  payload: hasMore
});

// Saga Actions
export const fetchCurrentPlaylistStart = (): IFetchCurrentPlaylistStart => ({
  type: EPlaylistConstants.FETCH_CURRENT_PLAYLIST_START,
});

export const fetchCurrentPlaylistSuccess = (playlist: IPlaylist): IFetchCurrentPlaylistSuccess => ({
  type: EPlaylistConstants.FETCH_CURRENT_PLAYLIST_SUCCESS,
  payload: playlist
});

export const fetchCurrentPlaylistFailure = (): IFetchCurrentPlaylistFailure => ({
  type: EPlaylistConstants.FETCH_CURRENT_PLAYLIST_FAILURE
});

export const fetchPlaylistVideosStart = (): IFetchPlaylistVideosStart => ({
  type: EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_START,
});

export const fetchPlaylistVideosSuccess = (videos: IScrollListVideo[]): IFetchPlaylistVideosSuccess => ({
  type: EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_SUCCESS,
  payload: videos
});

export const fetchPlaylistVideosFailure = (): IFetchPlaylistVideosFailure => ({
  type: EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_FAILURE,
});
