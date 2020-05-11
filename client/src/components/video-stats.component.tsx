import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faEye, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import { IVideo } from "shared/interfaces/youtube.interface";
import { getFormattedDate, addCommasToNumber } from "shared/helpers";

interface IProps {
  videoData: IVideo;
}

export const VideoStats: FC<IProps> = ({ videoData }) => {
  const { publishedAt } = videoData.snippet; 
  const { likeCount, dislikeCount, viewCount } = videoData.statistics;

  // e.g. December 6th, 2019
  const formattedPublishDate = getFormattedDate(publishedAt, "PPP");
  
  return (
    <div className="c-video-stats__container">
      <div className="c-video-stats__content">

        <div className="c-video-stats__row">
          <div className="c-video-stats__icon">
            <FontAwesomeIcon icon={faCalendarDay} /> 
          </div>
          <div className="c-video-stats__text">{formattedPublishDate}</div>
        </div>

        <div className="c-video-stats__row">
          <div className="c-video-stats__icon">
            <FontAwesomeIcon className="c-video-stats__icon" icon={faEye} />
          </div>
          <div className="c-video-stats__text">{addCommasToNumber(viewCount)} views</div>
        </div>

        <div className="c-video-stats__row">
          <div className="c-video-stats__icon">
            <FontAwesomeIcon className="c-video-stats__icon" icon={faThumbsUp} /> 
          </div>
          <div className="c-video-stats__text">{addCommasToNumber(likeCount)}</div>
        </div>

        <div className="c-video-stats__row">
          <div className="c-video-stats__icon">
            <FontAwesomeIcon className="c-video-stats__icon" icon={faThumbsDown} /> 
          </div>
          <div className="c-video-stats__text">{addCommasToNumber(dislikeCount)}</div>
        </div>
      </div>
    </div>
  );
}