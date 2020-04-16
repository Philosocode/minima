import React, { FC, useContext, useEffect } from "react";
import axios from "axios";

import { getUrlAndParams } from "apis/youtube.api";
import { SearchContext } from "contexts/search.context";
import { VideosContext } from "contexts/videos.context";
import { VideoList } from "components/video-list.component";

export const SearchPage: FC = () => { 
  // State
  const { videos, setVideos } = useContext(VideosContext);
  const { searchText } = useContext(SearchContext);

  // Functions
  // Effect to fetch videos on mount
  useEffect(() => {
    const [url, params] = getUrlAndParams(searchText);

    axios.get(url, { params })
      .then(res => {
        setVideos && setVideos(res.data.items);
      })
      .catch(err => console.log("Error from search page:", err));
  }, [setVideos, searchText]);

  return (
      videos.length <= 0
        ? <div>Loading...</div>
        : <VideoList videos={videos} />
  );
};