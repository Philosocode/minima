import React, { FC } from "react";
import { getQueryStringFromObject } from "shared/helpers";

interface IProps {
  videoId: string;
  videoUrl: string;
}
export const VideoPlayer: FC<IProps> = ({ videoUrl, videoId }) => { 
  function getIframeUrl() {
    const params = {
      rel: "0",
      modestbranding: "1"
    }
  
    const queryString = getQueryStringFromObject(params);
  
    // e.g. youtube.com/embed/<videoId>?rel=0&modestbranding=1
    return videoUrl + queryString;
  }

  return (
    <div className="o-container">
      <div className="c-video-player__container">
        <iframe className="c-video-player__iframe"
          src={getIframeUrl()}
          frameBorder="0"
          title={videoId}
          allowFullScreen
        />
      </div>
    </div>
  );
 }