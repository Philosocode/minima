import React, { FC, useState } from "react";
import _ from "lodash";

import { IScrollListHeader, IScrollListVideo, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { MISSING_THUMBNAIL_URL, fetchLikedVideos } from "services/youtube.service";
import { Loader } from "components/loader/loader.component";
import { PlaylistScrollList } from "./playlist-scroll-list.component";
import { IVideo } from "shared/interfaces/youtube.interfaces";
import { useAuth } from "hooks/use-auth.hook";
import { Button } from "../button/button.component";

interface IProps {
  customPlaylistType: "music" | "videos";
  watchingVideoId: string;
}

export const CustomPlaylistScrollList: FC<IProps> = ({ customPlaylistType, watchingVideoId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<IScrollListVideo[]>([]);
  const userId = useAuth();

  const headerDetails: IScrollListHeader = {
    playlistTitle: "Liked Songs",
    playlistId: "music",
    totalVideos: videos.length,
  };

  const videosDetails: IScrollListVideos = {
    hasMoreVideos: false,
    videos
  };

  async function loadVideos() {
    setIsLoading(true);

    const likedVideos = (customPlaylistType === "videos")
      ? await fetchLikedVideos("videos", userId)
      : await fetchLikedVideos("music", userId);

    const [currentVideo] = _.remove(likedVideos, (video) => video.id === watchingVideoId);
    const shuffledLikedVideos = _.shuffle(likedVideos);

    setVideos(getScrollListVideos([currentVideo, ...shuffledLikedVideos]));
    setIsLoading(false);
  }

  function getScrollListVideos(videos: IVideo[]): IScrollListVideo[] {
    return videos.map(video => {
      const thumbnailUrl = video.snippet.thumbnails.medium?.url ?? MISSING_THUMBNAIL_URL;
      
      return {
        playlistId: customPlaylistType,
        title: video.snippet.title,
        thumbnailUrl: thumbnailUrl,
        channelTitle: video.snippet.channelTitle,
        videoId: video.id,
      };
    });
  }

  // Render
  if (isLoading && videos.length <= 0) return <Loader position="center-horizontal" />
  if (videos.length <= 0) return <Button centered onClick={loadVideos}>LOAD PLAYLIST</Button>;

  return (
    <PlaylistScrollList
      headerDetails={headerDetails} 
      videosDetails={videosDetails}
      isLoading={isLoading}
    />
  );
}