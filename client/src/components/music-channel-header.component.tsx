import React, { FC } from "react";
import { IVideo } from "shared/interfaces/youtube.interfaces";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { useToggle } from "hooks/use-toggle.hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  channelTitle: string;
  songsForChannel: IVideo[];
}
export const MusicChannelHeader: FC<IProps> = ({ channelTitle, songsForChannel }) => {
  const [showingInnerList, toggleShowingInnerList] = useToggle(false);
  
  const arrowClasses = classNames({
    "c-music-list__arrow": true,
    "is-facing-up": showingInnerList
  });

  const headerClasses = classNames({
    "c-music-list__channel-header": true,
    "is-showing": showingInnerList
  });

  const innerListClasses = classNames({
    "c-music-list__inner-list": true,
    "is-showing": showingInnerList
  });

  return (
    <li className={headerClasses} key={channelTitle}>
      <h2 onClick={toggleShowingInnerList} className="c-heading c-music-list__channel-title">
        {channelTitle}
        <FontAwesomeIcon className={arrowClasses} icon={faChevronDown} />
      </h2>
      <ul className={innerListClasses}>
        {
          songsForChannel.map(song => (
          <li className="c-music__item" key={song.id}>
            <Link className="c-music__link" to={`/watch?v=${song.id}`}>
              <img className="c-music__thumbnail" src={song.snippet.thumbnails.default.url} alt={song.snippet.title} />
              <div className="c-music__text">
                <h4 className="c-music__title">{song.snippet.title}</h4>
                <h5 className="c-music__channel">{song.snippet.channelTitle}</h5>
              </div>
            </Link>
          </li>))
        }
      </ul>
    </li>
  )
}