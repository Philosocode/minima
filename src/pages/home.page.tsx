import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectLike } from "redux/like";
import { HomeGrid } from "components/home/home-grid.component";
import { HomeMusic } from "components/home/home-music.component";
import { ChannelGrid } from "components/channel/channel-grid.component";

export const HomePage: FC = () => {
  const allLikes = useSelector(selectLike);

  const channels = allLikes.channels.slice().reverse();
  const music = allLikes.music.slice().reverse();
  const playlists = allLikes.playlists.slice().reverse();
  const videos = allLikes.videos.slice().reverse();

  useEffect(() => {
    document.title = "minima - Home";
  }, []);

  return (
    <div className="o-page o-grid">
      <HomeMusic music={music} />
      <HomeGrid videos={videos} headingText="Videos" />
      <HomeGrid playlists={playlists} headingText="Playlists" />
      <ChannelGrid channels={channels} />
    </div>
  );
 };