import React from "react";
import userEvent from "@testing-library/user-event";

import { render, screen } from "shared/test-utils";

import { SearchBar } from "./search-bar.component";

jest.mock("react-redux");
jest.mock("react-router-dom"), () => ({
  useHistory: () => ({
    push: jest.fn(),
  })
});

describe("<SearchBar />", () => {
  it("renders <SearchBar />", () => {
    render(<SearchBar />);
  });
});