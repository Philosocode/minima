import React, { FC } from "react";

import { ToggleText } from "./toggle-text.component";

interface IProps {
  description: string;
}

export const VideoDescription: FC<IProps> = ({ description }) => ( 
  <div className="c-video__description">
    <ToggleText text={description} />
  </div>
 )