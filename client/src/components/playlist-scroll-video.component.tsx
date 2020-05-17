import React, { FC, Dispatch, SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";

import { scrollToTop } from "shared/helpers";

interface IProps {
  indexInPlaylist: number;
  setWatchingVideoIdx: Dispatch<SetStateAction<number>>;
  thumbnailUrl: string;
  title: string;
  uploaderName: string;
  playlistId: string;
  videoId: string;
  watchingVideoId: string;
}

export const PlaylistScrollVideo: FC<IProps> = ({ indexInPlaylist, playlistId, setWatchingVideoIdx, thumbnailUrl, title, uploaderName, videoId, watchingVideoId }) => {
  const videoUrl = `/watch?v=${videoId}&list=${playlistId}&index=${indexInPlaylist}`;

  useEffect(() => {
    if (videoId === watchingVideoId) {
      setWatchingVideoIdx(indexInPlaylist);
    }
  }, [indexInPlaylist, videoId, watchingVideoId, setWatchingVideoIdx])

  function getContainerClasses() {
    let classes = "c-playlist-scroll-video__container";
    if (videoId === watchingVideoId) {
      classes += " c-playlist-scroll-video__container--current";
    }

    return classes;
  }

  return (
    <Link to={videoUrl} className={getContainerClasses()} onClick={scrollToTop}>
      <div className="c-playlist-scroll-video__image-container">
        <img className="c-playlist-scroll-video__image" src={thumbnailUrl} alt={title} />
        <div className="c-playlist-scroll-video__index">{indexInPlaylist}</div>
      </div>
      <div className="c-playlist-scroll-video__text-container">
        <h3 className="c-heading c-heading--tiny c-playlist-scroll-video__title">{title}</h3>
        <h4 className="c-playlist-scroll-video__uploader">{uploaderName}</h4>
      </div>
    </Link>
  );
}