import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IChannel } from "shared/interfaces/youtube.interface";
import { getAbbreviatedNumber } from "shared/helpers";

type Location = "video-page" | "channel-page";

interface IProps {
  channelData: IChannel;
  location: Location;
}

export const ChannelBox: FC<IProps> = ({ channelData, location }) => {
  const channelUrl = `/channel/${channelData.id}`;

  const subscriberCount = channelData.statistics.subscriberCount;
  const channelTitle = channelData.snippet.title;

  // Set classes dynamically
  let imageUrl = channelData.snippet.thumbnails.default.url;
  let imageClasses = "o-thumbnail c-channel__image";
  let headingClasses = "c-heading";
  let subscriberClasses = "c-channel__subscriber-count";

  if (location === "video-page") {
    headingClasses += " c-heading--small c-heading--link";
  }
  else if (location === "channel-page") {
    headingClasses += " c-heading--large";
    imageUrl = channelData.snippet.thumbnails.high.url;
    imageClasses += " c-channel__image--large"; 
    subscriberClasses += " c-channel__subscriber-count--large"
  }

  return (
    <div className="o-media c-channel__box">
      {
        location === "video-page"
          ? <Link to={channelUrl} className="o-media__image"><img className={imageClasses} src={imageUrl} alt={channelTitle} /></Link>
          : <div className="o-media__image"><img className={imageClasses} src={imageUrl} alt={channelTitle} /></div>
      }
      <div className="o-media__body o-media__body--center-vertically">
        {
          location === "video-page"
            ? <Link to={channelUrl} className={headingClasses}>{channelTitle}</Link>
            : <div className={headingClasses}>{channelTitle}</div>
        }
        <h3 className={subscriberClasses}>{getAbbreviatedNumber(subscriberCount)} subscribers</h3>
      </div>
    </div>
  )
}