import React, { FC } from "react";
import { IScrollListHeader } from "shared/interfaces/custom.interfaces";

interface IProps {
  headerDetails: IScrollListHeader;
  watchingVideoIdx: number;
}

export const PlaylistScrollListHeader: FC<IProps> = ({ watchingVideoIdx, headerDetails }) => {
  const { playlistTitle, totalVideos, channelTitle } = headerDetails;

  return (
    <div className="c-playlist-scroll-list__header">
      <div className="c-playlist-scroll-list__text">
        <h3 className="c-heading c-playlist-scroll-list__title">{playlistTitle}</h3>
        {
          channelTitle && <h4 className="c-heading c-heading--small c-playlist-scroll-list__creator">{channelTitle}</h4>
        }
        <h4 className="c-heading c-heading--small">{watchingVideoIdx} / {totalVideos - 1}</h4>
      </div>
    </div>
  )
}