import { useDispatch, useSelector } from "react-redux";
import { likeResource, unlikeResource, selectLikedChannels } from "redux/like";

import { DbLikeType } from "shared/interfaces/firebase.interfaces";
import { useAuth } from "./use-auth.hook";

export function useLike(
  collectionName: DbLikeType,
  resourceId: string,
  selector: typeof selectLikedChannels
): [boolean, () => void] {
  const likedResources = useSelector(selector);
  const isLiked = likedResources.includes(resourceId);
  const dispatch = useDispatch();
  const userId = useAuth();

  function toggleLike() {
    isLiked
      ? dispatch(unlikeResource(collectionName, resourceId, userId))
      : dispatch(likeResource(collectionName, resourceId, userId));
  }
  
  return [isLiked, toggleLike];
}