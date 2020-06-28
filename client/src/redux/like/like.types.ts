export enum LikeConstants {
  LOAD_ALL_LIKES = "LOAD_ALL_LIKES",
  LIKE_VIDEO = "LIKE_VIDEO",
  UNLIKE_VIDEO = "UNLIKE_VIDEO",
};

// TODO: https://stackoverflow.com/questions/47181789/limit-object-properties-to-keyof-interface
/* ACTIONS */
export interface ILoadAllLikes {
  type: LikeConstants.LOAD_ALL_LIKES,
  payload: ILikeState
};

export interface ILikeVideo {
  type: LikeConstants.LIKE_VIDEO;
  payload: string;
}

export interface IUnlikeVideo {
  type: LikeConstants.UNLIKE_VIDEO;
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
  | ILikeVideo
  | IUnlikeVideo;