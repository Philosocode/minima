export enum LikeConstants {
  LIKE_VIDEO = "LIKE_VIDEO",
  UNLIKE_VIDEO = "UNLIKE_VIDEO",
};

// TODO: https://stackoverflow.com/questions/47181789/limit-object-properties-to-keyof-interface
/* ACTIONS */
export interface ILikeVideo {
  type: LikeConstants.LIKE_VIDEO;
  payload: string;
}

export interface IUnlikeVideo {
  type: LikeConstants.UNLIKE_VIDEO;
  payload: string;
}

export interface ILikeState {
  videos: string[];
}

export type LikeAction =
  | ILikeVideo
  | IUnlikeVideo;