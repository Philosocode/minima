import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IScrollListHeader, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { fetchPlaylistVideosStart, selectPlaylistVideos, selectIsFetching } from "redux/playlist";
import { Button } from "components/button/button.component";
import { PlaylistScrollList } from "./playlist-scroll-list.component";

export const CustomPlaylistScrollList: FC = () => {
  const videos = useSelector(selectPlaylistVideos);
  const isFetching = useSelector(selectIsFetching);
  const [headerDetails, setHeaderDetails] = useState<IScrollListHeader>();
  const [videosDetails, setVideoDetails] = useState<IScrollListVideos>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (videos.length <= 0) return;

    setHeaderDetails({
      playlistTitle: "Liked Songs",
      playlistId: "music",
      totalVideos: videos.length,
    });

    setVideoDetails({ hasMoreVideos: false, videos });
  }, [videos]);

  function loadVideos() {
    dispatch(fetchPlaylistVideosStart());
  }

  // Render
  if (videos.length <= 0) return <Button centered onClick={loadVideos}>LOAD PLAYLIST</Button>;
  if (!videosDetails || !headerDetails) return null;

  return (
    <PlaylistScrollList
      headerDetails={headerDetails} 
      videosDetails={videosDetails}
      isLoading={isFetching}
    />
  );
}