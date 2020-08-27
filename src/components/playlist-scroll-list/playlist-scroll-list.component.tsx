import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentVideoId } from "redux/video";
import { selectScrollListLoaded, selectShowingVideos, fetchCurrentPlaylistStart, fetchPlaylistVideosStart } from "redux/playlist";
import { IScrollListHeader } from "shared/interfaces/custom.interfaces";

import { PlaylistScrollListHeader } from "./playlist-scroll-list-header.component";
import { PlaylistScrollListVideos } from "./playlist-scroll-list-videos.component";
import { Loader } from "components/loader/loader.component";
import { Button } from "components/button/button.component";

interface IProps {
  isLoading: boolean;
  headerDetails: IScrollListHeader;
}

export const PlaylistScrollList: FC<IProps> = ({ isLoading, headerDetails }) => {    
  const [watchingVideoIdx, setWatchingVideoIdx] = useState(0);
  const videos = useSelector(selectShowingVideos);
  const currentVideoId = useSelector(selectCurrentVideoId);
  const scrollListLoaded = useSelector(selectScrollListLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videos.length <= 0) return;

    const currentVideoIdx = videos.findIndex((video) => video.videoId === currentVideoId);

    setWatchingVideoIdx(currentVideoIdx);
  }, [currentVideoId, videos]);

  function handleInitialLoad() {
    dispatch(fetchCurrentPlaylistStart());
    dispatch(fetchPlaylistVideosStart());
  }

  if (videos.length <= 0) return <Button centered onClick={handleInitialLoad}>LOAD PLAYLIST</Button>;
  if (!scrollListLoaded) return <Loader position="center-horizontal" />;

  return (
    <div className="c-card">
      <PlaylistScrollListHeader
        headerDetails={headerDetails} 
        watchingVideoIdx={watchingVideoIdx}
      />
      <PlaylistScrollListVideos
        isLoading={isLoading}
        watchingVideoIdx={watchingVideoIdx}
      />
    </div>
  );
}