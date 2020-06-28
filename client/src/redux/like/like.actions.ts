import {
  LikeConstants,
  ILikeVideo,
  IUnlikeVideo
} from "./like.types";

export const likeVideo = (videoId: string): ILikeVideo => ({
  type: LikeConstants.LIKE_VIDEO,
  payload: videoId
});

export const unlikeVideo = (videoId: string): IUnlikeVideo => ({
  type: LikeConstants.UNLIKE_VIDEO,
  payload: videoId
});