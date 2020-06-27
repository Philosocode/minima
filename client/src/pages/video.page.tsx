import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faCalendarDay, faEye, faThumbsUp, faThumbsDown, faPercent } from "@fortawesome/free-solid-svg-icons";

import { setCurrentVideo } from "redux/video";

import { IChannel, IVideo } from "shared/interfaces/youtube.interfaces";
import { getQueryParams, roundToTwoDecimals, getFormattedDate, addCommasToNumber } from "shared/helpers";
import { getChannelDetails, getVideoDetails } from "apis/youtube.api";
import { addDocToDb, getDocFromDb } from "apis/firebase.api";

import { Divider } from "components/divider.component";
import { Loader } from "components/loader.component";
import { PlaylistScrollList } from "components/playlist-scroll-list.component";
import { ThreadList } from "components/thread-list.component";
import { StatsCard } from "components/stats-card.component";
import { VideoDescription } from "components/video-description.component";
import { VideoPlayer } from "components/video-player.component";
import { ChannelBox } from "components/channel-box.component";
import { NotFoundHeading } from "components/not-found-heading.component";
import { VideoSettingsCard } from "components/video-settings-card.component";
import { IVideoDocument } from "shared/interfaces/firebase.interfaces";
import { differenceInDays, toDate } from "date-fns";
import { VIDEO_CACHE_DAYS } from "shared/constants";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ location, history }) => { 
  // State
  const [videoData, setVideoData] = useState<IVideo>();
  const [channelData, setChannelData] = useState<IChannel>();
  const [playlistId, setPlaylistId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Functions
  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    
    const videoQueryParam = queryParams.query["v"];
    const playlistQueryParam = queryParams.query["list"];

    typeof videoQueryParam === "string"
      ? fetchVideoAndChannelData(videoQueryParam)
      : alert("ERROR: Invalid video id.");

    typeof playlistQueryParam === "string"
      ? setPlaylistId(playlistQueryParam)
      : setPlaylistId("");

    async function fetchVideoAndChannelData(videoId: string) {
      setIsLoading(true);

      try {
        const videoData = await getVideoData(videoId);

        setVideoData(videoData);
        dispatch(setCurrentVideo(videoData));

        const channelRes = await getChannelDetails(videoData.snippet.channelId);
        setChannelData(channelRes);

        document.title = videoData.snippet.title;
      }
      catch (err) {
        alert("ERROR: couldn't load video data.");
      }
      finally {
        setIsLoading(false);
      }
    }

    async function getVideoData(videoId: string): Promise<IVideo> {
      const videoFromDb = await getDocFromDb("videos", videoId) as IVideoDocument;
      if (!videoFromDb) return await getVideoFromApiAndAddToDb(videoId);

      // Check dates
      const lastUpdated = toDate(videoFromDb.lastUpdatedMs);
      const today = new Date();

      // Check distance
      const daysSince = differenceInDays(today, lastUpdated);
      if (daysSince > VIDEO_CACHE_DAYS) return await getVideoFromApiAndAddToDb(videoId);
      
      // Use value from DB if less than 2 weeks old
      return {
        etag: videoFromDb.etag,
        id: videoId,
        snippet: videoFromDb.snippet,
        statistics: videoFromDb.statistics
      };
    }

    async function getVideoFromApiAndAddToDb(videoId: string): Promise<IVideo> {
      const videoData = await getVideoDetails(videoId);

      const { etag, id, snippet, statistics } = videoData;
      const videoDoc: IVideoDocument = {
        etag, snippet, statistics,
        lastUpdatedMs: Date.now()
      };

      await addDocToDb("videos", id, videoDoc);

      return videoData;
    }
  }, [history, location.search, dispatch]);

  function getStatsCardData() {
    if (!videoData) return;
    
    const { publishedAt } = videoData.snippet; 
    const { likeCount, dislikeCount, viewCount } = videoData.statistics;
    const likes = +likeCount;
    const dislikes = +dislikeCount;

    const likesToDislikesPercentage = (likes / (likes + dislikes)) * 100;
    const roundedPercentage = roundToTwoDecimals(likesToDislikesPercentage);

    // e.g. December 6th, 2019
    const formattedPublishDate = getFormattedDate(publishedAt, "MMM io, yyyy");

    return [
      { icon: faCalendarDay, text: formattedPublishDate },
      { icon: faEye, text: addCommasToNumber(viewCount) },
      { icon: faThumbsUp, text: addCommasToNumber(likeCount) },
      { icon: faThumbsDown, text: addCommasToNumber(dislikeCount) },
      { icon: faPercent, text: roundedPercentage.toString() }
    ];
  }

  // Render
  if (!channelData || !videoData) {
    return <Loader position="center-page" />;
  }
  return (
    <div className="o-page o-page--watch o-grid__container">
      <div className="o-grid__item--full">
        <VideoPlayer 
          isLoading={isLoading}
          videoId={videoData.id}
          playlistId={playlistId} 
        />
      </div>

      <div className="o-grid__item--wide">
        <h2 className="c-heading--huge c-heading--left-align c-video__title">{videoData.snippet.title}</h2>
      </div>
      
      <div className="o-grid__item--left-sidebar">
        <StatsCard statsCardData={getStatsCardData()} />
        <VideoSettingsCard />
      </div>

      <div className="o-grid__item--center">
        <ChannelBox channelData={channelData} location="video-page" />
        <VideoDescription description={videoData.snippet.description} />
        <Divider />
        {
          +videoData.statistics.commentCount > 0
            ? <ThreadList
                numComments={videoData.statistics.commentCount} 
                videoId={videoData.id}  
              />
            : <NotFoundHeading>No Comments</NotFoundHeading>
        }
      </div>

      <div className="o-grid__item--right-sidebar">
        { playlistId && <PlaylistScrollList key={playlistId} playlistId={playlistId} watchingVideoId={videoData.id} /> }
      </div>
    </div>
  );
};

export const VideoPage = withRouter(_VideoPage);