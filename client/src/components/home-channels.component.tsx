import React, { FC } from "react";
import { IChannel } from "shared/interfaces/youtube.interfaces";
import { getAbbreviatedNumber } from "shared/helpers";
import { Link } from "react-router-dom";

interface IProps {
  channels: IChannel[];
}
export const HomeChannels: FC<IProps> = ({ channels }) => {
  console.log(channels[0]);
  
  return (
    <section className="o-grid__item--full c-home__section">
      <h2 className="c-heading c-heading--huge c-heading--block c-home__heading">Channels</h2>
      <div className="c-home__channel-list">
        {
          channels.map(channel => (
            <Link to={`/channel/${channel.id}`} className="c-home__channel-box" key={channel.id}>
              <div className="c-home__channel-image-box">
                <img
                  className="c-home__channel-image"
                  src={channel.snippet.thumbnails.medium.url}
                  alt={channel.snippet.title} 
                />
              </div>
              <div className="c-home__channel-text-box">
                <div className="c-home__channel-text">
                  <h3 className="c-heading c-home__channel-title">{channel.snippet.title}</h3>
                  <h4 className="c-heading c-home__channel-subscribers">{getAbbreviatedNumber(channel.statistics.subscriberCount)} subscribers</h4>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </section>
  )
}