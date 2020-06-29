import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { getVideosDetails } from "apis/youtube.api";
import { selectAllLikes } from "redux/like";
import { Loader } from "components/loader.component";
import { HomeGrid } from "components/home-grid.component";

export const HomePage: FC = () => {
  const allLikes = useSelector(selectAllLikes);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (allLikes.videos.length > 0) {
        const videos = await getVideosDetails(allLikes.videos);
        setVideos(videos);
      }

      setDataLoaded(true);
    }

    loadData();
  }, [allLikes]);

  if (!dataLoaded) return <Loader position="center-page" />

  return (
    <div className="o-page o-grid">
      <HomeGrid videos={videos} />
    </div>
  );
 };