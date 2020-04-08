import React, { FC, useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const SearchBar: FC = () => { 
  const [searchText, setSearchText] = useState("");

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.target.value);
  }

  return (
    <div className="c-search-bar">
      <input
        type="text"
        className="c-search-bar__input"
        value={searchText}
        onChange={handleChange}
      />
      <FontAwesomeIcon icon={faTimes} className="c-search-bar__clear" />
    </div>
  )
 }