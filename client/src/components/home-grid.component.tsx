import React, { FC } from "react";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { VideoThumbnail } from "./video-thumbnail.component";

interface IProps {
  videos?: IVideo[];
}
export const HomeGrid: FC<IProps> = ({ videos }) => {
  function renderVideos() {
    if (!videos) return;

    return (
      <>
        <h2 className="c-heading c-heading--huge c-heading--block">Videos</h2>
        {
          videos.map((video) => <VideoThumbnail 
            key={video.id} 
            date={video.snippet.publishedAt}
            resourceUrl={`/watch?v=${video.id}`}
            thumbnailUrl={video.snippet.thumbnails.medium.url}
            title={video.snippet.title}
          />)
        }
      </>
    )
  }

  return (
    <div className="o-grid__item--wide">
      { renderVideos() }
    </div>
  )
}