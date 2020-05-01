import React, { FC } from "react";

type Position = "left" | "centered";
interface IProps {
  position: Position;
}

// FROM: https://github.danielcardoso.net/load-awesome/animations/ball-fussion.html
export const Loader: FC<IProps> = ({ position }) => {
  let containerClasses = "loader__container";
  if (position === "centered") containerClasses += " loader__container--centered";
  if (position === "left") containerClasses += " loader__container--left";

  return (
    <div className={containerClasses}>
      <div className="loader__balls">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
