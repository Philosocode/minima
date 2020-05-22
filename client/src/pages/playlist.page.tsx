import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { IPlaylist, IPlaylistItem } from "shared/interfaces/youtube.interface";
import { getPlaylistDetails, getPlaylistVideos } from "apis/youtube.api";
import { Loader } from "components/loader.component";
import { VideoGrid } from "components/video-grid.component";
import { PlaylistDetails } from "components/playlist-details.component";
import { Divider } from "components/divider.component";

interface IRouteParams {
  playlistId: string;
}

const _PlaylistPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => {
  // State
  const [playlistDetails, setPlaylistDetails] = useState<IPlaylist>();
  const [videos, setVideos] = useState<IPlaylistItem[]>([]);
  const [videosPageToken, setVideosPageToken] = useState<string>();
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const playlistId = match.params.playlistId;
  
  // Functions
  useEffect(() => {
    async function fetchChannelData() {
      setIsLoading(true);

      try {
        const playlistRes = await getPlaylistDetails(playlistId);
        setPlaylistDetails(playlistRes);

        document.title = playlistRes.snippet.title;
      }
      catch (err) {
        alert("ERROR: couldn't load playlist data.");
      }
      finally {
        setIsLoading(false);
      }
    }
    
    fetchChannelData();
  }, [playlistId]);

  async function loadVideos() {
    if (!playlistDetails || !hasMoreVideos) return;

    setIsLoading(true);
    try {
      const res = await getPlaylistVideos(playlistId, videosPageToken);
      
      if (res.nextPageToken) {
        setVideosPageToken(res.nextPageToken);
      }
      else {
        setHasMoreVideos(false);
      }

      const updatedVideos = videos.concat(res.items);
      setVideos(updatedVideos);
    }
    catch(err) {
      alert("ERROR: Failed to load playlist videos.");
    }
    finally {
      setIsLoading(false);
    }
  }

  // Render
  if (!playlistDetails) {
    return <Loader position="center-page" />;
  }

  return (
    <div className="o-page o-page--playlist o-grid__container">
      <div className="o-grid__item--center">
        <PlaylistDetails playlist={playlistDetails} />
        <Divider customClass="c-playlist-details__divider" />
      </div>

      <div className="o-grid__item--wide">
        <VideoGrid 
          videos={videos}
          loadVideos={loadVideos}
          hasMoreVideos={hasMoreVideos}
          isLoading={isLoading}
          showVideoIndices
          playlistId={playlistId} 
        />
      </div>
    </div>
  )
}

export const PlaylistPage = withRouter(_PlaylistPage);