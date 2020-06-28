import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { selectAllLikes } from "redux/like";
import { getVideoDetails } from "apis/youtube.api";

export const HomePage: FC = () => {
  const allLikes = useSelector(selectAllLikes);
  const [songs, setSongs] = useState<IVideo[]>([]);
  const [videos, setVideos] = useState<IVideo[]>([]);

  function renderVideos() {
    const videoIds = allLikes.videos;

    return (
      <div className="o-page">
        <h2 className="c-heading c-heading--huge">Videos</h2>
        <div>
        {
          videoIds.map(videoId => <Link to={`/watch?v=${videoId}`}>{videoId}</Link>)
        }
        </div>
      </div>
    )
  }

  function renderMusic() {
    const musicIds = allLikes.music;

    return (
      <div className="o-page">
        <h2 className="c-heading c-heading--huge">Videos</h2>
        <div>
        {
          musicIds.map(musicId => <Link to={`/watch?v=${musicId}`}>{musicId}</Link>)
        }
        </div>
      </div>
    )
  }

  return (
    <div className="o-page">
      { allLikes.videos && renderVideos() }
    </div>
  );
 };