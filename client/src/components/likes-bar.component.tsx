import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import { getAbbreviatedNumber } from "shared/helpers";
import { ProgressBar } from "./progress-bar.component";

interface IProps {
  likes: number;
  dislikes: number;
}

export const LikesBar: FC<IProps> = ({ likes, dislikes }) => {
  const percentage = (likes / (likes + dislikes)) * 100;

  return (
    <div className="c-likes-bar__container">
      <div className="c-likes-bar__values">
        <div className="c-icon"><FontAwesomeIcon icon={faThumbsUp} /> { getAbbreviatedNumber(likes) }</div>
        <div className="c-icon"><FontAwesomeIcon icon={faThumbsDown} /> { getAbbreviatedNumber(dislikes) }</div>
      </div>
      <ProgressBar percentage={percentage} />
    </div>
  )
}