import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { getQueryParams } from "shared/helpers";
import { getPlaylistDetails } from "services/youtube.service";
import { Divider } from "components/divider/divider.component";
import { Loader } from "components/loader/loader.component";
import { PlaylistDetails } from "components/playlist/playlist-details.component";
import { PlaylistVideosThumbnailGrid } from "components/thumbnail-grid/playlist-videos-thumbnail-grid.component";

export const PlaylistPage: FC = () => {
  // State
  const [playlistDetails, setPlaylistDetails] = useState<IPlaylist>();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  
  // Functions
  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const playlistQueryParam = queryParams.query["list"];

    if (typeof playlistQueryParam === "string") {
      fetchPlaylistData(playlistQueryParam);
    }

    async function fetchPlaylistData(playlistId: string) {
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
  }, [location.search]);

  // Render
  if (isLoading || !playlistDetails) return <Loader position="center-page" />;

  return (
    <div className="o-page o-grid">
      <div className="o-grid__item--center">
        <PlaylistDetails playlist={playlistDetails} />
        <Divider />
      </div>

      <div className="o-grid__item--wide">
        <PlaylistVideosThumbnailGrid playlistId={playlistDetails.id} />
      </div>
    </div>
  )
}
