import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { IScrollListHeader, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { getQueryParams } from "shared/helpers";
import { PlaylistScrollListHeader } from "./playlist-scroll-list-header.component";
import { PlaylistScrollListVideos } from "./playlist-scroll-list-videos.component";

interface IProps {
  isLoading: boolean;
  headerDetails: IScrollListHeader;
  videosDetails: IScrollListVideos;
}

export const PlaylistScrollList: FC<IProps> = ({ isLoading, headerDetails, videosDetails }) => {    
  const location = useLocation();
  const [watchingVideoIdx, setWatchingVideoIdx] = useState(0);

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const currentVideoId = queryParams.query["v"];

    // `v` query param exists
    if (typeof currentVideoId === "string") {
      const playlistVideos = videosDetails.videos;
      const currentVideoIdx = playlistVideos.findIndex((video) => video.videoId === currentVideoId);

      setWatchingVideoIdx(currentVideoIdx);
    }
  }, [videosDetails.videos, location])

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