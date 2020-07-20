import { Dispatch } from "redux";

import {
  LikeConstants,
  ILikeState,
} from "./like.types";
import { addLikeToDb, removeLikeFromDb } from "apis/firebase.api";
import { DbCollectionType } from "shared/interfaces/firebase.interfaces";

export const loadAllLikes = (allLikes: ILikeState) => ({
  type: LikeConstants.LOAD_ALL_LIKES,
  payload: allLikes
});

export const likeResource = (
  collectionName: DbCollectionType,
  resourceId: string,
) => async (dispatch: Dispatch) => {
  try {
    await addLikeToDb(collectionName, resourceId);

    dispatch({ type: LikeConstants.LIKE_RESOURCE, collectionName, payload: resourceId });
  }
  catch (err) {
    throw new Error(err);
  }
}

export const unlikeResource = (
  collectionName: DbCollectionType,
  resourceId: string,
) => async (dispatch: Dispatch) => {
  try {
    await removeLikeFromDb(collectionName, resourceId);

    dispatch({ type: LikeConstants.UNLIKE_RESOURCE, collectionName, payload: resourceId });
  }
  catch (err) {
    throw new Error(err);
  }
};