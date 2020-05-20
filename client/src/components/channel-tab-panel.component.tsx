import React, { FC } from "react";

interface IProps {
  isActive: boolean;
}
export const ChannelTabPanel: FC<IProps> = ({ children, isActive }) => {
  return (
    <div className={`c-channel-tab__panel ${isActive && "c-channel-tab__panel--visible"}`}>
      { children }
    </div>
  )
}