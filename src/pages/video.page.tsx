import React, { FC, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faCalendarDay, faEye, faThumbsUp, faThumbsDown, faPercent } from "@fortawesome/free-solid-svg-icons";

import { IChannel, IVideo } from "shared/interfaces/youtube.interfaces";
import { ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { getQueryParams, roundToTwoDecimals, getFormattedDate, addCommasToNumber } from "shared/helpers";
import { getChannelDetails, getVideoDetails } from "services/youtube.service";
import { setCurrentVideo } from "redux/video";

import { ChannelBox } from "components/channel/channel-box.component";
import { CustomPlaylistScrollList } from "components/playlist-scroll-list/custom-scroll-list.component";
import { Divider } from "components/divider/divider.component";
import { Loader } from "components/loader/loader.component";
import { NotFoundHeading } from "components/text/not-found-heading.component";
import { StatsCard } from "components/card/stats-card.component";
import { ThreadList } from "components/comment/thread-list.component";
import { VideoDescription } from "components/video/video-description.component";
import { VideoPlayer } from "components/video/video-player.component";
import { VideoSettingsCard } from "components/video/video-settings-card.component";
import { YouTubePlaylistScrollList } from "components/playlist-scroll-list/youtube-playlist-scroll-list.component";

export const VideoPage: FC = () => { 
  // State
  const [videoData, setVideoData] = useState<IVideo>();
  const [channelData, setChannelData] = useState<IChannel>();
  const [playlistId, setPlaylistId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();
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
        const videoData = await getVideoDetails(videoId);
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

  function getScrollList() {
    if (!playlistId || !videoData) return;

    if (playlistId === ECustomPlaylistTypes.MUSIC || playlistId === ECustomPlaylistTypes.VIDEOS) {
      return <CustomPlaylistScrollList key={playlistId} customPlaylistType={playlistId} watchingVideoId={videoData.id} />;
    }

    return <YouTubePlaylistScrollList key={playlistId} playlistId={playlistId} watchingVideoId={videoData.id} />;
  }

  // Render
  if (!channelData || !videoData) return <Loader position="center-page" />;

  return (
    <div className="o-page o-page--watch o-grid">
      <VideoPlayer 
        isLoading={isLoading}
        videoId={videoData.id}
        playlistId={playlistId} 
      />

      <div className="o-grid__item--wide c-video__grid">
        <h2 className="c-video__grid-item--full c-heading c-heading--subtitle c-heading--spaced">{videoData.snippet.title}</h2>

        <div className="c-video__grid-item">
          <StatsCard statsCardData={getStatsCardData()} />
          <VideoSettingsCard videoId={videoData.id} />
        </div>

        <div className="c-video__grid-item">
          <ChannelBox channelData={channelData} location="video-page" />
          <VideoDescription description={videoData.snippet.description} />
          <Divider />
          {
            +videoData.statistics.commentCount > 0
              ? <ThreadList
                  key={videoData.id}
                  numComments={videoData.statistics.commentCount} 
                  videoId={videoData.id}  
                />
              : <NotFoundHeading>No Comments</NotFoundHeading>
          }
        </div>
        <div className="c-video__grid-item">
          { getScrollList() }
        </div>
      </div>
    </div>
  );
};
