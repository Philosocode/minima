import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IScrollListHeader, ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { selectPlaylistVideos, selectIsFetching, fetchPlaylistVideosStart } from "redux/playlist";
import { PlaylistScrollList } from "./playlist-scroll-list.component";
import { Button } from "components/button/button.component";

export const CustomPlaylistScrollList: FC = () => {
  const videos = useSelector(selectPlaylistVideos);
  const isFetching = useSelector(selectIsFetching);
  const [headerDetails, setHeaderDetails] = useState<IScrollListHeader>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (videos.length <= 0) return;

    setHeaderDetails({
      playlistTitle: "Liked Songs",
      playlistId: ECustomPlaylistTypes.MUSIC,
      totalVideos: videos.length,
    });
  }, [videos]);

  function handleLoadVideos() {
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