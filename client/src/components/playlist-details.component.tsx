import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { getFormattedDate } from "shared/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { selectLikedPlaylists, unlikeResource, likeResource } from "redux/like";

interface IProps {
  playlist: IPlaylist;
}

export const PlaylistDetails: FC<IProps> = ({ playlist }) => {
  const likedPlaylists = useSelector(selectLikedPlaylists);
  const dispatch = useDispatch();
  const playlistLiked = likedPlaylists.includes(playlist.id);

  const { channelId, channelTitle, description, publishedAt, title } = playlist.snippet;
  const numVideos = playlist.contentDetails.itemCount;
  const channelUrl = `/channel/${channelId}`;

  function togglePlaylistLike() {
    playlistLiked
      ? dispatch(unlikeResource("playlists", playlist.id))
      : dispatch(likeResource("playlists", playlist.id));
  }

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
            onClick={togglePlaylistLike}
          />
          <FontAwesomeIcon
            className={solidIconClasses}
            icon={["fas", "heart"]} 
            onClick={togglePlaylistLike}
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