import React, { FC, useState } from "react";

import { IPlaylist, IPlaylistItem } from "shared/interfaces/youtube.interfaces";
import { IScrollListHeader, IScrollListVideo, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { getPlaylistDetails, getPlaylistVideos, MISSING_THUMBNAIL_URL, getPlaylistVideosUntilCurrentVideo } from "services/youtube.service";

import { Loader } from "components/loader.component";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";
import { PlaylistScrollList } from "./playlist-scroll-list.component";
import { Button } from "./button/button.component";

interface IProps {
  playlistId: string;
  watchingVideoId: string;
}

export const YouTubePlaylistScrollList: FC<IProps> = ({ playlistId, watchingVideoId }) => {
  const [playlistDetails, setPlaylistDetails] = useState<IPlaylist>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    hasMore: hasMoreVideos,
    items: playlistVideos,
    loadResources: loadMoreVideos,
    setItems: setPlaylistVideos,
    setNextPageToken,
    setHasMore
  } = useFetchPaginatedResource<IPlaylistItem>(getPlaylistVideos, playlistId);

  async function handleLoadPlaylistVideos() {
    setIsLoading(true);

    await fetchPlaylistDetails();
    await initialFetchPlaylistVideos();

    setIsLoading(false);
  }

  async function fetchPlaylistDetails() {
    try {
      const playlistRes = await getPlaylistDetails(playlistId);

      setPlaylistDetails(playlistRes);
    } 
    catch(err) {
      alert(err);
    }
  }

  async function initialFetchPlaylistVideos() {
    try {
      const [fetchedVideos, pageToken] = await getPlaylistVideosUntilCurrentVideo(
        watchingVideoId,
        playlistId
      );

      setPlaylistVideos(fetchedVideos);

      pageToken
        ? setNextPageToken(pageToken)
        : setHasMore(false);
    }
    catch(err) {
      alert(err);
    }
  }

  function renderLoadPlaylistsButton() {
    return <Button centered onClick={handleLoadPlaylistVideos}>LOAD PLAYLIST</Button>;
  }

  function getVideos(): IScrollListVideo[] {
    return playlistVideos.map(video => {
      const thumbnailUrl = video.snippet.thumbnails.medium?.url ?? MISSING_THUMBNAIL_URL;
      
      return {
        playlistId: playlistId,
        title: video.snippet.title,
        thumbnailUrl: thumbnailUrl,
        channelTitle: video.snippet.channelTitle,
        videoId: video.snippet.resourceId.videoId,
      };
    });
  }

  // Render
  if (isLoading && playlistVideos.length <= 0) return <Loader position="center-horizontal" />
  if (!playlistDetails || playlistVideos.length <= 0) return renderLoadPlaylistsButton();

  const headerDetails: IScrollListHeader = {
    channelTitle: playlistDetails.snippet.channelTitle,
    totalVideos: playlistDetails.contentDetails.itemCount,
    playlistTitle: playlistDetails.snippet.title
  };

  const videosDetails: IScrollListVideos = { hasMoreVideos, loadMoreVideos, videos: getVideos() };

  return (
    <PlaylistScrollList
      headerDetails={headerDetails} 
      videosDetails={videosDetails}
      isLoading={isLoading}
    />
  );
}