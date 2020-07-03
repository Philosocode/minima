import React, { FC } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";

import { useLike } from "hooks/use-like.hook";
import { selectShouldLoop, setShouldLoop } from "redux/video";
import { selectLikedVideos, selectLikedMusic } from "redux/like";

interface IProps {
  videoId: string; 
}
export const VideoSettingsCard: FC<IProps> = ({ videoId }) => {
  const shouldLoop = useSelector(selectShouldLoop);
  const [videoLiked, toggleVideoLiked] = useLike("videos", videoId, selectLikedVideos);
  const [musicLiked, toggleMusicLiked] = useLike("music", videoId, selectLikedMusic);
  const dispatch = useDispatch();

  function toggleLooping() {
    dispatch(setShouldLoop(!shouldLoop));
  }

  const likeVideoIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-active": videoLiked
  });

  const likeMusicIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-active": musicLiked
  });

  const loopIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-active": shouldLoop
  });

  return (
    <div className="o-card c-video-settings__container">
      <div className={likeVideoIconClasses} onClick={toggleVideoLiked}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faFilm} />
      </div>
      <div className={likeMusicIconClasses} onClick={toggleMusicLiked}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faMusic} />
      </div>
      <div className={loopIconClasses} onClick={toggleLooping}>
        <FontAwesomeIcon className="c-video-settings__icon" icon={faRedo} />
      </div>
    </div>
  )
}