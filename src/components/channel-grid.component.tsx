import React, { FC } from "react";

import { IChannel } from "shared/interfaces/youtube.interfaces";
import { ChannelGridCell } from "./channel-grid-cell.component";

interface IProps {
  channels: IChannel[];
}
export const ChannelGrid: FC<IProps> = ({ channels }) => { 
  if (!channels?.length) return null;

  return (
    <section className="o-grid__item--full o-section">
      <h2 className="c-heading c-heading--subtitle">Channels</h2>
      <div className="c-channel__grid">
        { channels.map(channel => <ChannelGridCell channel={channel} key={channel.id} />) }
      </div>
    </section>
  );
 };