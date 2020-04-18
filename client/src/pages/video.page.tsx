import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getVideo, IYouTubeVideo } from "apis/youtube.api";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => { 
  // State
  const { videoId } = match.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  const [videoData, setVideoData] = useState<IYouTubeVideo>();
  
  // Functions
  // Effect to fetch videos on mount
  useEffect(() => {
    getVideo(videoId)
      .then(res => setVideoData(res))
      .catch(err => console.log(err));
  }, [videoId]);

  function renderLoading() {
    return <div>Loading...</div>
  }

  function renderVideoPageContent() {
    return (
      <div>Video Details</div>
    )
  }

  return (
    <div>
      <div className="c-video__container">
        <iframe className="c-video__iframe"
          src={videoUrl}
          frameBorder="0"
          title={videoId}
        />
      </div>
      {
        videoData ? renderVideoPageContent() : renderLoading()
      }
    </div>
  );
};

export const VideoPage = withRouter(_VideoPage);