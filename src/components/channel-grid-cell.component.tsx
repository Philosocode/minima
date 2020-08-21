import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IChannel } from "shared/interfaces/youtube.interfaces";
import { getAbbreviatedNumber } from "shared/helpers";

interface IProps {
  channel: IChannel;
}
export const ChannelGridCell: FC<IProps> = ({ channel }) => (
  <Link to={`/channel/${channel.id}`} className="c-channel__grid-cell" key={channel.id}>
    <div className="c-overlay-image__container">
      <img
        className="c-overlay-image"
        src={channel.snippet.thumbnails.medium.url}
        alt={channel.snippet.title} 
      />
    </div>
    <div className="c-channel__text-overlay">
      <h3 className="c-heading c-heading--subsubtitle c-channel__heading">{channel.snippet.title}</h3>
      <h4 className="c-heading c-channel__subscribers c-channel__heading">{getAbbreviatedNumber(channel.statistics.subscriberCount)} subscribers</h4>
    </div>
  </Link>
);