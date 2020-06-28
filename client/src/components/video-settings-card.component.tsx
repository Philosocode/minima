import React, { FC } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faHeart, faMusic } from "@fortawesome/free-solid-svg-icons";

import { selectShouldLoop, setShouldLoop } from "redux/video";
import { selectLikedVideos, likeVideo, unlikeVideo } from "redux/like";

interface IProps {
  videoId: string; 
}
export const VideoSettingsCard: FC<IProps> = ({ videoId }) => {
  const shouldLoop = useSelector(selectShouldLoop);
  const likedVideos = useSelector(selectLikedVideos);
  const dispatch = useDispatch();

  function toggleLooping() {
    dispatch(setShouldLoop(!shouldLoop));
  }

  function toggleLike() {
    videoLiked
      ? dispatch(unlikeVideo(videoId))
      : dispatch(likeVideo(videoId));
  }

  const videoLiked = likedVideos.includes(videoId);

  const likeIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-active": videoLiked
  });

  const loopIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-active": shouldLoop
  });

  return (
    <div className="o-card c-video-settings__container">
      <div className={likeIconClasses} onClick={toggleLike}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faHeart} />
      </div>
      <div className={likeIconClasses} onClick={toggleLike}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faMusic} />
      </div>
      <div className={loopIconClasses} onClick={toggleLooping}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faRedo} />
      </div>
    </div>
  )
}