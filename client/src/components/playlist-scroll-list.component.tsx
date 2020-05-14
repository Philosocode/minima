import React, { FC, useState, useEffect } from "react";

import { IPlaylist, IPlaylistItem } from "shared/interfaces/youtube.interface";
import { getPlaylistDetails, getVideosForPlaylist } from "apis/youtube.api";

import { PlaylistScrollVideo } from "components/playlist-scroll-video.component";
import { Loader } from "./loader.component";

interface IProps {
  playlistId: string;
  watchingVideoId: string;
}

export const PlaylistScrollList: FC<IProps> = ({ playlistId, watchingVideoId }) => {
  const [playlistVideos, setPlaylistVideos] = useState<IPlaylistItem[]>([]);
  const [playlistDetails, setPlaylistDetails] = useState<IPlaylist>();
  const [watchingVideoIdx, setWatchingVideoIdx] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearState();
  }, [playlistId])

  function clearState() {
    setPlaylistVideos([]);
    setPlaylistDetails(undefined);
    setWatchingVideoIdx(1);
    setIsLoading(false);
  }

  async function fetchPlaylistVideos() {
    setIsLoading(true);

    try {
      const videosRes = await getVideosForPlaylist(playlistId);
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

  function renderLoadPlaylistsButton() {
    return (
      <div className="c-link-text c-link-text--centered" onClick={fetchPlaylistVideos}>LOAD PLAYLIST</div>
    )
  }

  // Render
  if (isLoading) return <Loader position="centered" />
  if (playlistVideos.length <= 0 || !playlistDetails) return renderLoadPlaylistsButton();

  console.log(playlistDetails);
  
  return (
    <div className="o-card c-playlist-scroll-list__container">

      <div className="c-playlist-scroll-list__header">
        <div className="c-playlist-scroll-list__content">
          <h3 className="c-playlist-scroll-list__title">{playlistDetails.snippet.title}</h3>
          <div className="c-playlist-scroll-list__sub-text">
            <div className="c-playlist-scroll-list__creator">{playlistDetails.snippet.channelTitle}</div>
            <div className="c-playlist-scroll-list__video-count">{watchingVideoIdx} / {playlistVideos.length}</div>
          </div>
        </div>
      </div>

      <div className="c-playlist-scroll-video__list">
        {
          playlistVideos.map((v, idx) => (
            <PlaylistScrollVideo 
              key={v.snippet.resourceId.videoId}
              indexInPlaylist={idx+1}
              playlistId={playlistId}
              setWatchingVideoIdx={setWatchingVideoIdx}
              title={v.snippet.title}
              thumbnailUrl={v.snippet.thumbnails.medium.url} 
              uploaderName={v.snippet.channelTitle}
              videoId={v.snippet.resourceId.videoId}
              watchingVideoId={watchingVideoId}
            />
          ))
        }
      </div>
    </div>
  );
}

/* SHOW:
- thumbnail
- video length
- 
*/
