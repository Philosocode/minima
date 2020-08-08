import { Dispatch } from "redux";

import {
  LikeConstants,
  ILikeState,
} from "./like.types";
import { addLikeToDb, removeLikeFromDb } from "apis/firebase.api";
import { DbLikeType } from "shared/interfaces/firebase.interfaces";

export const loadAllLikes = (allLikes: ILikeState) => ({
  type: LikeConstants.LOAD_ALL_LIKES,
  payload: allLikes
});

export const likeResource = (
  collectionName: DbLikeType,
  resourceId: string,
  userId: string
) => async (dispatch: Dispatch) => {
  try {
    await addLikeToDb(collectionName, resourceId, userId);

    dispatch({ type: LikeConstants.LIKE_RESOURCE, collectionName, payload: resourceId });
  }
  catch (err) {
    throw new Error(err);
  }
}

export const unlikeResource = (
  collectionName: DbLikeType,
  resourceId: string,
  userId: string,
) => async (dispatch: Dispatch) => {
  try {
    await removeLikeFromDb(collectionName, resourceId, userId);

    dispatch({ type: LikeConstants.UNLIKE_RESOURCE, collectionName, payload: resourceId });
  }
  catch (err) {
    throw new Error(err);
  }
};