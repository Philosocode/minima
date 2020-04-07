import React, { FC } from "react";

import { SearchBar } from "components/search-bar.component";

export const Header: FC = () => (
  <header>
    <nav className="c-header">
      <span>Minima</span>
      <SearchBar />
    </nav>
  </header>
)