import React, { FC } from "react";
import { IYouTubeVideo } from "apis/youtube.api";

interface IProps {
  video: IYouTubeVideo
}

export const VideoThumbnail: FC<IProps> = ({ video }) => {
  return (
    <div className="c-video-thumbnail">
      <h3>{video.snippet.title} [{video.id.videoId}]</h3>
      <p>Published: {video.snippet.publishedAt}</p>
    </div>
  );
}