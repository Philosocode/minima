import React, { FC } from "react";

interface IProps {
  channelTitle: string;
  currentVideoIdx: number;
  totalVideos: number;
  videoTitle: string;
}

export const PlaylistScrollHeader: FC<IProps> = ({ channelTitle, currentVideoIdx, totalVideos, videoTitle }) => {
  return (
    <div className="c-playlist-scroll-list__header">
      <div className="c-playlist-scroll-list__content">
        <h3 className="c-heading c-heading--small c-playlist-scroll-list__title">{videoTitle}</h3>
        <div className="c-playlist-scroll-list__sub-text">
          <div className="c-playlist-scroll-list__creator">{channelTitle}</div>
          <div className="c-playlist-scroll-list__video-count">{currentVideoIdx} / {totalVideos - 1}</div>
        </div>
      </div>
    </div>
  )
}