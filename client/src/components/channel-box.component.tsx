import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import { IChannel } from "shared/interfaces/youtube.interfaces";
import { getAbbreviatedNumber } from "shared/helpers";
import { useSelector, useDispatch } from "react-redux";
import { selectLikedChannels, unlikeResource, likeResource } from "redux/like";

type Location = "video-page" | "channel-page";

interface IProps {
  channelData: IChannel;
  location: Location;
}

export const ChannelBox: FC<IProps> = ({ channelData, location }) => {
  const likedChannels = useSelector(selectLikedChannels);
  const dispatch = useDispatch();
  const channelLiked = likedChannels.includes(channelData.id);

  function toggleChannelLike() {
    channelLiked
      ? dispatch(unlikeResource("channels", channelData.id))
      : dispatch(likeResource("channels", channelData.id));
  }

  function renderChannelHeading() {
    if (location === "video-page") return <Link to={channelUrl} className={headingClasses}>{channelTitle}</Link>;

    return <div className={headingClasses}>{channelTitle}</div>;
  }

  function renderLikeIcon() {
    return (
      <div className="c-like-icon__container">
        <FontAwesomeIcon
          className={regularIconClasses}
          icon={["far", "heart"]} 
          onClick={toggleChannelLike}
        />
        <FontAwesomeIcon
          className={solidIconClasses}
          icon={["fas", "heart"]} 
          onClick={toggleChannelLike}
        />
      </div>
    );
  }

  const channelUrl = `/channel/${channelData.id}`;
  const subscriberCount = channelData.statistics.subscriberCount;
  const channelTitle = channelData.snippet.title;
  const { thumbnails } = channelData.snippet;

  let imageUrl = (location === "channel-page")
    ? thumbnails.high.url
    : thumbnails.default.url;

  const headingClasses = classNames({
    "c-heading": true,
    "c-heading--large": location === "channel-page",
    "c-heading--small c-heading--link": location === "video-page"
  });

  const imageClasses = classNames({
    "o-thumbnail c-channel__image": true,
    "c-channel__image--large": location === "channel-page"
  });

  const regularIconClasses = classNames({
    "c-like-icon__icon c-like-icon__icon--regular": true,
    "c-like-icon__icon--hidden": channelLiked
  });

  const solidIconClasses = classNames({
    "c-like-icon__icon c-like-icon__icon--solid": true,
    "c-like-icon__icon--hidden": !channelLiked
  });

  const subscriberClasses = classNames({
    "c-channel__subscriber-count": true,
    "c-channel__subscriber-count--large": location === "channel-page"
  });

  return (
    <div className="o-media c-channel__box">
      {
        location === "video-page"
          ? <Link to={channelUrl} className="o-media__image"><img className={imageClasses} src={imageUrl} alt={channelTitle} /></Link>
          : <div className="o-media__image"><img className={imageClasses} src={imageUrl} alt={channelTitle} /></div>
      }
      <div className="o-media__body o-media__body--center-vertically">
        <div className="c-channel__header">
          <div className="c-channel__header-text">
            { renderChannelHeading() }
            <h3 className={subscriberClasses}>{getAbbreviatedNumber(subscriberCount)} subscribers</h3>
          </div>
          { location === "channel-page" && renderLikeIcon() }
        </div>
      </div>
    </div>
  )
}