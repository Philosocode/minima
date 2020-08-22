import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import {
  getQueryParams,
  scrollToTop,
  getVideoQueryString,
} from "shared/helpers";

type SearchType =
  | "video"
  | "channel"
  | "c"
  | "user"
  | "playlist"
  | "general"
  | "unknown";

export const SearchBar: FC = () => {
  // State
  const [searchInputText, setSearchInputText] = useState("");
  const history = useHistory();

  const searchClearClasses = classNames({
    "c-search-bar__clear": true,
    "is-showing": searchInputText.length > 0
  });

  // RegExps
  const channelPageExp = /\/channel\/(UC[0-9A-Za-z_-]{21}[AQgw])$/;
  const channelShortExp = /\/c\/(.*)/;
  const userPageExp = /\/user\/(.*)/;
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
    if (inferredSearchType === "video") return handleVideoRedirect();
    if (inferredSearchType === "channel") return handleChannelRedirect();
    if (inferredSearchType === "user") return handleUserRedirect();
    if (inferredSearchType === "playlist") return handlePlaylistRedirect();

    return handleSearchRedirect();
  }

  function getInferredSearchType(): SearchType {
    // Referenced: https://webapps.stackexchange.com/a/101153
    const queryParams = getQueryParams(searchInputText);

    if (queryParams.query["v"]) return "video";

    if (searchInputText.match(channelPageExp))  return "channel";
    if (searchInputText.match(channelShortExp)) return "c";
    if (searchInputText.match(userPageExp))     return "user";
    if (searchInputText.match(playlistPageExp)) return "playlist";

    return "unknown";
  }

  function handleVideoRedirect() {
    const queryParams = getQueryParams(searchInputText);
    const queryString = getVideoQueryString(queryParams.query);

    const url = `/watch${queryString}`;

    history.push(url);
  }

  function handleChannelRedirect() {
    const match = searchInputText.match(channelPageExp);
    if (match) history.push(`/channel/${match[1]}`);
  }

  function handleUserRedirect() {
    const match = searchInputText.match(userPageExp);
    if (match) history.push(`/user/${match[1]}`);
  }

  function handlePlaylistRedirect() {
    const queryParams = getQueryParams(searchInputText).query;

    if (typeof queryParams["list"] === "string") {
      history.push(`/playlist?list=${queryParams["list"]}`);
    }
  }

  function handleSearchRedirect() {
    history.push(`/results?search_query=${searchInputText}`);
  }

  return (
    <div className="c-search-bar">
      <input
        autoComplete="0"
        type="text"
        className="c-search-bar__input"
        placeholder="Enter a YouTube video, channel, or playlist URL"
        value={searchInputText}
        onChange={handleChange}
        onKeyPress={handleSubmit}
      />
      <FontAwesomeIcon
        className={searchClearClasses}
        icon={faTimes}
        onClick={handleSearchClear}
      />
    </div>
  );
};
