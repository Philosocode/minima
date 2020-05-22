import React, { FC } from "react";
import { Link } from "react-router-dom";

import { getFormattedDateFromToday } from "shared/helpers";

interface IProps {
  date: string;
  resourceUrl: string;
  thumbnailUrl: string;
  title: string;
  count?: number;
  index?: string;
}

export const VideoThumbnail: FC<IProps> = ({ count, date, index, resourceUrl, thumbnailUrl, title }) => {
  return (
    <div className="c-video-thumbnail__container">
      <Link className="c-video-thumbnail__link" to={resourceUrl}>
        <div className="c-video-thumbnail__image-container">
          { index && <div className="c-video-thumbnail__index">{index}</div>}
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