import React, { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const SearchBar: FC = () => { 
  const [searchText, setSearchText] = useState("");

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    setSearchText(ev.target.value);
  }

  function handleSearchClear() {
    setSearchText("");
  }

  function handleSubmit(ev: KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "Enter") {
      handleSearchClear();
    }
  } 

  let searchClasses = "c-search-bar__clear";
  if (searchText.length > 0) searchClasses += " c-search-bar__clear--show";

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