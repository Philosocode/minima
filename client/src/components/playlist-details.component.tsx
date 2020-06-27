import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { getFormattedDate } from "shared/helpers";

interface IProps {
  playlist: IPlaylist;
}

export const PlaylistDetails: FC<IProps> = ({ playlist }) => {
  const { channelId, channelTitle, description, publishedAt, title } = playlist.snippet;
  const numVideos = playlist.contentDetails.itemCount;
  const channelUrl = `/channel/${channelId}`;

  return (
    <div className="c-playlist-details__container">
      <h2 className="c-heading c-heading--block c-heading--huge c-playlist-details__title">{title}</h2>
      <Link className="c-heading c-heading--medium c-heading--link c-playlist-details__channel" to={channelUrl}>{channelTitle}</Link>

      <div className="c-playlist-details__sub-text">
        <span className="c-playlist-details__count">{numVideos} videos</span> • <span className="c-playlist-details__date">{getFormattedDate(publishedAt, "MMM io, yyyy")}</span>
      </div>
      {
        description && (
          <div className="o-text-container o-text-container--html c-playlist-details__description">{description}</div>
        )
      }
    </div>
  )
}