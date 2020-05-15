import React, { FC } from "react";

import { getQueryStringFromObject } from "shared/helpers";
import { Loader } from "components/loader.component";

interface IProps {
  isLoading: boolean;
  videoId: string;
}
export const VideoPlayer: FC<IProps> = ({ isLoading, videoId }) => { 
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  function getIframeUrl() {
    const params = {
      rel: "0",
      modestbranding: "1"
    }
  
    // e.g. rel=0&modestbranding=1
    const queryString = getQueryStringFromObject(params);
  
    // e.g. youtube.com/embed/<videoId>?rel=0&modestbranding=1
    return videoUrl + queryString;
  }

  return (
    <div className="o-container c-video-player__container">
      {
        isLoading
          ? <Loader position="center-page" />
          : <iframe className="c-video-player__iframe"
            src={getIframeUrl()}
            frameBorder="0"
            title={videoId}
            allowFullScreen
          />
      }
    </div>
  );
 }