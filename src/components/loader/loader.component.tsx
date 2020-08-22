import React, { FC } from "react";
import classNames from "classnames";

type Position = "left" | "center-horizontal" | "center-page";
interface IProps {
  position: Position;
  className?: string;
}

// FROM: https://github.danielcardoso.net/load-awesome/animations/ball-fussion.html
export const Loader: FC<IProps> = ({ className, position }) => {
  const loaderClasses = classNames("loader", `loader--${position}`, className)

  return (
    <div className={loaderClasses}>
      <div className="loader__balls">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
