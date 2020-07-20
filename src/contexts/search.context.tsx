import React, { Component, createContext } from "react";

/* Referenced: https://github.com/piotrwitek/react-redux-typescript-guide#themecontext */
// Create Context
interface ISearchContext {
  searchText: string;
  setSearchText?: (value: string) => void;
}
export const SearchContext = createContext<ISearchContext>({ searchText: "" });

// Create Provider
interface IState {
  searchText: string;
};
export class SearchProvider extends Component<{}, IState> {
  state = {
    searchText: ""
  }

  setSearchText = (value: string) => {
    this.setState({ searchText: value });
  }

  render() {
    const { searchText } = this.state;
    const { setSearchText } = this;

    return (
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}