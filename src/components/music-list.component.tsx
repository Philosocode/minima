import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IVideo } from "shared/interfaces/youtube.interfaces";

interface IProps {
  music: IVideo[];
}
export const MusicList: FC<IProps> = ({ music }) => {
  if (music.length === 0) return null;

  return (
    <section className="o-grid__item--full">
      <h2 className="c-heading c-heading--subtitle">
        Recently Listened
        <Link className="c-music__view-all" to="/music">View All</Link>
      </h2>
      <ul className="c-music__list">
        {
          music.map(video => (
            <li className="c-music__item" key={video.id}>
              <Link className="c-music__link" to={`/watch?v=${video.id}`}>
                <img className="c-music__thumbnail" src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                <div className="c-music__text">
                  <h4 className="c-music__title">{video.snippet.title}</h4>
                  <h5 className="c-music__channel">{video.snippet.channelTitle}</h5>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}