import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { selectSessionPlaybackSpeed, setSessionPlaybackSpeed } from "redux/preference";
import { Loader } from "components/loader.component";
import { YouTubePlayer } from "components/youtube-player.component";
import { getQueryParams } from "shared/helpers";
import { selectShouldLoop } from "redux/video";

interface IProps {
  isLoading: boolean;
  videoId: string;
  playlistId?: string;
}

enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING,
  PAUSED,
  BUFFERING,
  VIDEO_CUED = 5
}

const _VideoPlayer: FC<RouteComponentProps & IProps> = ({ location, isLoading, playlistId, videoId }) => { 
  const [startSeconds, setStartSeconds] = useState<number>();
  const [endSeconds, setEndSeconds] = useState<number>();
  const playbackSpeed = useSelector(selectSessionPlaybackSpeed);
  const shouldLoop = useSelector(selectShouldLoop);
  const dispatch = useDispatch();

  const options = {
    modestBranding: 1,
    rel: 0,
    ...playlistId && { 
      listType: "playlist",
      list: playlistId
    },
    ...startSeconds && { start: startSeconds },
    ...endSeconds && { end: endSeconds }
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const startSecondsQueryParam = queryParams.query["start"];
    const endSecondsQueryParam = queryParams.query["end"];

    typeof startSecondsQueryParam === "string"
    ? setStartSeconds(+startSecondsQueryParam)
    : setStartSeconds(undefined);

  typeof endSecondsQueryParam === "string"
    ? setEndSeconds(+endSecondsQueryParam)
    : setEndSeconds(undefined);
  }, [setStartSeconds, location.search])

  function handlePlayerReady(e: any) {
    const player = e.target;
    
    player.setPlaybackRate(playbackSpeed);
  }

  function handlePlaybackRateChange(e: any) {
    dispatch(setSessionPlaybackSpeed(e.data));
  }

  function handleStateChange(e: any) {
    // FROM: https://stackoverflow.com/a/49264465
    if (e.data === PlayerState.ENDED && shouldLoop) e.target.seekTo(startSeconds);
  }

  function renderVideoPlayer() {
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
      {
        isLoading
          ? <Loader position="center-page" />
          : renderVideoPlayer()
      }
    </div>
  );
 }

 export const VideoPlayer = withRouter(_VideoPlayer);