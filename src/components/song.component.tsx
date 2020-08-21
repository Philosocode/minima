import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IVideo } from "shared/interfaces/youtube.interfaces";

interface IProps {
  song: IVideo;
}
export const Song: FC<IProps> = ({ song }) => (
  <li className="c-song" key={song.id}>
    <Link className="c-song__link" to={`/watch?v=${song.id}`}>
      <img className="c-song__thumbnail" src={song.snippet.thumbnails.default.url} alt={song.snippet.title} />
      <div className="c-song__text">
        <h4 className="c-song__title">{song.snippet.title}</h4>
        <h5 className="c-heading--small c-song__channel">{song.snippet.channelTitle}</h5>
      </div>
    </Link>
  </li>
);
