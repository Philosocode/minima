import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { getFormattedDate } from "shared/helpers";
import { selectLikedPlaylists } from "redux/like";
import { useLike } from "hooks/use-like.hook";
import { HeartIcon } from "components/icon/heart-icon.component";

interface IProps {
  playlist: IPlaylist;
}
export const PlaylistDetails: FC<IProps> = ({ playlist }) => {
  const { id, snippet, contentDetails } = playlist;
  const { channelId, channelTitle, description, publishedAt, title } = snippet;
  const numVideos = contentDetails.itemCount;
  const channelUrl = `/channel/${channelId}`;
  const [playlistLiked, togglePlaylistLiked] = useLike("playlists", id, selectLikedPlaylists);

  return (
    <>
      <h2 className="c-heading">{title}</h2>

      <div className="c-playlist-details__row">
        <div>
          <Link className="c-heading c-text--link c-text--underline" to={channelUrl}>{channelTitle}</Link>
          <div className="c-playlist-details__sub-text">
            <span>{numVideos} videos</span> 
            <span className="c-playlist-details__dot"> • </span>
            <span>{getFormattedDate(publishedAt, "MMM io, yyyy")}</span>
          </div>
        </div>
        <HeartIcon isLiked={playlistLiked} toggleIsLiked={togglePlaylistLiked} />
      </div>

      {
        description && (
          <p className="c-body-text c-text--html c-playlist-details__description">{description}</p>
        )
      }
    </>
  )
}