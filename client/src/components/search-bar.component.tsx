import React, { useContext, useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "contexts/search.context";

const _SearchBar: FC<RouteComponentProps> = ({ history }) => {
  // State
  // searchBarText: text local to the search bar
  // searchText: query text to use when searching YouTube
  const [ searchBarText, setSearchBarText ] = useState("");
  const { setSearchText } = useContext(SearchContext);

  let searchClasses = "c-search-bar__clear";
  if (searchBarText.length > 0) searchClasses += " c-search-bar__clear--show";

  // Functions
  function handleChange(ev: ChangeEvent<HTMLInputElement>) {    
    setSearchBarText(ev.target.value);
  }

  function handleSearchClear() {
    setSearchBarText("");
  }

  function handleSubmit(ev: KeyboardEvent<HTMLInputElement>) {
    if (ev.key !== "Enter") return;
    if (!searchBarText) return;
    if (!setSearchText) return;

    setSearchText(searchBarText);
    history.push(`/search?q=${searchBarText}`);
  } 

  return (
    <div className="c-search-bar__container">
      <input
        type="text"
        className="c-search-bar__input"
        value={searchBarText}
        onChange={handleChange}
        onKeyPress={handleSubmit}
      />
      <FontAwesomeIcon className={searchClasses} icon={faTimes} onClick={handleSearchClear} />
    </div>
  )
}

export const SearchBar = withRouter(_SearchBar);