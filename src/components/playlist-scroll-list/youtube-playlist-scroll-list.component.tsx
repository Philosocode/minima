import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IScrollListHeader } from "shared/interfaces/custom.interfaces";
import { selectIsFetching, selectCurrentPlaylist, fetchCurrentPlaylistStart, fetchPlaylistVideosStart, selectShowingVideos } from "redux/playlist";

import { PlaylistScrollList } from "./playlist-scroll-list.component";
import { Button } from "components/button/button.component";

export const YouTubePlaylistScrollList: FC = () => {
  const [headerDetails, setHeaderDetails] = useState<IScrollListHeader>();
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const isFetching = useSelector(selectIsFetching);
  const videos = useSelector(selectShowingVideos);
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

  function handleLoadVideos() {
    dispatch(fetchCurrentPlaylistStart());
    dispatch(fetchPlaylistVideosStart());
  }

  // Render
  if (videos.length <= 0) return <Button centered onClick={handleLoadVideos}>LOAD PLAYLIST</Button>;
  if (!headerDetails) return null;

  return (
    <PlaylistScrollList
      headerDetails={headerDetails} 
      isLoading={isFetching}
    />
  );
}
