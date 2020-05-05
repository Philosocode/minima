import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, Link, withRouter } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { IChannel, ICommentThread, IPageInfo, IVideo, getChannelDetails, getCommentThreadsForVideo, getVideoDetails } from "apis/youtube.api";
import { CommentThread } from "components/comment-thread.component";
import { Loader } from "components/loader.component";
import { ToggleText } from "components/toggle-text.component";
import { VideoPlayer } from "components/video-player.component";
import { addCommasToNumber } from "helpers/helpers";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => { 
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
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchVideoAndChannelData();
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

  function renderVideoDetails() {
    if (!channelData || !videoData) return <div>Loading...</div>;

    const { title, publishedAt } = videoData.snippet; 

    // e.g. December 6th, 2019
    const formattedPublishedAt = format(parseISO(publishedAt), "PPP");

    return (
      <>
        <h3 className="c-video__title">{title}</h3>
        <p className="c-video__published">Published: {formattedPublishedAt}</p>
        <hr/>
      </>
    )
  }

  function renderVideoDescription() {
    if (!channelData || !videoData) return <div>Loading...</div>;

    const { description, channelId, channelTitle } = videoData.snippet; 

    const uploaderImageUrl = channelData.snippet.thumbnails.default.url;
    const { subscriberCount } = channelData.statistics;

    const channelUrl = `/channel/${channelId}`;

    return (
      <>
        <div className="c-video__uploader">
          <Link to={channelUrl} className="c-channel__image-container">
            <img className="c-channel__image c-channel__image--smaller" src={uploaderImageUrl} alt={channelTitle} />
          </Link>
          <div className="c-video__uploader-text">
            <Link to={channelUrl} className="c-channel__name">{channelTitle}</Link>
            <h3 className="c-channel__subscriber-count">{ addCommasToNumber(subscriberCount)} subscribers</h3>
          </div>
        </div>
        <ToggleText text={description} />
        <hr/>
      </>
    );
  }

  /*
  <div className="c-video__description">

    <div className="c-video__uploader">
      <Link to={channelUrl} className="c-channel__image-container">
        <img className="c-channel__image c-channel__image--small" src={uploaderImageUrl} alt={channelTitle} />
      </Link>
      <div className="c-video__uploader-text">
        <Link to={channelUrl} className="c-channel__name">{channelTitle}</Link>
        <h3 className="c-channel__subscriber-count">{ addCommasToNumber(subscriberCount)} subscribers</h3>
      </div>
    </div>

    <ToggleText text={description} />
  </div>
  <hr />
  */

  function renderLoadComments() {
    if (isLoading) 
      return <Loader position="centered" />;

    if (hasMoreComments) 
      return <div className="c-link-text c-link-text--bold" onClick={loadCommentThreads}>LOAD COMMENTS</div>
  }
  
  return (
    <div>
      <VideoPlayer videoId={videoId} videoUrl={videoUrl} />
      <div className="c-video__details">{ renderVideoDetails() }</div>
      <div className="c-video__description">{ renderVideoDescription() }</div>
      <div className="c-comments__container">{ renderCommentThreads() }</div>
      { renderLoadComments() }
    </div>
  );
};

export const VideoPage = withRouter(_VideoPage);