import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  thumbnailUrl: string;
  title: string;
  uploaderName: string;
  playlistId: string;
  videoId: string;
}

export const PlaylistVideo: FC<IProps> = ({ playlistId, thumbnailUrl, title, uploaderName, videoId }) => {
  const videoUrl = `/watch?v=${videoId}&list=${playlistId}`;

  return (
    <Link onClick={() => console.log(videoUrl)} to={videoUrl} className="c-playlist-video__container">
      <img className="c-playlist-video__image" src={thumbnailUrl} alt={title} />
      <h3 className="c-playlist-video__title">{title}</h3>
      <h4 className="c-playlist-video__uploader">{uploaderName}</h4>
    </Link>
  );
}