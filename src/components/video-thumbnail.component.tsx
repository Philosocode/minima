import React, { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { getFormattedDateFromToday } from "shared/helpers";

interface IProps {
  resourceUrl: string;
  thumbnailUrl: string;
  title: string;
  centered?: boolean;
  numVideos?: number | string;
  date?: string;
  index?: string;
}

export const VideoThumbnail: FC<IProps> = ({ numVideos, date, index, resourceUrl, thumbnailUrl, title }) => {
  const labelClasses = classNames({
    "c-video__label": true,
    "c-video__label--index": index,
    "c-video__label--num-videos": numVideos
  });

  return (
    <div className="c-video-thumbnail">
      <Link className="c-video-thumbnail__link" to={resourceUrl}>
        <div className="c-video-thumbnail__image-container">
          { index && <div className={labelClasses}>{index}</div>}
          <img className="c-video-thumbnail__image" src={thumbnailUrl} alt={title} />
          { numVideos && <div className={labelClasses}>{numVideos} Videos</div>}
        </div>
        <div className="c-video-thumbnail__text">
          <h3 className="c-video-thumbnail__title">{title}</h3>
          { date && <div className="c-video-thumbnail__published">{ getFormattedDateFromToday(date)} ago</div> }
        </div>
      </Link>
    </div>
  );
}