import { Dispatch } from "redux";

import {
  LikeConstants,
  ILikeVideo,
  IUnlikeVideo,
  ILikeState,
} from "./like.types";
import { addLikeToDb, removeLikeFromDb } from "apis/firebase.api";

export const loadAllLikes = (allLikes: ILikeState) => ({
  type: LikeConstants.LOAD_ALL_LIKES,
  payload: allLikes
});

export const likeVideo = (videoId: string) => async (dispatch: Dispatch) => {
  try {
    await addLikeToDb("videos", videoId);

    dispatch<ILikeVideo>({
      type: LikeConstants.LIKE_VIDEO,
      payload: videoId
    });
  }
  catch (err) {
    throw new Error(err);
  }
};

export const unlikeVideo = (videoId: string) => async (dispatch: Dispatch) => {
  try {
    await removeLikeFromDb("videos", videoId);

    dispatch<IUnlikeVideo>({
      type: LikeConstants.UNLIKE_VIDEO,
      payload: videoId
    });
  }
  catch (err) {
    throw new Error(err);
  }
};
