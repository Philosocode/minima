import React, { FC } from "react";
import { IYouTubeVideo } from "apis/youtube.api";
import { VideoThumbnail } from "./video-thumbnail.component";

interface IProps {
  videos: IYouTubeVideo[]
}

export const VideoList: FC<IProps> = ({ videos }) => {
  return (
    <div className="c-video-list__container">
      { videos.map(video => <VideoThumbnail video={video} key={video.id.videoId} />) }
    </div>
  );
}