import { IScrollListVideo } from "shared/interfaces/custom.interfaces";
import { IPlaylist } from "shared/interfaces/youtube.interfaces";

export enum EPlaylistConstants {
  SET_PLAYLIST_ID = "SET_PLAYLIST_ID",
  SET_HAS_MORE_VIDEOS = "SET_HAS_MORE_VIDEOS",
  SET_NEXT_PAGE_TOKEN = "SET_NEXT_PAGE_TOKEN",
  CLEAR_PLAYLIST = "CLEAR_PLAYLIST",
  FETCH_CURRENT_PLAYLIST_START = "FETCH_CURRENT_PLAYLIST_START",
  FETCH_CURRENT_PLAYLIST_SUCCESS = "FETCH_CURRENT_PLAYLIST_SUCCESS",
  FETCH_CURRENT_PLAYLIST_FAILURE = "FETCH_CURRENT_PLAYLIST_FAILURE",
  FETCH_PLAYLIST_VIDEOS_START = "FETCH_PLAYLIST_VIDEOS_START",
  FETCH_PLAYLIST_VIDEOS_SUCCESS = "FETCH_PLAYLIST_VIDEOS_SUCCESS",
  FETCH_PLAYLIST_VIDEOS_FAILURE = "FETCH_PLAYLIST_VIDEOS_FAILURE",
};

export interface IPlaylistState {
  id: string;
  currentPlaylist?: IPlaylist;
  videos: IScrollListVideo[];
  showingVideos: IScrollListVideo[];
  nextPageToken: string;
  hasMoreVideos: boolean;
  isFetching: boolean;
}

/* ACTIONS */
// Regular Actions
export interface IClearPlaylist {
  type: EPlaylistConstants.CLEAR_PLAYLIST;
}

export interface ISetPlaylistId {
  type: EPlaylistConstants.SET_PLAYLIST_ID;
  payload: string;
}

export interface ISetNextPageToken {
  type: EPlaylistConstants.SET_NEXT_PAGE_TOKEN;
  payload: string;
}

export interface ISetHasMoreVideos {
  type: EPlaylistConstants.SET_HAS_MORE_VIDEOS;
  payload: boolean;
}

// Async Actions
export interface IFetchCurrentPlaylistStart {
  type: EPlaylistConstants.FETCH_CURRENT_PLAYLIST_START;
};
export interface IFetchCurrentPlaylistSuccess {
  type: EPlaylistConstants.FETCH_CURRENT_PLAYLIST_SUCCESS;
  payload: IPlaylist;
};
export interface IFetchCurrentPlaylistFailure {
  type: EPlaylistConstants.FETCH_CURRENT_PLAYLIST_FAILURE;
};

export interface IFetchPlaylistVideosStart {
  type: EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_START;
}

export interface IFetchPlaylistVideosSuccess {
  type: EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_SUCCESS;
  payload: IScrollListVideo[];
}

export interface IFetchPlaylistVideosFailure {
  type: EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_FAILURE;
}

export type TPlaylistAction =
  | IClearPlaylist
  | ISetPlaylistId
  | ISetNextPageToken
  | ISetHasMoreVideos
  | IFetchCurrentPlaylistStart
  | IFetchCurrentPlaylistSuccess
  | IFetchCurrentPlaylistFailure
  | IFetchPlaylistVideosStart
  | IFetchPlaylistVideosSuccess
  | IFetchPlaylistVideosFailure;