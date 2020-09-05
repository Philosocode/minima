import React, { FC, memo } from "react";

import { getPlaylistVideos, MISSING_THUMBNAIL_URL } from "services/youtube.service";
import { IPlaylistItem } from "shared/interfaces/youtube.interfaces";
import { IThumbnail } from "shared/interfaces/custom.interfaces";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";

import { LoadMoreButton } from "components/button/load-more-button.component";
import { ThumbnailGrid } from "components/thumbnail-grid/thumbnail-grid.component";
import { NotFoundHeading } from "components/text/not-found-heading.component";

interface IProps {
  playlistId: string;
}
export const PlaylistVideosThumbnailGrid: FC<IProps> = memo(({ playlistId }) => {
  const {
    hasMore: hasMoreVideos,
    isLoading,
    items: videos,
    loadResources: loadVideos
  } = useFetchPaginatedResource<IPlaylistItem>(getPlaylistVideos, playlistId, { doInitialLoad: true });

  const thumbnails: IThumbnail[] = videos.map(video => ({
    date: video.snippet.publishedAt,
    id: video.id,
    resourceUrl: `/watch?v=${video.snippet.resourceId.videoId}&list=${playlistId}`,
    thumbnailUrl: video.snippet.thumbnails.medium?.url ?? MISSING_THUMBNAIL_URL,
    title: video.snippet.title
  }));

  if (!hasMoreVideos && videos.length === 0) {
    return <NotFoundHeading>No videos found...</NotFoundHeading>;
  }

  return (
    <>
      <ThumbnailGrid items={thumbnails} />
      <LoadMoreButton hasMoreItems={hasMoreVideos} isLoading={isLoading} loadItems={loadVideos} />
    </>
  )
});
