import React, { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { getFormattedDateFromToday } from "shared/helpers";

interface IProps {
  resourceUrl: string;
  thumbnailUrl: string;
  title: string;
  centered?: boolean;
  date?: string;
  index?: string;
  numItemsInPlaylist?: number | string;
}

export const Thumbnail: FC<IProps> = ({
  resourceUrl,
  thumbnailUrl,
  title,
  date,
  index,
  numItemsInPlaylist,
}) => {
  const showItemCountLabel = (numItemsInPlaylist !== undefined);

  const labelClasses = classNames({
    "c-thumbnail__label": true,
    "c-thumbnail__label--index": index,
    "c-thumbnail__label--num-videos": showItemCountLabel
  });

  return (
    <div className="c-thumbnail">
      <Link className="c-thumbnail__link" to={resourceUrl}>
        <div className="c-thumbnail__image-container">
          {index && <div className={labelClasses}>{index}</div>}
          {showItemCountLabel && <div className={labelClasses}>{numItemsInPlaylist} Videos</div>}
          <img
            className="c-thumbnail__image"
            src={thumbnailUrl}
            alt={title}
          />
        </div>
        <div className="c-thumbnail__text">
          <h3 className="c-thumbnail__title">{title}</h3>
          {date && (
            <div className="c-thumbnail__published">
              {getFormattedDateFromToday(date)} ago
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
