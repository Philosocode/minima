import React, { FC } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";

// import { useLike } from "hooks/use-like.hook";
import { selectShouldLoop, setShouldLoop } from "redux/video";
import { selectLikedVideos, selectLikedMusic } from "redux/like";
import { useLike } from "hooks/use-like.hook";
// import { selectLikedVideos, selectLikedMusic } from "redux/like";

interface IProps {
  videoId: string;
}
export const VideoSettingsCard: FC<IProps> = ({ videoId }) => {
  const shouldLoop = useSelector(selectShouldLoop);
  const [videoLiked, toggleVideoLiked] = useLike(
    "videos",
    videoId,
    selectLikedVideos
  );
  const [musicLiked, toggleMusicLiked] = useLike(
    "music",
    videoId,
    selectLikedMusic
  );
  const dispatch = useDispatch();

  function toggleLooping() {
    dispatch(setShouldLoop(!shouldLoop));
  }

  const likeVideoIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-selected": videoLiked,
  });

  const likeMusicIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-selected": musicLiked,
  });

  const loopIconClasses = classNames({
    "c-video-settings__icon-container": true,
    "is-selected": shouldLoop,
  });

  const iconClasses = "c-icon c-icon--large c-video-settings__icon";

  return (
    <div className="c-card c-video-settings">
      <div className={likeVideoIconClasses} onClick={toggleVideoLiked}>
        <FontAwesomeIcon className={iconClasses} icon={faFilm} />
      </div>
      <div className={likeMusicIconClasses} onClick={toggleMusicLiked}>
        <FontAwesomeIcon className={iconClasses} icon={faMusic} />
      </div>
      <div className={loopIconClasses} onClick={toggleLooping}>
        <FontAwesomeIcon className={iconClasses} icon={faRedo} />
      </div>
    </div>
  );
};
