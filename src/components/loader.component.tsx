import React, { FC } from "react";

type Position = "left" | "center-horizontal" | "center-page";
interface IProps {
  customClass?: string;
  position: Position;
}

// FROM: https://github.danielcardoso.net/load-awesome/animations/ball-fussion.html
export const Loader: FC<IProps> = ({ customClass, position }) => {
  return (
    <div className={`loader__container loader__container--${position} ${customClass}`}>
      <div className="loader__balls">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
