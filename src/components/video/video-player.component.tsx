import React, { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getQueryParams } from "shared/helpers";
import { selectShouldLoop } from "redux/video";
import {
  selectSessionPlaybackSpeed,
  setSessionPlaybackSpeed,
} from "redux/preference";
import { Loader } from "components/loader/loader.component";
import { YouTubePlayer } from "components/video/youtube-player.component";

interface IProps {
  isLoading: boolean;
  videoId: string;
  playlistId?: string;
}

enum EPlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING,
  PAUSED,
  BUFFERING,
  VIDEO_CUED = 5,
}

const _VideoPlayer: FC<RouteComponentProps & IProps> = ({
  location,
  isLoading,
  playlistId,
  videoId,
}) => {
  const [startSeconds, setStartSeconds] = useState<number>();
  const [endSeconds, setEndSeconds] = useState<number>();
  const playbackSpeed = useSelector(selectSessionPlaybackSpeed);
  const shouldLoop = useSelector(selectShouldLoop);
  const dispatch = useDispatch();

  const options = {
    modestBranding: 1,
    rel: 0,
    ...(startSeconds && { start: startSeconds }),
    ...(endSeconds && { end: endSeconds }),
    // Disable playlist param cause it kept loading the next video when isLooping is turned on
    // ...(playlistId && !shouldLoop && {
    //   listType: "playlist",
    //   list: playlistId,
    // }),
  };

  useEffect(() => {
    // Check for `start` `end` query params
    const queryParams = getQueryParams(location.search);
    const startSecondsQueryParam = queryParams.query["start"];
    const endSecondsQueryParam = queryParams.query["end"];

    // If they exist, update the video start & end time
    typeof startSecondsQueryParam === "string"
      ? setStartSeconds(+startSecondsQueryParam)
      : setStartSeconds(undefined);

    typeof endSecondsQueryParam === "string"
      ? setEndSeconds(+endSecondsQueryParam)
      : setEndSeconds(undefined);
  }, [setStartSeconds, location.search]);

  function handlePlayerReady(e: any) {
    const player = e.target;

    player.setPlaybackRate(playbackSpeed);
  }

  function handlePlaybackRateChange(e: any) {
    dispatch(setSessionPlaybackSpeed(e.data));
  }

  function handleStateChange(e: any) {
    /**
     * If Looping and video ended, go back to the beginning
     *
     * @see https://stackoverflow.com/a/49264465
     */
    if (e.data === EPlayerState.ENDED && shouldLoop)
      e.target.seekTo(startSeconds);
  }

  function getVideoPlayer() {
    return (
      <YouTubePlayer
        videoId={videoId}
        handlePlayerReady={handlePlayerReady}
        handlePlaybackRateChange={handlePlaybackRateChange}
        handleStateChange={handleStateChange}
        options={options}
      />
    );
  }

  return (
    <div className="c-video__player">
      {isLoading ? <Loader position="center-page" /> : getVideoPlayer()}
    </div>
  );
};

export const VideoPlayer = withRouter(_VideoPlayer);
