import React, { FC, useState, useEffect } from "react";

import { IScrollListHeader, IScrollListVideos } from "shared/interfaces/custom.interfaces";

import { PlaylistScrollList } from "./playlist-scroll-list.component";
import { Button } from "../button/button.component";
import { selectPlaylistVideos, selectIsFetching, fetchPlaylistVideosStart, fetchCurrentPlaylistStart, selectCurrentPlaylist, selectHasMoreVideos } from "redux/playlist";
import { useSelector, useDispatch } from "react-redux";

export const YouTubePlaylistScrollList: FC = () => {
  const [headerDetails, setHeaderDetails] = useState<IScrollListHeader>();
  const [videosDetails, setVideoDetails] = useState<IScrollListVideos>();
  const videos = useSelector(selectPlaylistVideos);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const isFetching = useSelector(selectIsFetching);
  const hasMoreVideos = useSelector(selectHasMoreVideos);
  const dispatch = useDispatch();

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
  }, [videos.length]); // eslint-disable-line

  function handleInitialLoad() {
    dispatch(fetchCurrentPlaylistStart());
    handleLoadMoreVideos();
  }

  function handleLoadMoreVideos() {
    dispatch(fetchPlaylistVideosStart());
  }

  // Render
  if (videos.length <= 0) return <Button centered onClick={handleInitialLoad}>LOAD PLAYLIST</Button>;
  if (!headerDetails || !videosDetails) return null;

  return (
    <PlaylistScrollList
      headerDetails={headerDetails} 
      videosDetails={videosDetails}
      isLoading={isFetching}
    />
  );
}
