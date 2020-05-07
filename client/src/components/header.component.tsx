import React, { FC } from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "components/search-bar.component";

export const Header: FC = () => (
  <header>
    <nav className="c-header__container">
      <Link to="/" className="c-header__logo">minima</Link>
      <SearchBar />
    </nav>
  </header>
)