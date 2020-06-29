import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IVideo } from "shared/interfaces/youtube.interfaces";

interface IProps {
  music: IVideo[];
}
export const MusicList: FC<IProps> = ({ music }) => {
  if (music.length === 0) return null;

  return (
    <section className="c-music__section o-grid__item--full">
      <h2 className="c-heading c-heading--huge c-heading--block c-home__heading">Recently Listened</h2>
      <ul className="c-music__list">
        {
          music.slice(0, 10).map(video => (
            <li className="c-music__item" key={video.id}>
              <Link className="c-music__link" to={`/watch?v=${video.id}`}>
                <img className="c-music__thumbnail" src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                <div className="c-music__text">
                  <div className="c-music__title">{video.snippet.title}</div>
                  <div className="c-music__channel">{video.snippet.channelTitle}</div>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}