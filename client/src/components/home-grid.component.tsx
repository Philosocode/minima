import React, { FC } from "react";

import { IVideo, IPlaylist } from "shared/interfaces/youtube.interfaces";
import { VideoThumbnail } from "./video-thumbnail.component";

interface IProps {
  headingText: string;
  videos?: IVideo[];
  playlists?: IPlaylist[];
}
export const HomeGrid: FC<IProps> = ({ headingText, playlists, videos }) => {
  if (videos?.length === 0 || playlists?.length === 0) return null;

  return (
    <section className="o-grid__item--wide o-section">
      <h2 className="c-heading c-heading--subtitle">{headingText}</h2>
      <div className="c-video-thumbnail__grid">
        {
          videos?.map((video) => <VideoThumbnail 
            key={video.id} 
            resourceUrl={`/watch?v=${video.id}`}
            thumbnailUrl={video.snippet.thumbnails.medium.url}
            title={video.snippet.title}
          />)
        }
        {
          playlists?.map((playlist) => <VideoThumbnail 
            key={playlist.id} 
            resourceUrl={`/playlist?list=${playlist.id}`}
            thumbnailUrl={playlist.snippet.thumbnails.medium.url}
            title={playlist.snippet.title}
            count={playlist.contentDetails.itemCount.toString()}
          />)
        }
      </div>
    </section>
  )
}