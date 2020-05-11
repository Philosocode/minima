import React, { FC } from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "components/search-bar.component";

export const Header: FC = () => (
  <header className="o-grid__item--wide c-header__container">
    <nav className="c-header__nav">
      <Link to="/" className="c-header__logo">minima</Link>
      <SearchBar />
    </nav>
  </header>
)