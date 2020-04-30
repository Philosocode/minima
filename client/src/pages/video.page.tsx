import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { getVideo, IYouTubeVideo, getCommentThreadsForVideo, ICommentThread, IPageInfo } from "apis/youtube.api";
import { CommentThread } from "components/comment-thread.component";
import { VideoDescription } from "components/video-description.component";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => { 
  // State
  const [videoData, setVideoData] = useState<IYouTubeVideo>();
  const [threads, setThreads] = useState<ICommentThread[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [pageInfo, setPageInfo] = useState<IPageInfo>();
  const [hasMoreComments, setHasMoreComments] = useState(true);

  const { videoId } = match.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?vq=medium`;
  
  // Functions
  // Effect to fetch videos on mount
  useEffect(() => {
    getVideo(videoId)
      .then(res => setVideoData(res))
      .catch(err => console.log(err));
  }, [videoId]);

  function loadCommentThreads() {
    getCommentThreadsForVideo(videoId, pageInfo, nextPageToken)
      .then(res => {
        const { nextPageToken, items, pageInfo } = res;

        if (nextPageToken) {
          setNextPageToken(nextPageToken);
        } else {
          setHasMoreComments(false);
        }

        const updatedThreads = threads.concat(items);
        setThreads(updatedThreads);
        setPageInfo(pageInfo);
      })
      .catch(err => console.log(err));
  }

  function renderLoading() {
    return <div>Loading...</div>
  }

  function renderCommentThreads() {
    return threads.map(t => <CommentThread key={t.id} thread={t} />);
  }

  function renderVideoContent() {
    if (!videoData) return renderLoading();

    const { title, description, publishedAt, channelId, channelTitle } = videoData.snippet;

    return (
      <>
        <h3>{title}</h3>
        <p>Published: {publishedAt}</p>
        <p>Channel: {channelTitle} [{channelId}]</p>
        <hr/>
        <VideoDescription desc={description} />
        <hr />
      </>
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
      <div className="c-video__details">{ renderVideoContent() }</div>
      <div className="c-comments__container">{ renderCommentThreads() }</div>
      { hasMoreComments && <div className="c-video__show-toggle" onClick={loadCommentThreads}>Load Comments</div> }
    </div>
  );
};

export const VideoPage = withRouter(_VideoPage);