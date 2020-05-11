import React, { FC } from "react";

import { IChannel, IVideo } from "shared/interfaces/youtube.interface";
import { getFormattedDate, addCommasToNumber } from "shared/helpers";
import { LikesBar } from "./likes-bar.component";
import { Divider } from "./divider.component";

interface IProps {
  channelData: IChannel;
  videoData: IVideo;
}

export const VideoDetails: FC<IProps> = ({ channelData, videoData }) => {
  const { publishedAt } = videoData.snippet; 
  const { likeCount, dislikeCount, viewCount } = videoData.statistics;

  // e.g. December 6th, 2019
  const formattedPublishDate = getFormattedDate(publishedAt, "PPP");
  
  return (
    <div className="c-video-details__container">
      <Divider />
      <div className="c-video-details__text">
        <div className="c-video__published">{formattedPublishDate}</div>
        <div className="c-video__views">{addCommasToNumber(viewCount)} views</div>
      </div>
      
      <LikesBar likes={+likeCount} dislikes={+dislikeCount} />        
    </div>
  );
}