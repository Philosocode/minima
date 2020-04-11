import React, { useState, useContext, FC, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { getUrlAndParams } from "apis/youtube.api";
import { VideosContext } from "contexts/videos.context";

export const SearchBar: FC = () => {
  // State
  const [searchText, setSearchText] = useState("");
  const { setVideos } = useContext(VideosContext);
  let searchClasses = "c-search-bar__clear";
  if (searchText.length > 0) searchClasses += " c-search-bar__clear--show";

  // Functions
  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    setSearchText(ev.target.value);
  }

  function handleSearchClear() {
    setSearchText("");
  }

  function handleSubmit(ev: KeyboardEvent<HTMLInputElement>) {
    if (ev.key !== "Enter") return;
    if (!searchText) return;

    const [url, params] = getUrlAndParams(searchText);

    axios.get(url, { params })
      .then(res => setVideos && setVideos(res.data.items))
      .catch(err => console.log(err));
  } 

  return (
    <div className="c-search-bar__container">
      <input
        type="text"
        className="c-search-bar__input"
        value={searchText}
        onChange={handleChange}
        onKeyPress={handleSubmit}
      />
      <FontAwesomeIcon className={searchClasses} icon={faTimes} onClick={handleSearchClear} />
    </div>
  )
}