import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IChannel } from "shared/interfaces/youtube.interface";
import { getAbbreviatedNumber } from "shared/helpers";

interface IProps {
  channelData: IChannel;
}

export const VideoUploader: FC<IProps> = ({ channelData }) => {
  const channelUrl = `/channel/${channelData.id}`;
  const imageUrl = channelData.snippet.thumbnails.default.url;
  const subscriberCount = channelData.statistics.subscriberCount;
  const channelTitle = channelData.snippet.title;

  return (
    <div className="o-media c-uploader">
      <Link to={channelUrl} className="o-media__image">
        <img className="c-channel__image c-channel__image--small" src={imageUrl} alt={channelTitle} />
      </Link>
      <div className="o-media__body o-media__body--center-vertically">
        <Link to={channelUrl} className="c-heading c-heading--small c-heading--link">{channelTitle}</Link>
        <h3 className="c-channel__subscriber-count">{getAbbreviatedNumber(subscriberCount)} subscribers</h3>
      </div>
    </div>
  )
}