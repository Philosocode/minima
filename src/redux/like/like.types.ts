import { DbLikeType } from "shared/interfaces/firebase.interfaces";

export enum LikeConstants {
  LOAD_ALL_LIKES = "LOAD_ALL_LIKES",
  LIKE_RESOURCE = "LIKE_RESOURCE",
  UNLIKE_RESOURCE = "UNLIKE_RESOURCE"
};

/* ACTIONS */
export interface ILoadAllLikes {
  type: LikeConstants.LOAD_ALL_LIKES,
  payload: ILikeState
};

export interface ILikeResource {
  type: LikeConstants.LIKE_RESOURCE,
  collectionName: DbLikeType,
  payload: string;
}

export interface IUnlikeResource {
  type: LikeConstants.UNLIKE_RESOURCE,
  collectionName: DbLikeType,
  payload: string;
}

export interface ILikeState {
  channels: string[];
  playlists: string[];
  music: string[];
  videos: string[];
}

export type LikeAction =
  | ILoadAllLikes
  | ILikeResource
  | IUnlikeResource;