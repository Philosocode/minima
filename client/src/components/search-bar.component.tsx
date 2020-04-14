import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const SearchBar: FC = () => {
  // State
  const [searchText, setSearchText] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

    setShouldRedirect(true);
  } 

  return (
    <div className="c-search-bar__container">
      { shouldRedirect &&  <Redirect to={`/search?query=${searchText}`} /> }
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