import React, { FC } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { StatsCardRow } from "components/card/stats-card-row.component";

interface IStatsCardRowData {
  icon: IconDefinition;
  text: string;
}

interface IProps {
  statsCardData?: IStatsCardRowData[];
  isShort?: boolean;
}

export const StatsCard: FC<IProps> = ({ isShort, statsCardData }) => {
  const containerClasses = classNames({
    "c-card c-stats-card": true,
    "c-stats-card--short": isShort
  });

  if (!statsCardData) return null;
  return (
    <div className={containerClasses}>
      {
        statsCardData.map(dataRow => <StatsCardRow key={dataRow.text} icon={dataRow.icon} text={dataRow.text} /> )
      }
    </div>
  );
}