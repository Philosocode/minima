import React, { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { useLike } from "hooks/use-like.hook";
import { getFormattedDate } from "shared/helpers";
import { selectLikedPlaylists } from "redux/like";

interface IProps {
  playlist: IPlaylist;
}

export const PlaylistDetails: FC<IProps> = ({ playlist }) => {
  const { channelId, channelTitle, description, publishedAt, title } = playlist.snippet;
  const numVideos = playlist.contentDetails.itemCount;
  const channelUrl = `/channel/${channelId}`;
  const [playlistLiked, togglePlaylistLiked] = useLike("playlists", playlist.id, selectLikedPlaylists);


  const regularIconClasses = classNames({
    "c-like-icon__icon c-like-icon__icon--regular": true,
    "c-like-icon__icon--hidden": playlistLiked
  });

  const solidIconClasses = classNames({
    "c-like-icon__icon c-like-icon__icon--solid": true,
    "c-like-icon__icon--hidden": !playlistLiked
  });

  return (
    <div className="c-playlist-details__container">
      <h2 className="c-heading c-heading--block c-heading--huge c-playlist-details__title">{title}</h2>

      <div className="c-playlist-details__grid">
        <div>
          <Link className="c-heading c-heading--medium c-heading--link c-playlist-details__channel" to={channelUrl}>{channelTitle}</Link>
          <div className="c-playlist-details__sub-text">
            <span className="c-playlist-details__count">{numVideos} videos</span> • <span className="c-playlist-details__date">{getFormattedDate(publishedAt, "MMM io, yyyy")}</span>
          </div>
        </div>

        <div className="c-like-icon__container">
          <FontAwesomeIcon
            className={regularIconClasses}
            icon={["far", "heart"]} 
            onClick={togglePlaylistLiked}
          />
          <FontAwesomeIcon
            className={solidIconClasses}
            icon={["fas", "heart"]} 
            onClick={togglePlaylistLiked}
          />
        </div>
      </div>

      {
        description && (
          <div className="o-text-container o-text-container--html c-playlist-details__description">{description}</div>
        )
      }
    </div>
  )
}