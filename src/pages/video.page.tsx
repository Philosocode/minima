import React, { FC, useEffect, useState } from "react";
import { faCalendarDay, faEye, faThumbsUp, faThumbsDown, faPercent } from "@fortawesome/free-solid-svg-icons";

import { ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { getQueryParams, roundToTwoDecimals, getFormattedDate, addCommasToNumber } from "shared/helpers";

import { ChannelBox } from "components/channel/channel-box.component";
import { CustomPlaylistScrollList } from "components/playlist-scroll-list/custom-playlist-scroll-list.component";
import { Divider } from "components/divider/divider.component";
import { Loader } from "components/loader/loader.component";
import { NotFoundHeading } from "components/text/not-found-heading.component";
import { StatsCard } from "components/card/stats-card.component";
import { ThreadList } from "components/comment/thread-list.component";
import { VideoDescription } from "components/video/video-description.component";
import { VideoPlayer } from "components/video/video-player.component";
import { VideoSettingsCard } from "components/video/video-settings-card.component";
import { YouTubePlaylistScrollList } from "components/playlist-scroll-list/youtube-playlist-scroll-list.component";
import { IVideo, IChannel } from "shared/interfaces/youtube.interfaces";
import { usePrevious } from "hooks/use-previous.hook";
import { useLocation } from "react-router-dom";
import { getVideoDetails, getChannelDetails } from "services/youtube.service";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylistId, selectPlaylistId, clearPlaylist, selectIsFetching, selectScrollListLoaded } from "redux/playlist";
import { setCurrentVideo } from "redux/video";
import { setCurrentChannel } from "redux/channel";

export const VideoPage: FC = () => { 
  // State
  const [isFetching, setIsFetching] = useState(true);
  const [videoData, setVideoData] = useState<IVideo>();
  const [channelData, setChannelData] = useState<IChannel>();

  const playlistId = useSelector(selectPlaylistId);
  const playlistFetching = useSelector(selectIsFetching);
  const scrollListLoaded = useSelector(selectScrollListLoaded);

  const location = useLocation();
  const dispatch = useDispatch();

  const previousPlaylistId = usePrevious(playlistId);
  const previousChannel = usePrevious(channelData);

  useEffect(() => {
    setIsFetching(true);

    fetchData();

    async function fetchData() {
      const query = getQueryParams(location.search).query;
      const videoQuery = query["v"];
      const playlistQuery = query["list"];

      if (typeof videoQuery !== "string") return alert("Invalid video ID");

      try {
        const video = await getVideoDetails(videoQuery);
        const channel = await getChannelDetails({ id: video.snippet.channelId, idType: "channel" });

        document.title = video.snippet.title;

        setVideoData(video);
        dispatch(setCurrentVideo(video))

        // Only update channel if changed
        if (channel.id !== previousChannel?.id) {
          setChannelData(channel);
          dispatch(setCurrentChannel(channel));
        }

        // Only update playlist ID if different from previous render
        if (
          typeof playlistQuery === "string" &&
          playlistQuery !== previousPlaylistId
        ) {
          // No need to clear the playlist if not set
          if (playlistId) dispatch(clearPlaylist());
          dispatch(setPlaylistId(playlistQuery));
        }
      }
      catch (err) {
        alert(err);
      }
      finally {
        setIsFetching(false);
      }
    }
  }, [dispatch, location.search]); // eslint-disable-line

  useEffect(() => {
    if (!videoData) return;

    document.title = videoData.snippet.title;
  }, [videoData]); // eslint-disable-line

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
    if (!playlistId) return;

    // Show loader on initial playlist videos fetch
    if (playlistFetching && !scrollListLoaded) return <Loader position="center-horizontal" />

    if (
      playlistId === ECustomPlaylistTypes.MUSIC || 
      playlistId === ECustomPlaylistTypes.VIDEOS
    ) {
      return <CustomPlaylistScrollList key={playlistId} />;
    }

    return <YouTubePlaylistScrollList key={playlistId} />;
  }

  // Render
  if (isFetching || !videoData || !channelData) return <Loader position="center-page" />;

  return (
    <div className="o-page o-page--watch o-grid">
      <VideoPlayer 
        isLoading={isFetching}
        videoId={videoData.id}
        playlistId={playlistId} 
      />

      <div className="o-grid__item--wide c-video__grid">
        <h2 className="c-video__grid-item--full c-heading c-heading--subtitle c-text--spaced">{videoData.snippet.title}</h2>

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
