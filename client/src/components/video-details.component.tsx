import React, { FC } from "react";

import { IChannel, IVideo } from "shared/interfaces/youtube.interface";
import { getAbbreviatedNumber, getFormattedDate, addCommasToNumber } from "shared/helpers";
import { LikesBar } from "./likes-bar.component";
import { Link } from "react-router-dom";

interface IProps {
  channelData: IChannel;
  videoData: IVideo;
}

export const VideoDetails: FC<IProps> = ({ channelData, videoData }) => {
  const { title, publishedAt, channelId, channelTitle } = videoData.snippet; 
  const { likeCount, dislikeCount, viewCount } = videoData.statistics;

  const uploaderImageUrl = channelData.snippet.thumbnails.default.url;
  const { subscriberCount } = channelData.statistics;

  const channelUrl = `/channel/${channelId}`;

  // e.g. December 6th, 2019
  const formattedPublishDate = getFormattedDate(publishedAt, "PPP");
  
  return (
    <div className="c-video__details">
      <h2 className="c-video__title">{title}</h2>

      <div className="o-media c-uploader">

        <Link to={channelUrl} className="o-media__image">
          <img className="c-channel__image c-channel__image--small" src={uploaderImageUrl} alt={channelTitle} />
        </Link>

        <div className="o-media__body o-media__body--center-vertically">
          <Link to={channelUrl} className="c-channel__name">{channelTitle}</Link>
          <h3 className="c-channel__subscriber-count">{getAbbreviatedNumber(subscriberCount)} subscribers</h3>
        </div>
        
      </div>

      <div className="c-video__details-text">
        <div className="c-video__published">{formattedPublishDate}</div>
        <div className="c-video__views">{addCommasToNumber(viewCount)} views</div>
      </div>
      
      <LikesBar likes={+likeCount} dislikes={+dislikeCount} />        
    </div>
  );
}