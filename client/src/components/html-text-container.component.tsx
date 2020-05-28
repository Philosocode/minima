import React, { FC } from "react";

interface IProps {
  textElement: JSX.Element;
}

export const HTMLTextContainer: FC<IProps> = ({ textElement }) => {
  return (
    <div className="o-text-container o-text-container--html o-text-container--left c-toggle-text__container">
      {textElement}
    </div>
  )
}