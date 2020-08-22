import React, { FC } from "react";

import { IPlaylistItem } from "shared/interfaces/youtube.interfaces";
import { IThumbnail } from "shared/interfaces/custom.interfaces";
import { getPlaylistVideos } from "services/youtube.service";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";

import { LoadMoreButton } from "components/button/load-more-button.component";
import { ThumbnailGrid } from "components/thumbnail-grid/thumbnail-grid.component";

interface IProps {
  playlistId: string;
}
export const PlaylistVideosThumbnailGrid: FC<IProps> = ({ playlistId }) => {
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
    thumbnailUrl: video.snippet.thumbnails.medium.url,
    title: video.snippet.title
  }));

  return (
    <>
      <ThumbnailGrid items={thumbnails} />
      <LoadMoreButton hasMoreItems={hasMoreVideos} isLoading={isLoading} loadItems={loadVideos} />
    </>
  )
};
