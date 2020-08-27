import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IScrollListHeader, ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  headerDetails: IScrollListHeader;
  watchingVideoIdx: number;
}

export const PlaylistScrollListHeader: FC<IProps> = ({ watchingVideoIdx, headerDetails }) => {
  const { channelId, channelTitle, playlistId, playlistTitle, totalVideos } = headerDetails;

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
  }

  function getChannelHeading() {
    if (!channelTitle || !channelId) return;

    return (
      <Link
        className="c-heading--small c-text--link c-playlist-scroll-list__creator"
        to={`/channel/${channelId}`}
      >{channelTitle}</Link>
    );
  }

  return (
    <div className="c-playlist-scroll-list__header">
      <div className="c-playlist-scroll-list__header-text">
        { getPlaylistHeading() }
        { getChannelHeading() }
        <h4 className="c-heading--small">{watchingVideoIdx} / {totalVideos - 1}</h4>

        <FontAwesomeIcon
          icon={faRandom}
          className="c-playlist-scroll-list__shuffle"
        />
      </div>
    </div>
  )
}