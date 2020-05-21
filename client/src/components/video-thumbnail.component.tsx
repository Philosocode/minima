import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IVideo } from "shared/interfaces/youtube.interface";

interface IProps {
  video: IVideo
}

export const VideoThumbnail: FC<IProps> = ({ video }) => {
  const videoUrl = `/watch?v=${video.id}`;
  // const channelUrl = `/channel/${video.snippet.channelId}`;

  return (
    <>
      <div className="c-channel-item__container">
        <div className="c-channel-item__image-container">
          <Link to={videoUrl}>
            <img 
              className="c-channel-item__image"
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title} 
            />
          </Link>
        </div>
        <h3 className="c-channel-item__title">
          <Link to={videoUrl}>{video.snippet.title}</Link>
        </h3>
        <p className="c-channel-item__published">Published: {video.snippet.publishedAt}</p>
        <p className="c-channel-item__views">{}</p>
      </div>
    </>
  );
}