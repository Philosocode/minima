import React, { FC } from "react";

export const ChannelTabs: FC = () => {
  return (
    <div className="c-channel-tab__container">
      <h3 className="c-channel-tab__heading">Uploads</h3>
      <h3 className="c-channel-tab__heading">Playlists</h3>
      <h3 className="c-channel-tab__heading">Description</h3>
    </div>
  )
}