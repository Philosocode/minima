import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getQueryParams, scrollToTop, getVideoQueryString } from "shared/helpers";

type SearchType = "video" | "channel" | "playlist" | "general" | "unknown";

const _SearchBar: FC<RouteComponentProps> = ({ history }) => {
  // State
  const [ searchInputText, setSearchInputText ] = useState("");

  // RegExps
  const channelPageExp = /\/channel\/(UC[0-9A-Za-z_-]{21}[AQgw])$/;
  const playlistPageExp = /\/playlist\?list=(.*)/;

  // Functions
  function handleChange(ev: ChangeEvent<HTMLInputElement>) {    
    setSearchInputText(ev.target.value.trim());
  }

  function handleSearchClear() {
    setSearchInputText("");
  }

  function handleSubmit(ev: KeyboardEvent<HTMLInputElement>) {
    // Trigger on Enter key when 1+ characters have been entered
    if (ev.key !== "Enter") return;
    if (!searchInputText) return;

    scrollToTop();

    // Infer if it's a video, channel, or playlist page
    // If not, assume general search
    const inferredSearchType = getInferredSearchType();
    if (inferredSearchType === "video")     return handleVideoRedirect();
    if (inferredSearchType === "channel")   return handleChannelRedirect();
    if (inferredSearchType === "playlist")  return handlePlaylistRedirect();

    return handleSearchRedirect();
  }

  function getInferredSearchType(): SearchType {
    // Referenced: https://webapps.stackexchange.com/a/101153
    const queryParams = getQueryParams(searchInputText);
    
    if (queryParams.query["v"])                 return "video";
    if (searchInputText.match(channelPageExp))  return "channel";
    if (searchInputText.match(playlistPageExp)) return "playlist";
    
    return "unknown";
  }

  function handleVideoRedirect() {
    const queryParams = getQueryParams(searchInputText);
    const queryString = getVideoQueryString(queryParams.query);

    const url = `/watch${queryString}`

    history.push(url);
  }

  function handleChannelRedirect() {
    const match = searchInputText.match(channelPageExp);
    if (match) history.push(`/channel/${match[1]}`);
  }

  function handlePlaylistRedirect() {
    const queryParams = getQueryParams(searchInputText).query;

    if (typeof queryParams["list"] === "string") {
      history.push(`/playlist?list=${queryParams["list"]}`);
    }
  }
  function handleSearchRedirect() {
    history.push(`/results?search_query=${searchInputText}`)
  }

  function getSearchClearClasses() {
    let searchClasses = "c-search-bar__clear";
    if (searchInputText.length > 0) {
      searchClasses += " is-showing";
    }

    return searchClasses;
  }

  return (
    <div className="c-search-bar__container">
      <input
        autoComplete="0"
        type="text"
        className="c-search-bar__input"
        value={searchInputText}
        onChange={handleChange}
        onKeyPress={handleSubmit}
      />
      <FontAwesomeIcon className={getSearchClearClasses()} icon={faTimes} onClick={handleSearchClear} />
    </div>
  )
}

export const SearchBar = withRouter(_SearchBar);