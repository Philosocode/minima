import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { Song } from "components/music/song.component";

interface IProps {
  music: IVideo[];
}
export const HomeMusic: FC<IProps> = ({ music }) => {
  if (music.length === 0) return null;

  return (
    <section className="o-grid__item--center">
      <h2 className="c-heading--spaced c-text--centered c-heading--subtitle c-music__heading">
        Recent Music
        <Link className="c-heading--link c-music__link" to="/music">View All</Link>
      </h2>
      <ul className="c-music__list">
        { music.slice(0, 10).map(song => <Song key={song.id} song={song} />) }
      </ul>
    </section>
  )
}