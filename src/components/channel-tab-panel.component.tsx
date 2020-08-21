import React, { FC } from "react";

interface IProps {
  isActive: boolean;
}
export const ChannelTabPanel: FC<IProps> = ({ children, isActive }) => {
  return (
    <div className={`c-tab__panel ${isActive && "is-visible"}`}>
      { children }
    </div>
  )
}