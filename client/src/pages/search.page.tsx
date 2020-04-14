import React, { FC, useContext, useEffect } from "react";
import axios from "axios";

import { getUrlAndParams } from "apis/youtube.api";
import { VideosContext } from "contexts/videos.context";

export const SearchPage: FC = () => { 
  // State
  const { setVideos } = useContext(VideosContext);
  
  // Functions
  useEffect(() => {
    const toSearch = getSearchQuery() as string;
    const [url, params] = getUrlAndParams(toSearch);

    axios.get(url, { params })
      .then(res => setVideos && setVideos(res.data.items))
      .catch(err => console.log("Error from search page:", err));
  }, [setVideos]);

  // FROM: https://stackoverflow.com/a/43220620
  function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get("query");
  }


  return (
    <div></div>
  );
};