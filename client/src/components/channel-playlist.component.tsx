import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IPlaylist } from "shared/interfaces/youtube.interface";
import { getFormattedDateFromToday } from "shared/helpers";

interface IProps {
  playlist: IPlaylist;
}

export const ChannelPlaylist: FC<IProps> = ({ playlist }) => {
  const playlistLink = `/playlist/${playlist.id}`;
  const numVideos = playlist.contentDetails.itemCount;

  return (
    <div className="c-channel-item__container">
      <Link className="c-channel-item__link" to={playlistLink}>
        <div className="c-channel-item__image-container">
          <img className="c-channel-item__image" src={playlist.snippet.thumbnails.medium.url} alt={playlist.snippet.title} />
          <div className="c-channel-item__count">{numVideos} Videos</div>
        </div>
        <div className="c-channel-item__text">
          <h3 className="c-channel-item__title">{playlist.snippet.title}</h3>
          <div className="c-channel-item__published">{ getFormattedDateFromToday(playlist.snippet.publishedAt)} ago</div>
        </div>
      </Link>
    </div>
  )
}