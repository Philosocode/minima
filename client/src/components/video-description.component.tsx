import React, { FC } from "react";

import { ToggleText } from "./toggle-text.component";
import { linkify } from "shared/helpers";
import { addLinksToTimes } from "shared/jsx-helpers";

interface IProps {
  description: string;
}

export const VideoDescription: FC<IProps> = ({ description }) => { 
  const textWithAnchorTags = linkify(description);
  const textWithLinkedTimes = addLinksToTimes(textWithAnchorTags);

  console.log(textWithLinkedTimes);
  
  return (
    <div className="c-video__description">
      <ToggleText text={textWithAnchorTags} textElement={textWithLinkedTimes} />
    </div>
  )
  }