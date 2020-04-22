import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getVideo, IYouTubeVideo, getCommentsForVideo, ICommentsResponse } from "apis/youtube.api";
import { linkify } from "helpers/helpers";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => { 
  // State
  const [videoData, setVideoData] = useState<IYouTubeVideo>();
  const [commentsData, setCommentsData] = useState<ICommentsResponse>();
  const { videoId } = match.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?vq=medium`;
  
  // Functions
  // Effect to fetch videos on mount
  useEffect(() => {
    getVideo(videoId)
      .then(res => setVideoData(res))
      .catch(err => console.log(err));
  }, [videoId]);

  function loadComments() {
    getCommentsForVideo(videoId)
      .then(res => setCommentsData(res))
      .catch(err => console.log(err));
  }

  function renderLoading() {
    return <div>Loading...</div>
  }

  function renderVideoPageContent() {
    if (!videoData) return;

    const { title, description, publishedAt, channelId, channelTitle } = videoData.snippet;
    const formattedDescription = linkify(description);

    return (
      <div>
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{__html: formattedDescription}} className="c-video__description"></p>
        <p>Published: {publishedAt}</p>
        <p>Channel: {channelTitle} [{channelId}]</p>
        <br />
      </div>
    )
  }

  return (
    <div>
      <div className="c-video__container">
        <iframe className="c-video__iframe"
          src={videoUrl}
          frameBorder="0"
          title={videoId}
          allowFullScreen
        />
      </div>
      {
        videoData 
          ? renderVideoPageContent()
          : renderLoading()
      }
    </div>
  );
};

export const VideoPage = withRouter(_VideoPage);