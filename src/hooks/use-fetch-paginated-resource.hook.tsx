import { useState } from "react";

export function useFetchPaginatedResource<ResourceType>(
  loadMoreCb: (resourceId: string, nextPageToken?: string) => Promise<{ nextPageToken?: string, items: ResourceType[] }>,
  resourceId: string,
  shouldReverseItems?: boolean,
) {
  const [items, setItems] = useState<ResourceType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  async function loadResources() {
    if (!hasMore) return;
    
    try {
      setIsLoading(true);
      const res = await loadMoreCb(resourceId, nextPageToken);
      setIsLoading(false);

      // A nextPageToken means there are more items to load
      res.nextPageToken
        ? setNextPageToken(res.nextPageToken)
        : setHasMore(false);

      // Some item types should be added in reverse order (e.g. replies to a thread)
      // e.g. thread replies are ordered from newest to oldest, but we want oldest to newest
      const updatedItems = (shouldReverseItems)
        ? items.concat(res.items.reverse())
        : items.concat(res.items);

      setItems(updatedItems);
    }
    catch (err) {
      throw new Error(err);
    }
  }

  return { 
    items, hasMore, isLoading, loadResources, 
    setItems, setNextPageToken, setHasMore
  };
}