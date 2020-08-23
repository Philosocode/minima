import React, { FC, useState, useEffect } from "react";

import { IScrollListHeader, IScrollListVideos } from "shared/interfaces/custom.interfaces";

import { Loader } from "components/loader/loader.component";
import { PlaylistScrollList } from "./playlist-scroll-list.component";
import { Button } from "../button/button.component";
import { selectPlaylistVideos, selectIsFetching, fetchPlaylistVideosStart, fetchCurrentPlaylistStart, selectCurrentPlaylist, selectHasMoreVideos } from "redux/playlist";
import { useSelector, useDispatch } from "react-redux";

export const YouTubePlaylistScrollList: FC = () => {
  const videos = useSelector(selectPlaylistVideos);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const isFetching = useSelector(selectIsFetching);
  const hasMoreVideos = useSelector(selectHasMoreVideos);
  const dispatch = useDispatch();

  const [headerDetails, setHeaderDetails] = useState<IScrollListHeader>();
  const [videosDetails, setVideoDetails] = useState<IScrollListVideos>();

  useEffect(() => {
    if (!currentPlaylist) return;

    setHeaderDetails({
      channelTitle: currentPlaylist.snippet.channelTitle,
      channelId: currentPlaylist.snippet.channelId,
      totalVideos: currentPlaylist.contentDetails.itemCount,
      playlistId: currentPlaylist.id,
      playlistTitle: currentPlaylist.snippet.title
    });
  }, [currentPlaylist]);

  useEffect(() => {
    if (videos.length <= 0) return;
    
    setVideoDetails({ hasMoreVideos, videos, loadMoreVideos: handleLoadMoreVideos });
  }, [videos]); // eslint-disable-line

  function handleInitialLoad() {
    dispatch(fetchCurrentPlaylistStart());
    handleLoadMoreVideos();
  }

  function handleLoadMoreVideos() {
    dispatch(fetchPlaylistVideosStart());
  }

  // Render
  if (videos.length <= 0) return <Button centered onClick={handleInitialLoad}>LOAD PLAYLIST</Button>;
  if (isFetching) return <Loader position="center-horizontal" />;

  if (!headerDetails || !videosDetails) return null;

  return (
    <PlaylistScrollList
      headerDetails={headerDetails} 
      videosDetails={videosDetails}
      isLoading={isFetching}
    />
  );
}

/*
import React, { FC, useState } from "react";

import { IPlaylist, IPlaylistItem } from "shared/interfaces/youtube.interfaces";
import { IScrollListHeader, IScrollListVideo, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { getPlaylistDetails, getPlaylistVideos, MISSING_THUMBNAIL_URL, getPlaylistVideosUntilCurrentVideo } from "services/youtube.service";

import { Loader } from "components/loader/loader.component";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";
import { PlaylistScrollList } from "./playlist-scroll-list.component";
import { Button } from "../button/button.component";

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

  function getLoadPlaylistsButton() {
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
  if (!playlistDetails || playlistVideos.length <= 0) return getLoadPlaylistsButton();

  const headerDetails: IScrollListHeader = {
    channelTitle: playlistDetails.snippet.channelTitle,
    channelId: playlistDetails.snippet.channelId,
    totalVideos: playlistDetails.contentDetails.itemCount,
    playlistId: playlistDetails.id,
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
*/