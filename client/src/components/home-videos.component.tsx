import React, { FC } from "react";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { VideoThumbnail } from "./video-thumbnail.component";

interface IProps {
  videos: IVideo[];
}
export const HomeVideos: FC<IProps> = ({ videos }) => {
  if (videos.length === 0) return null;

  return (
    <section className="o-grid__item--wide">
      <>
        <h2 className="c-heading c-heading--huge c-heading--block c-home__heading">Videos</h2>
        <div className="c-video-thumbnail__grid">
          {
            videos.map((video) => <VideoThumbnail 
              key={video.id} 
              resourceUrl={`/watch?v=${video.id}`}
              thumbnailUrl={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
            />)
          }
        </div>
      </>
    </section>
  )
}