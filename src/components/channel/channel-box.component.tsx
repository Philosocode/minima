import React, { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { IChannel } from "shared/interfaces/youtube.interfaces";
import { getAbbreviatedNumber } from "shared/helpers";
import { selectLikedChannels } from "redux/like";
import { useLike } from "hooks/use-like.hook";
import { HeartIcon } from "../icon/heart-icon.component";

type Location = "video-page" | "channel-page";

interface IProps {
  channelData: IChannel;
  location: Location;
}

export const ChannelBox: FC<IProps> = ({ channelData, location }) => {
  const [channelLiked, toggleChannelLiked] = useLike("channels", channelData.id, selectLikedChannels);
  
  const channelUrl = `/channel/${channelData.id}`;
  const subscriberCount = channelData.statistics.subscriberCount;
  const channelTitle = channelData.snippet.title;
  const { thumbnails } = channelData.snippet;

  const imageUrl = (location === "channel-page")
    ? thumbnails.high.url
    : thumbnails.default.url;

  const headingClasses = classNames({
    "c-heading": true,
    "c-heading--subsubtitle": location === "channel-page",
    "c-text--link": location === "video-page"
  });

  const imageClasses = classNames({
    "o-thumbnail c-channel__image": true,
    "c-channel__image--large": location === "channel-page"
  });

  const subscriberClasses = classNames({
    "c-heading--small c-channel__subscribers c-channel__subscribers--grey": true,
    "c-channel__subscribers--large": location === "channel-page"
  });

  function getChannelHeading() {
    if (location === "video-page") return <Link to={channelUrl} className={headingClasses}>{channelTitle}</Link>;

    return <h1 className={headingClasses}>{channelTitle}</h1>;
  }

  function getChannelThumbnail() {
    const image = <img className={imageClasses} src={imageUrl} alt={channelTitle} />;

    if (location === "video-page") return <Link to={channelUrl} className="o-media__image">{image}</Link>;
    return <div className="o-media__image">{image}</div>;
  }

  return (
    <div className="o-media c-channel__media">
      { getChannelThumbnail() }
      
      <div className="o-media__body o-media__body--vertical-center">
        <div className="c-channel__media-body">
          <div className="c-channel__media-text">
            { getChannelHeading() }
            <h3 className={subscriberClasses}>{getAbbreviatedNumber(subscriberCount)} subscribers</h3>
          </div>
          {
            location === "channel-page" && <HeartIcon isLiked={channelLiked} toggleIsLiked={toggleChannelLiked} />
          }
        </div>
      </div>
    </div>
  )
}