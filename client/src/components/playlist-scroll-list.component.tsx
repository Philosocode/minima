import React, { FC } from "react";

import { IPlaylistItem } from "shared/interfaces/youtube.interface";
import { PlaylistVideo } from "./playlist-video.component";

interface IProps {
  playlistId: string;
  videos: IPlaylistItem[];
}

export const PlaylistScrollList: FC<IProps> = ({ playlistId, videos }) => {
  console.log(videos);
  
  return (
    <div className="c-playlist-video__list">
      {
        videos.map(v => (
          <PlaylistVideo 
            key={v.snippet.resourceId.videoId}
            playlistId={playlistId}
            title={v.snippet.title}
            thumbnailUrl={v.snippet.thumbnails.default.url} 
            uploaderName={v.snippet.channelTitle}
            videoId={v.snippet.resourceId.videoId}
          />
        ))
      }
    </div>
  );
}

/* SHOW:
- thumbnail
- video length
- 
*/
