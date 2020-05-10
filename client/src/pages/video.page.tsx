import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, Link, withRouter } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { IChannel, ICommentThread, IPageInfo, IVideo } from "shared/interfaces/youtube.interface";
import { getChannelDetails, getCommentThreadsForVideo, getVideoDetails } from "apis/youtube.api";
import { CommentThread } from "components/comment-thread.component";
import { LikesBar } from "components/likes-bar.component";
import { Loader } from "components/loader.component";
import { ToggleText } from "components/toggle-text.component";
import { VideoPlayer } from "components/video-player.component";
import { addCommasToNumber, getAbbreviatedNumber } from "shared/helpers";
import { Divider } from "components/divider.component";

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

  function renderVideoDetails() {
    if (!channelData || !videoData) return <div>Loading...</div>;

    const { title, publishedAt, channelId, channelTitle } = videoData.snippet; 
    const { likeCount, dislikeCount, viewCount } = videoData.statistics;

    const uploaderImageUrl = channelData.snippet.thumbnails.default.url;
    const { subscriberCount } = channelData.statistics;

    const channelUrl = `/channel/${channelId}`;

    // e.g. December 6th, 2019
    const formattedPublishDate = format(parseISO(publishedAt), "PPP");

    return (
      <div className="c-video__details">
        <h2 className="c-video__title">{title}</h2>

        <div className="o-media c-uploader">

          <Link to={channelUrl} className="o-media__image">
            <img className="c-channel__image c-channel__image--small" src={uploaderImageUrl} alt={channelTitle} />
          </Link>

          <div className="o-media__body o-media__body--center-vertically">
            <Link to={channelUrl} className="c-channel__name">{channelTitle}</Link>
            <h3 className="c-channel__subscriber-count">{getAbbreviatedNumber(subscriberCount)} subscribers</h3>
          </div>
          
        </div>

        <div className="c-video__details-text">
          <div className="c-video__published">{formattedPublishDate}</div>
          <div className="c-video__views">{addCommasToNumber(viewCount)} views</div>
        </div>
        <LikesBar likes={+likeCount} dislikes={+dislikeCount} />        
      </div>
    )
  }

  function renderVideoDescription() {
    if (!channelData || !videoData) return <div>Loading...</div>;

    const { description } = videoData.snippet; 

    return (
      <div className="c-video__description">
        <ToggleText text={description} />
      </div>
    );
  }

  function renderLoadComments() {
    if (isLoading) 
      return <Loader position="centered" />;

    if (hasMoreComments) 
      return <div className="c-link-text c-link-text--bold" onClick={loadCommentThreads}>LOAD COMMENTS</div>
  }
  
  return (
    <>
      <VideoPlayer videoId={videoId} videoUrl={videoUrl} />
      { renderVideoDetails() }
      <Divider />
      { renderVideoDescription() }
      <Divider />
      { renderCommentThreads() }
      { renderLoadComments() }
    </>
  );
};

export const VideoPage = withRouter(_VideoPage);