import React, { FC } from "react";

import { Loader } from "components/loader.component";
import { YouTubePlayer } from "components/youtube-player.component";

interface IProps {
  isLoading: boolean;
  videoId: string;
}
export const VideoPlayer: FC<IProps> = ({ isLoading, videoId }) => { 
  function renderVideoPlayer() {
    return <YouTubePlayer videoId={videoId} onPlayerReady={onPlayerReady} />
  }

  function onPlayerReady(e: any) {
    e.target.setPlaybackRate(2);
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