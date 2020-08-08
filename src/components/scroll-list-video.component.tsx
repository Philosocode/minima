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

export const ScrollListVideo: FC<IProps> = ({ idxInList, isCurrentVideo, videoDetails }) => {
  const { channelTitle, playlistId, thumbnailUrl, title, videoId } = videoDetails;
  const videoUrl = `/watch?v=${videoId}&list=${playlistId}&index=${idxInList}`;

  const containerClass = classNames({
    "c-playlist-scroll-video__container": true,
    "is-current": isCurrentVideo
  });

  return (
    <Link to={videoUrl} className={containerClass} onClick={scrollToTop}>
      <div className="c-playlist-scroll-video__image-container">
        <img className="c-playlist-scroll-video__image" src={thumbnailUrl} alt={title} />
        <div className="c-playlist-scroll-video__index">{idxInList}</div>
      </div>
      <div className="c-playlist-scroll-video__text-container">
        <h3 className="c-heading c-heading--tiny c-playlist-scroll-video__title">{title}</h3>
        <h4 className="c-playlist-scroll-video__uploader">{channelTitle}</h4>
      </div>
    </Link>
  );
}