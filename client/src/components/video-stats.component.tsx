import React, { FC } from "react";
import { faCalendarDay, faEye, faThumbsUp, faThumbsDown, faPercent } from "@fortawesome/free-solid-svg-icons";

import { IVideo } from "shared/interfaces/youtube.interface";
import { getFormattedDate, roundToTwoDecimals, addCommasToNumber } from "shared/helpers";
import { ProgressBar } from "./progress-bar.component";
import { VideoStatsRow } from "./video-stats-row.component";

interface IProps {
  videoData: IVideo;
}

export const VideoStats: FC<IProps> = ({ videoData }) => {
  const { publishedAt } = videoData.snippet; 
  const { likeCount, dislikeCount, viewCount } = videoData.statistics;
  const likes = +likeCount;
  const dislikes = +dislikeCount;

  const likesToDislikesPercentage = (likes / (likes + dislikes)) * 100;
  const roundedPercentage = roundToTwoDecimals(likesToDislikesPercentage);

  // e.g. December 6th, 2019
  const formattedPublishDate = getFormattedDate(publishedAt, "MMM io, yyyy");
  
  return (
    <div className="c-video-stats__container">
      <div className="c-video-stats__content">

        <VideoStatsRow icon={faCalendarDay} text={formattedPublishDate} />
        <VideoStatsRow icon={faEye} text={addCommasToNumber(viewCount)} />
        <VideoStatsRow icon={faThumbsUp} text={addCommasToNumber(likeCount)} />
        <VideoStatsRow icon={faThumbsDown} text={addCommasToNumber(dislikeCount)} />
        <VideoStatsRow icon={faPercent} text={roundedPercentage.toString()} />

        <ProgressBar percentage={likesToDislikesPercentage} />
      </div>
    </div>
  );
}