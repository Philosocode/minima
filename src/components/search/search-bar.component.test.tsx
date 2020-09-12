import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import { SearchBar } from "./search-bar.component";
import { Router } from "react-router-dom";

jest.mock("react-redux");
jest.mock("react-router-dom"), () => ({
  useHistory: () => ({
    push: jest.fn(),
  })
});

describe("<SearchBar />", () => {
  it("redirects to the correct page", async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    // Deal with window.scrollTo: https://qiita.com/akameco/items/0edfdae02507204b24c8
    const noop = () => {};
    Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

    render(
      <Router history={history}>
        <SearchBar />
      </Router>
    );

    const searchInput = screen.getByRole(/search/i);

    const testData = [
      {
        inputText: "https://www.youtube.com/watch?v=SF_Xl5TOGlY&list=PLblA84xge2_xNtaFnZhefjFbnDrpySKD3",
        expectedPath: "/watch?"
      },
      {
        inputText: "https://www.youtube.com/channel/UChiKrz8bXsB3inE1YrXs8zg",
        expectedPath: "/channel/"
      },
      {
        inputText: "https://www.youtube.com/user/professorleonard57",
        expectedPath: "/user/"
      },
      {
        inputText: "https://www.youtube.com/playlist?list=PLDesaqWTN6ESsmwELdrzhcGiRhk5DjwLP",
        expectedPath: "/playlist?list="
      },
      {
        inputText: "random search terms",
        expectedPath: "/results?search_query="
      },
    ];

    testData.forEach(data => {
      userEvent.type(searchInput, `${data.inputText}{enter}`);
      expect(history.push).toHaveBeenCalledWith(expect.stringContaining(data.expectedPath));
      userEvent.clear(searchInput);
    });
  });
});