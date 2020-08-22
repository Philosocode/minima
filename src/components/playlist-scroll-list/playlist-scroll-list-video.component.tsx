import React, { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { scrollToTop } from "shared/helpers";
import { IScrollListVideo } from "shared/interfaces/custom.interfaces";

interface IProps {
  idxInList: number;
  isCurrentVideo: boolean;
  videoDetails: IScrollListVideo;
}

export const PlaylistScrollListVideo: FC<IProps> = ({ idxInList, isCurrentVideo, videoDetails }) => {
  const { channelTitle, playlistId, thumbnailUrl, title, videoId } = videoDetails;
  const videoUrl = `/watch?v=${videoId}&list=${playlistId}&index=${idxInList}`;

  const containerClass = classNames({
    "c-playlist-scroll-list__video": true,
    "is-current": isCurrentVideo
  });

  const labelClasses  =classNames({
    "c-thumbnail__label c-thumbnail__label--index": true,
    "is-current": isCurrentVideo
  });

  return (
    <Link to={videoUrl} className={containerClass} onClick={scrollToTop}>
      <div className="c-thumbnail__image-container">
        <img className="c-thumbnail__image" src={thumbnailUrl} alt={title} />
        <div className={labelClasses}>{idxInList}</div>
      </div>

      <div className="c-thumbnail__text">
        <h3 className="c-heading">{title}</h3>
        <h4 className="c-heading--small c-playlist-scroll-list__video-channel">{channelTitle}</h4>
      </div>
    </Link>
  );
}