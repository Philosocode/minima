import React, { FC, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getVideo } from "apis/youtube.api";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => { 
  // State
  const { videoId } = match.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  
  // Functions
  // Effect to fetch videos on mount
  useEffect(() => {
    getVideo(videoId)
      .then(res => console.log(res))
      .catch(err => console.log("Error from Video Page:", err));
  }, [videoId]);

  return (
    <div>
      <div className="c-video__container">
        <iframe className="c-video__iframe"
          src={videoUrl}
          frameBorder="0"
          title={videoId}
        />
      </div>
    </div>
  );
};

export const VideoPage = withRouter(_VideoPage);