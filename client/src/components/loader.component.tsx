import React, { FC } from "react";

// FROM: https://github.danielcardoso.net/load-awesome/animations/ball-fussion.html
export const Loader: FC = () => {
  return (
    <div className="loader__container">
      <div className="la-ball-fussion">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
