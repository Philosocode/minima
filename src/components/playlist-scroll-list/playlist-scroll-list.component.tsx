import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectCurrentVideoId } from "redux/video";
import { IScrollListHeader, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { PlaylistScrollListHeader } from "./playlist-scroll-list-header.component";
import { PlaylistScrollListVideos } from "./playlist-scroll-list-videos.component";

interface IProps {
  isLoading: boolean;
  headerDetails: IScrollListHeader;
  videosDetails: IScrollListVideos;
}

export const PlaylistScrollList: FC<IProps> = ({ isLoading, headerDetails, videosDetails }) => {    
  const [watchingVideoIdx, setWatchingVideoIdx] = useState(0);
  const currentVideoId = useSelector(selectCurrentVideoId);

  useEffect(() => {
    const playlistVideos = videosDetails.videos;
    const currentVideoIdx = playlistVideos.findIndex((video) => video.videoId === currentVideoId);

    setWatchingVideoIdx(currentVideoIdx);
  }, [currentVideoId, videosDetails.videos]);

  return (
    <div className="c-card">
      <PlaylistScrollListHeader
        headerDetails={headerDetails} 
        watchingVideoIdx={watchingVideoIdx}
      />
      <PlaylistScrollListVideos
        isLoading={isLoading}
        videosDetails={videosDetails}
        watchingVideoIdx={watchingVideoIdx}
      />
    </div>
  );
}