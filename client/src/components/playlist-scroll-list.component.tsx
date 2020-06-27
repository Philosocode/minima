import React, { FC, useState } from "react";

import { IPlaylist, IPlaylistItem } from "shared/interfaces/youtube.interfaces";
import { getPlaylistDetails, getPlaylistVideos, MISSING_THUMBNAIL_URL, getPlaylistVideosUntilCurrentVideo } from "apis/youtube.api";

import { useToggle } from "hooks/use-toggle.hook";
import { PlaylistScrollVideo } from "components/playlist-scroll-video.component";
import { Loader } from "components/loader.component";
import { PlaylistScrollHeader } from "./playlist-scroll-header.component";

interface IProps {
  playlistId: string;
  watchingVideoId: string;
}

export const PlaylistScrollList: FC<IProps> = ({ playlistId, watchingVideoId }) => {
  const [hidingPreviousVideos, toggleHidingPreviousVideos] = useToggle(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [playlistDetails, setPlaylistDetails] = useState<IPlaylist>();
  const [playlistVideos, setPlaylistVideos] = useState<IPlaylistItem[]>([]);
  const [watchingVideoIdx, setWatchingVideoIdx] = useState(0);

  async function handleLoadPlaylistVideos() {
    setIsLoading(true);

    await fetchPlaylistDetails();
    await initialFetchPlaylistVideos();

    setIsLoading(false);
  }

  async function fetchPlaylistDetails() {
    try {
      const playlistRes = await getPlaylistDetails(playlistId);

      setPlaylistDetails(playlistRes);
    } 
    catch(err) {
      alert(err);
    }
  }

  async function fetchPlaylistVideos() {
    setIsLoading(true);

    try {
      const videosRes = await getPlaylistVideos(playlistId, nextPageToken);
      const videosFetched = videosRes.items;
      const updatedVideos = playlistVideos.concat(videosFetched);

      setPlaylistVideos(updatedVideos);
  
      // Update nextPageToken
      if (videosRes.nextPageToken) {
        setNextPageToken(videosRes.nextPageToken)
      }
      else {
        setNextPageToken("");
      }
      
      return videosFetched;
    }
    catch(err) {
      alert(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  function hasMoreVideos() {
    if (!playlistDetails) return true;
    return playlistVideos.length < playlistDetails.contentDetails.itemCount;
  }

  async function initialFetchPlaylistVideos() {
    try {
      const [fetchedVideos, pageToken] = await getPlaylistVideosUntilCurrentVideo(
        watchingVideoId,
        playlistId
      );

      setPlaylistVideos(fetchedVideos);

      if (pageToken) {
        setNextPageToken(pageToken);
      } 
      else {
        setNextPageToken("");
      }
    }
    catch(err) {
      alert(err);
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
      <button className="c-button" onClick={handleLoadPlaylistVideos}>LOAD PLAYLIST</button>
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

  function renderLoadMoreVideosButton() {
    if (!hasMoreVideos()) return;
    if (isLoading) return <Loader position="center-horizontal" />

    return (
      <div className="c-playlist-scroll-list__toggle-previous" onClick={async () => await fetchPlaylistVideos()}>LOAD MORE</div>
    )
  }

  function renderPlaylistVideos() {
    return getVideosToShow().map((v, idx) => { 
      // If not hiding, start at 0
      // If hiding, start at watchingVideoIdx
      const currentVideoIdx = hidingPreviousVideos
        ? watchingVideoIdx + idx
        : idx;
      
      const thumbnailUrl = v.snippet.thumbnails.medium?.url ?? MISSING_THUMBNAIL_URL;

      return (
        <PlaylistScrollVideo 
          key={v.snippet.resourceId.videoId}
          indexInPlaylist={currentVideoIdx}
          playlistId={playlistId}
          setWatchingVideoIdx={setWatchingVideoIdx}
          title={v.snippet.title}
          thumbnailUrl={thumbnailUrl}
          uploaderName={v.snippet.channelTitle}
          videoId={v.snippet.resourceId.videoId}
          watchingVideoId={watchingVideoId}
        />
      )
    })
  }

  // Render
  if (isLoading && playlistVideos.length <= 0) return <Loader position="center-horizontal" />
  if (!playlistDetails || playlistVideos.length <= 0) return renderLoadPlaylistsButton();
  
  return (
    <div className="o-card c-playlist-scroll-list__container">
      <PlaylistScrollHeader 
        channelTitle={playlistDetails.snippet.channelTitle} 
        currentVideoIdx={watchingVideoIdx}
        totalVideos={playlistDetails.contentDetails.itemCount}
        videoTitle={playlistDetails.snippet.title}
      />

      <div className="c-playlist-scroll-list__videos">
        { renderShowPreviousVideosToggle() }
        { renderPlaylistVideos() }
        { renderLoadMoreVideosButton() }
      </div>
    </div>
  );
}