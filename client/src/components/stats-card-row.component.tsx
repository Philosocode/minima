import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IProps {
  icon: IconDefinition;
  text: string;
}

export const StatsCardRow: FC<IProps> = ({ icon, text }) => (
  <div className="c-stats-card__row">
    <div className="c-stats-card__icon">
      <FontAwesomeIcon icon={icon} /> 
    </div>
    <div className="c-stats-card__text">{text}</div>
  </div>
)