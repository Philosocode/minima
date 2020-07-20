import { useDispatch, useSelector } from "react-redux";
import { likeResource, unlikeResource, selectLikedChannels } from "redux/like";

import { DbCollectionType } from "shared/interfaces/firebase.interfaces";

export function useLike(
  collectionName: DbCollectionType,
  resourceId: string,
  selector: typeof selectLikedChannels
): [boolean, () => void] {
  const likedResources = useSelector(selector);
  const isLiked = likedResources.includes(resourceId);
  const dispatch = useDispatch();

  function toggleLike() {
    isLiked
      ? dispatch(unlikeResource(collectionName, resourceId))
      : dispatch(likeResource(collectionName, resourceId));
  }
  
  return [isLiked, toggleLike];
}