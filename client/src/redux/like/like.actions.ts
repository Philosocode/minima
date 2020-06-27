import {
  LikeConstants,
  ILikeVideo,
  IUnlikeVideo
} from "./like.types";

export const favoriteVideo = (videoId: string): ILikeVideo => ({
  type: LikeConstants.LIKE_VIDEO,
  payload: videoId
});

export const unfavoriteVideo = (videoId: string): IUnlikeVideo => ({
  type: LikeConstants.UNLIKE_VIDEO,
  payload: videoId
});