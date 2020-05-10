import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { IChannel, ICommentThread, IPageInfo, IVideo } from "shared/interfaces/youtube.interface";
import { getChannelDetails, getCommentThreadsForVideo, getVideoDetails } from "apis/youtube.api";
import { CommentThread } from "components/comment-thread.component";
import { Loader } from "components/loader.component";
import { VideoPlayer } from "components/video-player.component";
import { Divider } from "components/divider.component";
import { VideoDetails } from "components/video-details.component";
import { VideoDescription } from "components/video-description";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match, history }) => { 
  // State
  const [videoData, setVideoData] = useState<IVideo>();
  const [channelData, setChannelData] = useState<IChannel>();
  const [threads, setThreads] = useState<ICommentThread[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [pageInfo, setPageInfo] = useState<IPageInfo>();
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { videoId } = match.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  
  // Functions
  useEffect(() => {
    async function fetchVideoAndChannelData() {
      try {
        const videoRes = await getVideoDetails(videoId);
        setVideoData(videoRes);

        const channelRes = await getChannelDetails(videoRes.snippet.channelId);
        setChannelData(channelRes.items[0]);

        document.title = videoRes.snippet.title;
      }
      catch (err) {
        history.push("/not-found");
      }
    }
    fetchVideoAndChannelData();
  }, [history, videoId]);

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
    return (
      <div className="c-comments__container">
        { threads.length > 0 && <h2 className="c-comments__total">{videoData?.statistics.commentCount} Comments</h2> }
        { threads.map(t => <CommentThread key={t.id} thread={t} />) }
      </div>
    )
  }

  function renderLoadComments() {
    if (isLoading) {
      return <Loader position="centered" />;
    }

    if (hasMoreComments) {
      return <div className="c-link-text c-link-text--bold" onClick={loadCommentThreads}>LOAD COMMENTS</div>
    }
  }

  if (!channelData || !videoData) {
    return <Loader position="centered" />;
  }
  return (
    <>
      <VideoPlayer videoId={videoId} videoUrl={videoUrl} />
      <VideoDetails videoData={videoData} channelData={channelData} />
      <Divider />
      <VideoDescription description={videoData.snippet.description} />
      <Divider />
      { renderCommentThreads() }
      { renderLoadComments() }
    </>
  );
};

export const VideoPage = withRouter(_VideoPage);