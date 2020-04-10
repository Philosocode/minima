import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { getUrlAndParams } from "apis/youtube.api";

export class SearchBar extends Component {
  state = {
    searchText: ""
  }

  handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: ev.target.value });
  }

  handleSearchClear = () => {
    this.setState({ searchText: "" });
  }

  handleSubmit = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== "Enter") return;
    if (!this.state.searchText) return;

    const [url, params] = getUrlAndParams(this.state.searchText);

    const res = axios.get(url, { params })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  } 

  render() {
    const {searchText} = this.state;
    let searchClasses = "c-search-bar__clear";
    if (searchText.length > 0) searchClasses += " c-search-bar__clear--show";

    return (
      <div className="c-search-bar__container">
        <input
          type="text"
          className="c-search-bar__input"
          value={searchText}
          onChange={this.handleChange}
          onKeyPress={this.handleSubmit}
        />
        <FontAwesomeIcon className={searchClasses} icon={faTimes} onClick={this.handleSearchClear} />
      </div>
    )
  }
 }