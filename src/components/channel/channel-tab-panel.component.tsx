import React, { FC } from "react";
import classNames from "classnames";

interface IProps {
  isVisible: boolean;
}
export const ChannelTabPanel: FC<IProps> = ({ children, isVisible }) => {
  const tabClasses = classNames({
    "c-tab__panel": true,
    "is-visible": isVisible
  })

  return (
    <div className={tabClasses}>
      { children }
    </div>
  )
}