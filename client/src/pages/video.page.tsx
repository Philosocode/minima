import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { IChannel, IPlaylistItem, IVideo } from "shared/interfaces/youtube.interface";
import { getChannelDetails, getVideoDetails, getVideosForPlaylist } from "apis/youtube.api";

import { Divider } from "components/divider.component";
import { Loader } from "components/loader.component";
import { PlaylistScrollList } from "components/playlist-scroll-list.component";
import { ThreadList } from "components/thread-list.component";
import { VideoStats } from "components/video-stats.component";
import { VideoDescription } from "components/video-description";
import { VideoPlayer } from "components/video-player.component";
import { VideoUploader } from "components/video-uploader.component";
import { getQueryParams } from "shared/helpers";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ location, history }) => { 
  // State
  const [videoData, setVideoData] = useState<IVideo>();
  const [channelData, setChannelData] = useState<IChannel>();
  const [playlistVideos, setPlaylistVideos] = useState<IPlaylistItem[]>([]);
  
  // Functions
  useEffect(() => {
    const queryParams = getQueryParams(location.search);

    const videoId = queryParams.query["v"];
    const playlistId = queryParams.query["list"];

    if (typeof videoId === "string") {
      fetchVideoAndChannelData(videoId);
    }
    else {
      alert("ERROR: Invalid video id.");
    }
    if (typeof playlistId === "string") fetchPlaylistVideos(playlistId);

    async function fetchVideoAndChannelData(videoId: string) {
      try {
        const videoRes = await getVideoDetails(videoId);
        setVideoData(videoRes);

        const channelRes = await getChannelDetails(videoRes.snippet.channelId);
        setChannelData(channelRes.items[0]);

        document.title = videoRes.snippet.title;
      }
      catch (err) {
        alert("ERROR: couldn't load video data.");
      }
    }

    async function fetchPlaylistVideos(playlistId: string) {
      if (typeof playlistId !== "string") return;

      try {
        const res = await getVideosForPlaylist(playlistId);
        setPlaylistVideos(res);
      }
      catch (err) {
        history.push("/not-found");
      }
    }
  }, [history, location.search]);

  if (!channelData || !videoData) {
    return <Loader position="centered" />;
  }
  
  return (
    <>
      <div className="o-grid__item--full">
        <VideoPlayer videoId={videoData.id} />
      </div>

      <div className="o-grid__item--wide">
        <h2 className="c-heading--title c-heading--left-align c-video__title">{videoData.snippet.title}</h2>
      </div>
      
      <div className="o-grid__item--left-sidebar">
        <VideoStats videoData={videoData} />
        { playlistVideos.length > 0 && <PlaylistScrollList playlistId={playlistVideos[0].snippet.playlistId} videos={playlistVideos} /> }
      </div>

      <div className="o-grid__item--center-to-right">
        <VideoUploader channelData={channelData} />
        <VideoDescription description={videoData.snippet.description} />
        <Divider />
        <ThreadList numComments={videoData.statistics.commentCount} videoId={videoData.id}  />
      </div>
    </>
  );
};

export const VideoPage = withRouter(_VideoPage);