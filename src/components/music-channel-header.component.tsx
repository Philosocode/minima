import React, { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { Song } from "./song.component";

interface IProps {
  channelTitle: string;
  songsForChannel: IVideo[];
  showingSongs: boolean;
  toggleChannelExpanded: () => void;
}

export const MusicChannelHeader: FC<IProps> = ({ channelTitle, showingSongs, songsForChannel, toggleChannelExpanded }) => {  
  const arrowClasses = classNames({
    "c-music__arrow": true,
    "is-facing-up": showingSongs
  });

  const headerClasses = classNames({
    "c-music__channel-header": true,
    "is-showing": showingSongs
  });

  const innerListClasses = classNames({
    "c-music__dropdown": true,
    "is-showing": showingSongs
  });

  return (
    <li className={headerClasses} key={channelTitle}>
      <h2 onClick={toggleChannelExpanded} className="c-music__channel-title">
        {channelTitle}
        <FontAwesomeIcon className={arrowClasses} icon={faChevronDown} />
      </h2>
      <ul className={innerListClasses}>
        {
          songsForChannel.map(song => <Song key={song.id} song={song} />)
        }
      </ul>
    </li>
  )
}