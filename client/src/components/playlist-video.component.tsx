import React, { FC, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface IProps {
  index: number;
  setWatchingVideoIdx: Dispatch<SetStateAction<number>>;
  thumbnailUrl: string;
  title: string;
  uploaderName: string;
  playlistId: string;
  videoId: string;
  watchingVideoId: string;
}

export const PlaylistVideo: FC<IProps> = ({ index, playlistId, setWatchingVideoIdx, thumbnailUrl, title, uploaderName, videoId, watchingVideoId }) => {
  const videoUrl = `/watch?v=${videoId}&list=${playlistId}&index=${index}`;

  function getContainerClasses() {
    let classes = "c-playlist-video__container";
    if (videoId === watchingVideoId) {
      classes += " c-playlist-video__container--current";
      setWatchingVideoIdx(index);
    }

    return classes;
  }

  return (
    <Link to={videoUrl} className={getContainerClasses()}>
      <img className="c-playlist-video__image" src={thumbnailUrl} alt={title} />
      <h3 className="c-playlist-video__title">{title}</h3>
      <h4 className="c-playlist-video__uploader">{uploaderName}</h4>
    </Link>
  );
}