import { useState, useEffect } from "react";

interface IOptions {
  doInitialLoad?: boolean;
  shouldReverseItems?: boolean;
}
export function useFetchPaginatedResource<ResourceType>(
  loadMoreCb: (resourceId: string, nextPageToken?: string) => Promise<{ nextPageToken?: string, items: ResourceType[] }>,
  resourceId: string,
  options?: IOptions,
) {
  /**
   * Hook for fetching paginated resources.
   * 
   * @param loadMoreCb - callback to load more resources
   * @param resourceId - the ID of the resource
   * @param shouldReverseItems - whether or not resources should be reversed on fetch
   * 
   * @returns items, hasMore, isLoading, loadResources, setItems, setNextPageToken, setHasMore
   */

  const [items, setItems] = useState<ResourceType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (options?.doInitialLoad) loadResources();
  }, []); // eslint-disable-line

  async function loadResources() {
    if (!hasMore) return;

    setIsLoading(true);

    try {
      const res = await loadMoreCb(resourceId, nextPageToken);

      // A nextPageToken means there are more items to load
      res.nextPageToken
        ? setNextPageToken(res.nextPageToken)
        : setHasMore(false);

      // Some item types should be added in reverse order (e.g. replies to a thread)
      // e.g. thread replies are ordered from newest to oldest, but we want oldest to newest
      const updatedItems = (options?.shouldReverseItems)
        ? items.concat(res.items.reverse())
        : items.concat(res.items);

      setItems(updatedItems);
    }
    catch (err) {
      throw new Error(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  return { 
    items, hasMore, isLoading, loadResources, 
    setItems, setNextPageToken, setHasMore
  };
}