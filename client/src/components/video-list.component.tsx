import React, { FC } from "react";
import { IVideo } from "shared/interfaces/youtube.interfaces";
// import { VideoThumbnail } from "./video-thumbnail.component";

interface IProps {
  videos: IVideo[]
}

export const VideoList: FC<IProps> = ({ videos }) => {
  return (
    <div className="c-video-list__container">
      {/* { videos.map(video => <VideoThumbnail video={video} key={video.id} />) } */}
    </div>
  );
}