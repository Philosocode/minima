import React, { FC } from "react";

interface IProps {
  textElement: JSX.Element;
}

export const HTMLTextContainer: FC<IProps> = ({ textElement }) => {
  return (
    <div className="c-text--html c-text--left c-body-text">
      {textElement}
    </div>
  )
}