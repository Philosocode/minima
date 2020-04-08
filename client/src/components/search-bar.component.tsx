import React, { FC, useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const SearchBar: FC = () => { 
  const [searchText, setSearchText] = useState("");

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.target.value);
  }

  const handleSearchClear = () => {
    setSearchText("");
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
      />
      <FontAwesomeIcon className={searchClasses} icon={faTimes} onClick={handleSearchClear} />
    </div>
  )
 }