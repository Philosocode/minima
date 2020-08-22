import React, { FC } from "react";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { IThumbnail } from "shared/interfaces/custom.interfaces";
import { getChannelPlaylists } from "services/youtube.service";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";
import { ThumbnailGrid } from "components/thumbnail-grid/thumbnail-grid.component";
import { Loader } from "components/loader/loader.component";
import { Button } from "components/button/button.component";

interface IProps {
  channelId: string;
}
export const PlaylistsThumbnailGrid: FC<IProps> = ({ channelId }) => {
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

  return (
    <>
      <ThumbnailGrid items={thumbnails} />
      { getLoadMoreButton() }
    </>
  )
};
