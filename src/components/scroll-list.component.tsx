import React, { FC, useState, useEffect } from "react";

import { IScrollListHeader, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { ScrollListHeader } from "./scroll-list-header.component";
import { ScrollListVideos } from "./scroll-list-videos.component";
import { getQueryParams } from "shared/helpers";
import { useLocation } from "react-router-dom";

interface IProps {
  headerDetails: IScrollListHeader;
  videosDetails: IScrollListVideos;
  isLoading: boolean;
}

export const ScrollList: FC<IProps> = ({ isLoading, headerDetails, videosDetails }) => {    
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
    <div className="o-card c-playlist-scroll-list__container">
      <ScrollListHeader
        headerDetails={headerDetails} 
        watchingVideoIdx={watchingVideoIdx}
      />

      <ScrollListVideos
        videosDetails={videosDetails}
        isLoading={isLoading}
        watchingVideoIdx={watchingVideoIdx}
        setWatchingVideoIdx={setWatchingVideoIdx}
      />
    </div>
  );
}