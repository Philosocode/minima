import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { IScrollListHeader, ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { selectIsShuffled, shuffleStart, unshuffle } from "redux/playlist";

interface IProps {
  headerDetails: IScrollListHeader;
  watchingVideoIdx: number;
}

export const PlaylistScrollListHeader: FC<IProps> = ({ watchingVideoIdx, headerDetails }) => {
  const { channelId, channelTitle, playlistId, playlistTitle, totalVideos } = headerDetails;
  const isShuffled = useSelector(selectIsShuffled);
  const dispatch = useDispatch();

  useEffect(() => {}, [isShuffled]);

  function getPlaylistHeading() {
    const path = (playlistId === ECustomPlaylistTypes.MUSIC)
      ? "/music"
      : `/playlist?list=${playlistId}`;

    return (
      <Link
        className="c-heading c-text--link c-playlist-scroll-list__title"
        to={path}
      >{playlistTitle}</Link>
    );
  };

  function getChannelHeading() {
    if (!channelTitle || !channelId) return;

    return (
      <Link
        className="c-heading--small c-text--link c-playlist-scroll-list__creator"
        to={`/channel/${channelId}`}
      >{channelTitle}</Link>
    );
  }

  function handleShuffle() {
    isShuffled
      ? dispatch(unshuffle())
      : dispatch(shuffleStart());
  }

  const shuffleIconClasses = classNames({
    "c-playlist-scroll-list__shuffle": true,
    "is-selected": isShuffled
  });

  return (
    <div className="c-playlist-scroll-list__header">
      <div className="c-playlist-scroll-list__header-text">
        { getPlaylistHeading() }
        { getChannelHeading() }
        <h4 className="c-heading--small">{watchingVideoIdx} / {totalVideos - 1}</h4>

        <FontAwesomeIcon
          icon={faRandom}
          className={shuffleIconClasses}
          onClick={handleShuffle}
        />
      </div>
    </div>
  )
}