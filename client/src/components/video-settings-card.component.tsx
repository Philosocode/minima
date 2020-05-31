import React, { FC } from "react";
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

  return (
    <div className="o-card c-video-settings__container">
      <div className="c-video-settings__icon-container" onClick={toggleLooping}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faRedo} />
      </div>
    </div>
  )
}