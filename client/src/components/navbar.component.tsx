import React, { FC } from "react";

import { SearchBar } from "components/search-bar.component";

export const NavBar: FC = () => (
  <header>
    <nav className="c-navbar">
      <span>Minima</span>
      <SearchBar />
    </nav>
  </header>
)