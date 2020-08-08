import React, { FC } from "react";
import { IScrollListHeader } from "shared/interfaces/custom.interfaces";

interface IProps {
  headerDetails: IScrollListHeader;
  watchingVideoIdx: number;
}

export const ScrollListHeader: FC<IProps> = ({ watchingVideoIdx, headerDetails }) => {
  const { playlistTitle, totalVideos, channelTitle } = headerDetails;

  return (
    <div className="c-playlist-scroll-list__header">
      <div className="c-playlist-scroll-list__content">
        <h3 className="c-heading c-heading--small c-playlist-scroll-list__title">{playlistTitle}</h3>
        <div className="c-playlist-scroll-list__sub-text">
          {
            channelTitle && <div className="c-playlist-scroll-list__creator">{channelTitle}</div>
          }
          <div className="c-playlist-scroll-list__video-count">{watchingVideoIdx} / {totalVideos - 1}</div>
        </div>
      </div>
    </div>
  )
}