import React, { FC } from "react";

import { IThumbnail } from "shared/interfaces/custom.interfaces";
import { Thumbnail } from "components/thumbnail-grid/thumbnail.component";
import { MISSING_THUMBNAIL_URL } from "services/youtube.service";

interface IProps {
  items: IThumbnail[];
  showIndexLabel?: true;
}

export const ThumbnailGrid: FC<IProps> = ({ items, showIndexLabel }) => (
  <div className="c-thumbnail__grid">
    {items.map((item, idx) => {
      const { id, date, numItemsInPlaylist, resourceUrl, thumbnailUrl, title } = item;

      return (
        <Thumbnail
          key={id}
          date={date}
          resourceUrl={resourceUrl}
          thumbnailUrl={thumbnailUrl ?? MISSING_THUMBNAIL_URL}
          title={title}
          index={showIndexLabel ? idx.toString() : undefined}
          numItemsInPlaylist={numItemsInPlaylist}
        />
      );
    })}
  </div>
);
