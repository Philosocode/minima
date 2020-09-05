import React, { FC, memo } from "react";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { IThumbnail } from "shared/interfaces/custom.interfaces";
import { getChannelPlaylists } from "services/youtube.service";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";
import { ThumbnailGrid } from "components/thumbnail-grid/thumbnail-grid.component";
import { Loader } from "components/loader/loader.component";
import { Button } from "components/button/button.component";
import { NotFoundHeading } from "components/text/not-found-heading.component";

interface IProps {
  channelId: string;
}
export const PlaylistsThumbnailGrid: FC<IProps> = memo(({ channelId }) => {
  const {
    hasMore: hasMorePlaylists,
    isLoading,
    items: playlists,
    loadResources: loadPlaylists
  } = useFetchPaginatedResource<IPlaylist>(getChannelPlaylists, channelId, { doInitialLoad: true });

  const thumbnails: IThumbnail[] = playlists.map(playlist => ({
    id: playlist.id,
    resourceUrl: `/playlist?list=${playlist.id}`,
    thumbnailUrl: playlist.snippet.thumbnails.medium.url,
    title: playlist.snippet.title,
    numItemsInPlaylist: playlist.contentDetails.itemCount
  }));

  function getLoadMoreButton() {
    if (isLoading) return <Loader position="center-horizontal" />;

    if (!isLoading && hasMorePlaylists) {
      return <Button centered onClick={loadPlaylists}>LOAD MORE</Button>
    }
  }

  if (!hasMorePlaylists && playlists.length === 0) {
    return <NotFoundHeading>No playlists found...</NotFoundHeading>;
  }

  return (
    <>
      <ThumbnailGrid items={thumbnails} />
      { getLoadMoreButton() }
    </>
  )
});
