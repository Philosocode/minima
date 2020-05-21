import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IPlaylistItem } from "shared/interfaces/youtube.interface";
import { getFormattedDateFromToday } from "shared/helpers";

interface IProps {
  video: IPlaylistItem;
}

export const ChannelVideo: FC<IProps> = ({ video }) => {
  const watchLink = `/watch?v=${video.snippet.resourceId.videoId}&list=${video.snippet.playlistId}`;

  return (
    <div className="c-video-thumbnail__container">
      <Link className="c-video-thumbnail__link" to={watchLink}>
        <div className="c-video-thumbnail__image-container">
          <img className="c-video-thumbnail__image" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
        </div>
        <div className="c-video-thumbnail__text">
          <h3 className="c-video-thumbnail__title">{video.snippet.title}</h3>
          <div className="c-video-thumbnail__published">{ getFormattedDateFromToday(video.snippet.publishedAt)} ago</div>
        </div>
      </Link>
    </div>
  )
}