import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { IPlaylist } from "shared/interfaces/youtube.interface";
import { getPlaylistDetails } from "apis/youtube.api";
import { Loader } from "components/loader.component";

interface IRouteParams {
  playlistId: string;
}

const _PlaylistPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => {
  // State
  const [playlistData, setPlaylistData] = useState<IPlaylist>();
  const [isLoading, setIsLoading] = useState(false);

  const playlistId = match.params.playlistId;
  
  // Functions
  useEffect(() => {
    async function fetchChannelData() {
      setIsLoading(true);

      try {
        const playlistRes = await getPlaylistDetails(playlistId);
        setPlaylistData(playlistRes);

        console.log(playlistRes);

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

  // Render
  if (!playlistData) {
    return <Loader position="center-page" />;
  }
  return (
    <div className="o-page o-page--playlist o-grid__container">
      <div className="o-grid__item--center">
      </div>
    </div>
  )
}

export const PlaylistPage = withRouter(_PlaylistPage);