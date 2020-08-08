import React, { FC, useState } from "react";
import _ from "lodash";

import { IScrollListHeader, IScrollListVideo, IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { MISSING_THUMBNAIL_URL, fetchLikedSongs } from "apis/youtube.api";
import { Loader } from "components/loader.component";
import { ScrollList } from "./scroll-list.component";
import { IVideo } from "shared/interfaces/youtube.interfaces";

interface IProps {
  customPlaylistType: "channel" | "music";
  watchingVideoId: string;
}

export const CustomScrollList: FC<IProps> = ({ customPlaylistType, watchingVideoId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<IScrollListVideo[]>([]);

  async function handleLoadPlaylistVideos() {
    setIsLoading(true);

    const likedSongs = await fetchLikedSongs();
    const [currentSong] = _.remove(likedSongs, (video) => video.id === watchingVideoId);

    const shuffledLikedSongs = _.shuffle(likedSongs);

    setVideos(getScrollListVideos([currentSong, ...shuffledLikedSongs]));

    setIsLoading(false);
  }

  function renderLoadPlaylistsButton() {
    return (
      <button className="c-button" onClick={handleLoadPlaylistVideos}>LOAD PLAYLIST</button>
    )
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
  if (videos.length <= 0) return renderLoadPlaylistsButton();

  const headerDetails: IScrollListHeader = {
    totalVideos: videos.length,
    playlistTitle: "Liked Songs"
  };

  const videosDetails: IScrollListVideos = {
    hasMoreVideos: false,
    videos
  };

  return (
    <ScrollList
      headerDetails={headerDetails} 
      videosDetails={videosDetails}
      isLoading={isLoading}
    />
  );
}