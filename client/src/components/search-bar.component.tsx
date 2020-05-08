import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type SearchType = "video" | "channel" | "playlist" | "general" | "unknown";

const _SearchBar: FC<RouteComponentProps> = ({ history }) => {
  // State
  const [ searchInputText, setSearchInputText ] = useState("");

  // Functions
  function handleChange(ev: ChangeEvent<HTMLInputElement>) {    
    setSearchInputText(ev.target.value);
  }

  function handleSearchClear() {
    setSearchInputText("");
  }

  function handleSubmit(ev: KeyboardEvent<HTMLInputElement>) {
    // Trigger on Enter key when 1+ characters have been entered
    if (ev.key !== "Enter") return;
    if (!searchInputText) return;

    const explicitSearchType = getExplicitSearchType();
    if (explicitSearchType !== "unknown") {
      return handleRedirect(explicitSearchType);
    }

    const inferredSearchType = getInferredSearchType();
    if (inferredSearchType !== "unknown") {
      return handleRedirect(inferredSearchType);
    }

    handleRedirect("general");
  }

  function getExplicitSearchType(): SearchType {
    // Expected Format: v[ideo]=__, p[laylist]=__, c[hannel]=__
    const splitSearch = searchInputText.split("=");
    const searchBy = splitSearch[0].toLowerCase();

    // e.g. `video=` with no id passed
    if (splitSearch.length <= 1) return "unknown";

    if (searchBy === "v" || searchBy === "video") return "video";
    if (searchBy === "p" || searchBy === "playlist") return "playlist";
    if (searchBy === "c" || searchBy === "channel") return "channel";
    if (searchBy === "g" || searchBy === "general") return "general";

    return "unknown";
  }

  function getInferredSearchType(): SearchType {
    // Referenced: https://webapps.stackexchange.com/a/101153
    if (searchInputText.match(/^[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]$/)) {
      return "video";
    }
    else if (searchInputText.match(/^UC[0-9A-Za-z_-]{21}[AQgw]$/)) {
      return "channel";
    }
    else if (searchInputText.match(/^UU[0-9A-Za-z_-]{21}[AQgw]$/)) {
      return "playlist";
    }
    else if (searchInputText.match(/^PL[0-9A-Za-z_-]{14}$/) || searchInputText.match(/^PL[0-9A-Za-z_-]{32}$/)) {
      return "playlist";
    }
    else {
      return "unknown";
    }
  }

  function handleRedirect(searchType: SearchType) {
    let baseUrl: string = searchType;

    if (searchType === "general") baseUrl = "search";
    else if (searchType === "video") baseUrl = "watch";

    history.push(`/${baseUrl}/${searchInputText}`);
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