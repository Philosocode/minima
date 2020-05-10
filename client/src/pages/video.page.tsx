import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { IChannel, IVideo } from "shared/interfaces/youtube.interface";
import { getChannelDetails, getVideoDetails } from "apis/youtube.api";

import { Divider } from "components/divider.component";
import { Loader } from "components/loader.component";
import { ThreadList } from "components/thread-list.component";
import { VideoDetails } from "components/video-details.component";
import { VideoDescription } from "components/video-description";
import { VideoPlayer } from "components/video-player.component";

interface IRouteParams {
  videoId: string;
}

const _VideoPage: FC<RouteComponentProps<IRouteParams>> = ({ match, history }) => { 
  // State
  const [videoData, setVideoData] = useState<IVideo>();
  const [channelData, setChannelData] = useState<IChannel>();

  const { videoId } = match.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  
  // Functions
  useEffect(() => {
    async function fetchVideoAndChannelData() {
      try {
        const videoRes = await getVideoDetails(videoId);
        setVideoData(videoRes);

        const channelRes = await getChannelDetails(videoRes.snippet.channelId);
        setChannelData(channelRes.items[0]);

        document.title = videoRes.snippet.title;
      }
      catch (err) {
        history.push("/not-found");
      }
    }
    fetchVideoAndChannelData();
  }, [history, videoId]);

  if (!channelData || !videoData) {
    return <Loader position="centered" />;
  }
  return (
    <>
      <VideoPlayer videoId={videoId} videoUrl={videoUrl} />
      <VideoDetails videoData={videoData} channelData={channelData} />
      <Divider />
      <VideoDescription description={videoData.snippet.description} />
      <Divider />
      <ThreadList numComments={videoData.statistics.commentCount} videoId={videoId}  />
    </>
  );
};

export const VideoPage = withRouter(_VideoPage);