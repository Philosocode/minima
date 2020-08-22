import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface IProps {
  isLiked: boolean;
  toggleIsLiked: () => void;
}
export const HeartIcon: FC<IProps> = ({ isLiked, toggleIsLiked }) => {
  const regularIconClasses = classNames({
    "c-like-icon__icon c-like-icon__icon--regular": true,
    "is-hidden": isLiked
  });

  const solidIconClasses = classNames({
    "c-like-icon__icon c-like-icon__icon--solid": true,
    "is-hidden": !isLiked
  });
  
  return (
    <div className="c-like-icon">
      <FontAwesomeIcon
        className={regularIconClasses}
        icon={["far", "heart"]} 
        onClick={toggleIsLiked}
      />
      <FontAwesomeIcon
        className={solidIconClasses}
        icon={["fas", "heart"]} 
        onClick={toggleIsLiked}
      />
    </div>
  )
}