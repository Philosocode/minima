import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";

import { IPlaylist, IPlaylistItem } from "shared/interfaces/youtube.interface";
import { getFormattedDate } from "shared/helpers";
import { getPlaylistDetails } from "apis/youtube.api";
import { Loader } from "components/loader.component";

interface IRouteParams {
  playlistId: string;
}

const _PlaylistPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => {
  // State
  const [playlistDetails, setPlaylistDetails] = useState<IPlaylist>();
  const [videos, setVideos] = useState<IPlaylistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const playlistId = match.params.playlistId;
  
  // Functions
  useEffect(() => {
    async function fetchChannelData() {
      setIsLoading(true);

      try {
        const playlistRes = await getPlaylistDetails(playlistId);
        setPlaylistDetails(playlistRes);

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
  if (!playlistDetails) {
    return <Loader position="center-page" />;
  }

  const { channelId, channelTitle, description, publishedAt, title } = playlistDetails.snippet;
  const numVideos = playlistDetails.contentDetails.itemCount;
  const thumbnailUrl = playlistDetails.snippet.thumbnails.medium.url;
  const channelUrl = `/channel/${channelId}`;

  return (
    <div className="o-page o-page--playlist o-grid__container">
      <div className="o-grid__item--center">
        <div className="c-playlist">
          <img src={thumbnailUrl} alt={title} />
          <h2 className="c-heading c-heading--large">{title}</h2>
          <Link to={channelUrl}>{channelTitle}</Link>
          <div>Published: {getFormattedDate(publishedAt, "MMM io, yyyy")}</div>
          <div className="">{numVideos} videos</div>
          <div className="o-text-container">{description}</div>
        </div>
      </div>
    </div>
  )
}

export const PlaylistPage = withRouter(_PlaylistPage);