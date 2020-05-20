import React, { FC } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { ProgressBar } from "components/progress-bar.component";
import { StatsCardRow } from "components/stats-card-row.component";


interface IStatsCardRowData {
  icon: IconDefinition;
  text: string;
}

interface IProps {
  statsCardData?: IStatsCardRowData[];
  isShort?: boolean;
  progressBarPercentage?: number;
}

export const StatsCard: FC<IProps> = ({ isShort, statsCardData, progressBarPercentage }) => {
  return (
    <div className={`o-card c-stats-card__container ${isShort && "c-stats-card__container--short"}`}>
      <div className="c-stats-card__content">
        {
          statsCardData && statsCardData.map(dataRow => <StatsCardRow key={dataRow.text} icon={dataRow.icon} text={dataRow.text} /> )
        }
        {
          progressBarPercentage && <ProgressBar percentage={progressBarPercentage} />
        }
      </div>
    </div>
  );
}