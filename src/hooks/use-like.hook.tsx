import { useDispatch, useSelector } from "react-redux";
import { likeResourceStart, unlikeResourceStart } from "redux/like";

import { DbLikeType } from "shared/interfaces/firebase.interfaces";

export function useLike(
  collectionName: DbLikeType,
  resourceId: string,
  selector: any
): [boolean, () => void] {
  /**
   * Hook for reading and updating liked resources.
   * 
   * @param collectionName - the collection to query
   * @param resourceId - the ID of the resource (e.g. video ID, channel ID)
   * @param selector - selector for the resource
   * 
   * @returns [resourceLiked, toggleResourceLiked]
   */
  const likedResources = useSelector(selector) as any[];
  const isLiked = likedResources.find(item => item.id === resourceId);
  const dispatch = useDispatch();

  function toggleLike() {
    isLiked
      ? dispatch(unlikeResourceStart({ collectionName }))
      : dispatch(likeResourceStart({ collectionName }));
  }
  
  return [isLiked, toggleLike];
}