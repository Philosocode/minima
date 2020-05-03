import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { getVideo, IVideo, getCommentThreadsForVideo, ICommentThread, IPageInfo } from "apis/youtube.api";
import { CommentThread } from "components/comment-thread.component";
import { Loader } from "components/loader.component";
import { ToggleText } from "components/toggle-text.component";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => { 
  // State
  const [videoData, setVideoData] = useState<IVideo>();
  const [threads, setThreads] = useState<ICommentThread[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [pageInfo, setPageInfo] = useState<IPageInfo>();
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { videoId } = match.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?vq=medium`;
  
  // Functions
  // Effect to fetch videos on mount
  useEffect(() => {
    getVideo(videoId)
      .then(res => setVideoData(res))
      .catch(err => console.log(err));
  }, [videoId]);

  async function loadCommentThreads() {
    setIsLoading(true);
    const res = await getCommentThreadsForVideo(videoId, pageInfo, nextPageToken);
    setIsLoading(false);

    if (res.nextPageToken) {
      setNextPageToken(nextPageToken);
    } else {
      setHasMoreComments(false);
    }

    const updatedThreads = threads.concat(res.items);
    setThreads(updatedThreads);
    setPageInfo(res.pageInfo);
  }

  function renderCommentThreads() {
    return threads.map(t => <CommentThread key={t.id} thread={t} />);
  }

  function renderVideoContent() {
    if (!videoData) return <div>Loading...</div>;

    console.log(videoData);
    

    const { title, description, publishedAt, channelId, channelTitle } = videoData.snippet;

    // e.g. December 6th, 2019
    const formattedPublishedAt = format(parseISO(publishedAt), "PPP");

    return (
      <>
        <h3 className="c-video__title">{title}</h3>
        <p className="c-video__published">Published: {formattedPublishedAt}</p>
        <p className="c-video__channel">Channel: {channelTitle} [{channelId}]</p>
        <hr/>
        <ToggleText text={description} />
        <hr />
      </>
    )
  }

  function renderLoadComments() {
    if (isLoading) 
      return <Loader position="centered" />;

    if (hasMoreComments) 
      return <div className="c-link-text c-link-text--bold" onClick={loadCommentThreads}>LOAD COMMENTS</div>
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
      { renderLoadComments() }
    </div>
  );
};

export const VideoPage = withRouter(_VideoPage);