import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IProps {
  icon: IconDefinition;
  text: string;
}

export const VideoStatsRow: FC<IProps> = ({ icon, text }) => (
  <div className="c-video-stats__row">
    <div className="c-video-stats__icon">
      <FontAwesomeIcon className="c-video-stats__icon" icon={icon} /> 
    </div>
    <div className="c-video-stats__text">{text}</div>
  </div>
)