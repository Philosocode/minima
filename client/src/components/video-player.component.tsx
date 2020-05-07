import React, { FC } from "react";
import { getQueryStringFromObject } from "shared/helpers";

interface IProps {
  videoId: string;
  videoUrl: string;
}

export const VideoPlayer: FC<IProps> = ({ videoUrl, videoId }) => { 
  const params = {
    rel: "0",
    modestbranding: "1"
  }

  const queryString = getQueryStringFromObject(params);
  const iframeUrl = videoUrl + queryString;

  return (
    <div className="c-video__container">
      <iframe className="c-video__iframe"
        src={iframeUrl}
        frameBorder="0"
        title={videoId}
        allowFullScreen
      />
    </div>
  );
 }