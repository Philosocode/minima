import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectSessionPlaybackSpeed, setSessionPlaybackSpeed } from "redux/preference";
import { Loader } from "components/loader.component";
import { YouTubePlayer } from "components/youtube-player.component";

interface IProps {
  isLoading: boolean;
  videoId: string;
  playlistId?: string;
}
export const VideoPlayer: FC<IProps> = ({ isLoading, playlistId, videoId }) => { 
  const dispatch = useDispatch();
  const playbackSpeed = useSelector(selectSessionPlaybackSpeed);

  function renderVideoPlayer() {
    return (
      <YouTubePlayer 
        videoId={videoId} 
        handlePlayerReady={handlePlayerReady} 
        handlePlaybackRateChange={handlePlaybackRateChange}
        playlistId={playlistId} 
      />
    );
  }

  function handlePlayerReady(e: any) {
    const player = e.target;
    
    player.setPlaybackRate(playbackSpeed);
  }

  function handlePlaybackRateChange(e: any) {
    dispatch(setSessionPlaybackSpeed(e.data));
  }

  return (
    <div className="o-container c-video-player__container">
      {
        isLoading
          ? <Loader position="center-page" />
          : renderVideoPlayer()
      }
    </div>
  );
 }