import React, { FC, useState, useEffect } from "react";

import { IPlaylist, IPlaylistItem } from "shared/interfaces/youtube.interface";
import { getPlaylistDetails, getAllPlaylistVideos } from "apis/youtube.api";

import { useToggle } from "hooks/use-toggle.hook";
import { PlaylistScrollVideo } from "components/playlist-scroll-video.component";
import { Loader } from "components/loader.component";
import { PlaylistScrollHeader } from "./playlist-scroll-header.component";

interface IProps {
  playlistId: string;
  watchingVideoId: string;
}

export const PlaylistScrollList: FC<IProps> = ({ playlistId, watchingVideoId }) => {
  const [playlistVideos, setPlaylistVideos] = useState<IPlaylistItem[]>([]);
  const [playlistDetails, setPlaylistDetails] = useState<IPlaylist>();
  const [watchingVideoIdx, setWatchingVideoIdx] = useState(0);
  const [hidingPreviousVideos, toggleHidingPreviousVideos] = useToggle(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearState();
  }, [playlistId])

  function clearState() {
    setPlaylistVideos([]);
    setPlaylistDetails(undefined);
    setWatchingVideoIdx(0);
    setIsLoading(false);
  }

  async function fetchPlaylistVideos() {
    setIsLoading(true);

    try {
      const videosRes = await getAllPlaylistVideos(playlistId);
      setPlaylistVideos(videosRes);

      const playlistRes = await getPlaylistDetails(playlistId);
      setPlaylistDetails(playlistRes);
    }
    catch(err) {
      alert(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  function getVideosToShow() {
    if (hidingPreviousVideos) {
      return playlistVideos.slice(watchingVideoIdx);
    }

    return playlistVideos;
  }

  function renderLoadPlaylistsButton() {
    return (
      <button className="c-button" onClick={fetchPlaylistVideos}>LOAD PLAYLIST</button>
    )
  }

  function renderShowPreviousVideosToggle() {
    if (watchingVideoIdx === 0) return;

    const toggleText = hidingPreviousVideos
      ? "Show Previous Videos"
      : "Hide Previous Videos";

    return (
      <div className="c-playlist-scroll-list__toggle-previous" onClick={toggleHidingPreviousVideos}>{toggleText}</div>
    )
  }

  function renderPlaylistVideos() {
    return getVideosToShow().map((v, idx) => { 
      // If not hiding, start at 0
      // If hiding, start at watchingVideoIdx
      const currentVideoIdx = hidingPreviousVideos
        ? watchingVideoIdx + idx
        : idx;

      return (
        <PlaylistScrollVideo 
          key={v.snippet.resourceId.videoId}
          indexInPlaylist={currentVideoIdx}
          playlistId={playlistId}
          setWatchingVideoIdx={setWatchingVideoIdx}
          title={v.snippet.title}
          thumbnailUrl={v.snippet.thumbnails.medium.url} 
          uploaderName={v.snippet.channelTitle}
          videoId={v.snippet.resourceId.videoId}
          watchingVideoId={watchingVideoId}
        />
      )
    })
  }

  // Render
  if (isLoading) return <Loader position="center-horizontal" />
  if (playlistVideos.length <= 0 || !playlistDetails) return renderLoadPlaylistsButton();
  
  return (
    <div className="o-card c-playlist-scroll-list__container">
      <PlaylistScrollHeader 
        channelTitle={playlistDetails.snippet.channelTitle} 
        currentVideoIdx={watchingVideoIdx}
        totalVideos={playlistVideos.length - 1}
        videoTitle={playlistDetails.snippet.title}
      />

      <div className="c-playlist-scroll-list__videos">
        { renderShowPreviousVideosToggle() }
        { renderPlaylistVideos() }
      </div>
    </div>
  );
}