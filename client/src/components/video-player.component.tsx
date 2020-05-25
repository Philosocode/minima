import React, { FC } from "react";

import { Loader } from "components/loader.component";
import { YouTubePlayer } from "components/youtube-player.component";

interface IProps {
  isLoading: boolean;
  videoId: string;
  playlistId?: string;
}
export const VideoPlayer: FC<IProps> = ({ isLoading, playlistId, videoId }) => { 
  function renderVideoPlayer() {
    return <YouTubePlayer videoId={videoId} onPlayerReady={onPlayerReady} playlistId={playlistId} />
  }

  function onPlayerReady(e: any) {
    const player = e.target;
    
    player.setPlaybackRate(1);
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