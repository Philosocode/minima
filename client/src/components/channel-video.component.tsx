import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IPlaylistItem } from "shared/interfaces/youtube.interface";
import { getFormattedDateFromToday } from "shared/helpers";

interface IProps {
  video: IPlaylistItem;
}

export const ChannelVideo: FC<IProps> = ({ video }) => {
  const watchLink = `/watch?v=${video.snippet.resourceId.videoId}`;

  return (
    <div className="c-channel-item__container">
      <Link className="c-channel-item__link" to={watchLink}>
        <div className="c-channel-item__image-container">
          <img className="c-channel-item__image" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
        </div>
        <div className="c-channel-item__text">
          <h3 className="c-channel-item__title">{video.snippet.title}</h3>
          <div className="c-channel-item__published">{ getFormattedDateFromToday(video.snippet.publishedAt)} ago</div>
        </div>
      </Link>
    </div>
  )
}