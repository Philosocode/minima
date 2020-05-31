import React, { FC } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { selectShouldLoop, setShouldLoop } from "redux/video";

export const VideoSettingsCard: FC = () => {
  const shouldLoop = useSelector(selectShouldLoop);
  const dispatch = useDispatch();

  function toggleLooping() {
    dispatch(setShouldLoop(!shouldLoop));
  }

  const iconContainerClass = classNames({
    "c-video-settings__icon-container": true,
    "is-active": shouldLoop
  });

  return (
    <div className="o-card c-video-settings__container">
      <div className={iconContainerClass} onClick={toggleLooping}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faRedo} />
      </div>
    </div>
  )
}