import React, { FC } from "react";

import { IVideo, IPlaylist } from "shared/interfaces/youtube.interfaces";
import { IThumbnail } from "shared/interfaces/custom.interfaces";
import { ThumbnailGrid } from "components/thumbnail-grid/thumbnail-grid.component";

interface IProps {
  headingText: string;
  videos?: IVideo[];
  playlists?: IPlaylist[];
}
export const HomeGrid: FC<IProps> = ({ headingText, playlists, videos }) => {
  if (videos?.length === 0 || playlists?.length === 0) return null;
  const thumbnails = getThumbnails();

  function getThumbnails(): IThumbnail[] | undefined {
    if (videos) {
      return videos.map((video) => ({
        date: video.snippet.publishedAt,
        id: video.id,
        resourceUrl: `/watch?v=${video.id}`,
        thumbnailUrl: video.snippet.thumbnails.medium.url,
        title: video.snippet.title,
      }));
    }

    if (playlists) {
      return playlists.map((playlist) => ({
        id: playlist.id,
        thumbnailUrl: playlist.snippet.thumbnails.medium.url,
        title: playlist.snippet.title,
        resourceUrl: `/playlist?list=${playlist.id}`,
        numItemsInPlaylist: playlist.contentDetails.itemCount.toString(),
      }));
    }
  }

  if (!thumbnails) return null;
  return (
    <section className="o-grid__item--wide o-section">
      <h2 className="c-text--centered c-heading c-heading--subtitle c-heading--spaced">
        {headingText}
      </h2>
      <ThumbnailGrid items={thumbnails} />;
    </section>
  );
};
