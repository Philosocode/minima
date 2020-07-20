import React, { FC } from "react";

import { HTMLTextContainer } from "./html-text-container.component";
import { linkifyText } from "shared/jsx-helpers";

interface IProps {
  description: string;
}

export const VideoDescription: FC<IProps> = ({ description }) => { 
  const textWithLinkedTimes = linkifyText(description);
  
  return (
    <div className="c-video__description">
      <HTMLTextContainer textElement={textWithLinkedTimes} />
    </div>
  )
}