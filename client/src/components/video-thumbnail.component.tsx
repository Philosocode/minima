import React, { FC } from "react";
import { Link } from "react-router-dom";

import { getFormattedDateFromToday } from "shared/helpers";

interface IProps {
  count?: number;
  resourceUrl: string;
  date: string;
  thumbnailUrl: string;
  title: string;
}

export const VideoThumbnail: FC<IProps> = ({ count, date, resourceUrl, thumbnailUrl, title }) => {
  return (
    <div className="c-video-thumbnail__container">
      <Link className="c-video-thumbnail__link" to={resourceUrl}>
        <div className="c-video-thumbnail__image-container">
          <img className="c-video-thumbnail__image" src={thumbnailUrl} alt={title} />
          { count && <div className="c-video-thumbnail__count">{count} Videos</div>}
        </div>
        <div className="c-video-thumbnail__text">
          <h3 className="c-video-thumbnail__title">{title}</h3>
          <div className="c-video-thumbnail__published">{ getFormattedDateFromToday(date)} ago</div>
        </div>
      </Link>
    </div>
  );
}