import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { useHistory } from "react-router-dom";

import {
  getQueryParams,
  scrollToTop,
  getVideoQueryString,
} from "shared/helpers";
import { InputWithClear } from "components/input/input-with-clear.component";

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
    if (inferredSearchType === "c") return handleShortChannelRedirect();
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

  function handleShortChannelRedirect() {
    const match = searchInputText.match(channelShortExp);
    if (match) history.push(`/user/${match[1]}`);
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
    <InputWithClear
      onChange={handleChange}
      onClear={handleSearchClear}
      onKeyPress={handleSubmit}
      placeholder="Enter a YouTube video, channel, or playlist URL"
      containerClasses="c-search-bar"
      inputClasses="c-search-bar__input"
      value={searchInputText}
    />
  );
};
