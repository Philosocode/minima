import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { getVideosDetails } from "apis/youtube.api";
import { selectAllLikes } from "redux/like";
import { Loader } from "components/loader.component";
import { HomeVideos } from "components/home-videos.component";
import { MusicList } from "components/music-list.component";

export const HomePage: FC = () => {
  const allLikes = useSelector(selectAllLikes);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [music, setMusic] = useState<IVideo[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (allLikes.videos.length > 0) {
        const videos = await getVideosDetails(allLikes.videos);
        setVideos(videos);
      }

      if (allLikes.music.length > 0) {
        const music = await getVideosDetails(allLikes.music);

        // Display most recently-added at the top
        setMusic(music.reverse());
      }

      setDataLoaded(true);
    }

    loadData();
  }, [allLikes]);

  if (!dataLoaded) return <Loader position="center-page" />

  return (
    <div className="o-page o-grid__container">
      <HomeVideos videos={videos} />
      <MusicList music={music} />
    </div>
  );
 };