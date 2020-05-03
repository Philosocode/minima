import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IVideo } from "apis/youtube.api";

interface IProps {
  video: IVideo
}

export const VideoThumbnail: FC<IProps> = ({ video }) => {
  const videoUrl = `/watch?v=${video.id.videoId}`;
  // const channelUrl = `/channel/${video.snippet.channelId}`;

  return (
    <>
      <div className="c-video-thumbnail__container">
        <div className="c-video-thumbnail__image-container">
          <Link to={videoUrl}>
            <img 
              className="c-video-thumbnail__image"
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title} 
            />
          </Link>
        </div>
        <h3 className="c-video-thumbnail__title">
          <Link to={videoUrl}>{video.snippet.title}</Link>
        </h3>
        <p className="c-video-thumbnail__published">Published: {video.snippet.publishedAt}</p>
        <p className="c-video-thumbnail__views">{}</p>
      </div>
    </>
  );
}