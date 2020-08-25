import React, { FC } from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "components/search/search-bar.component";
import { logoutUser, selectUserId } from "redux/auth";
import { useDispatch, useSelector } from "react-redux";

export const Header: FC = () => {
  const user = useSelector(selectUserId);
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="c-header">
      <nav className="o-list o-list--horizontal c-header__nav">
        <Link to="/" className="c-header__logo">minima</Link>
        {
          // Render if logged in
          user && (
            <>
              <SearchBar />
              <div onClick={handleLogout} className="c-header__link">Logout</div>
            </>
          )
        }
      </nav>
    </header>
  );
};
