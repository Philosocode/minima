import React, { FC, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faCalendarDay, faEye, faThumbsUp, faThumbsDown, faPercent } from "@fortawesome/free-solid-svg-icons";

import { ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { getQueryParams, roundToTwoDecimals, getFormattedDate, addCommasToNumber } from "shared/helpers";
import { selectIsFetching, fetchVideo, selectCurrentVideo } from "redux/video";
import { setPlaylistId, selectPlaylistId, clearPlaylist } from "redux/playlist";

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
import { fetchChannel, selectCurrentChannel } from "redux/channel";

export const VideoPage: FC = () => { 
  // State
  const currentVideo = useSelector(selectCurrentVideo);
  const currentChannel = useSelector(selectCurrentChannel);
  const isFetching = useSelector(selectIsFetching);
  const playlistId = useSelector(selectPlaylistId);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // Functions
  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    
    const videoQueryParam = queryParams.query["v"];

    if (typeof videoQueryParam === "string") dispatch(fetchVideo(videoQueryParam));
    else alert("ERROR: Invalid video id.");

    const playlistQueryParam = queryParams.query["list"];
    if (typeof playlistQueryParam === "string") dispatch(setPlaylistId(playlistQueryParam));

    return () => { dispatch(clearPlaylist()); }
  }, [history, location.search, dispatch]);

  useEffect(() => {
    if (!currentVideo) return;
    dispatch(fetchChannel({ channelId: currentVideo.snippet.channelId }));

    document.title = currentVideo.snippet.title;
  }, [currentVideo, dispatch]);

  function getStatsCardData() {
    if (!currentVideo) return;
    
    const { publishedAt } = currentVideo.snippet; 
    const { likeCount, dislikeCount, viewCount } = currentVideo.statistics;
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

    if (
      playlistId === ECustomPlaylistTypes.MUSIC || 
      playlistId === ECustomPlaylistTypes.VIDEOS
    ) {
      return <CustomPlaylistScrollList />;
    }

    return <YouTubePlaylistScrollList />;
  }

  // Render
  if (!currentVideo || !currentChannel) return <Loader position="center-page" />;

  return (
    <div className="o-page o-page--watch o-grid">
      <VideoPlayer 
        isLoading={isFetching}
        videoId={currentVideo.id}
        playlistId={playlistId} 
      />

      <div className="o-grid__item--wide c-video__grid">
        <h2 className="c-video__grid-item--full c-heading c-heading--subtitle c-text--spaced">{currentVideo.snippet.title}</h2>

        <div className="c-video__grid-item">
          <StatsCard statsCardData={getStatsCardData()} />
          <VideoSettingsCard videoId={currentVideo.id} />
        </div>

        <div className="c-video__grid-item">
          <ChannelBox channelData={currentChannel} location="video-page" />
          <VideoDescription description={currentVideo.snippet.description} />
          <Divider />
          {
            +currentVideo.statistics.commentCount > 0
              ? <ThreadList
                  key={currentVideo.id}
                  numComments={currentVideo.statistics.commentCount} 
                  videoId={currentVideo.id}  
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
