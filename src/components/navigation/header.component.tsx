import React, { FC } from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "components/search-bar.component";
import { logoutUser } from "redux/auth";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/use-auth.hook";

export const Header: FC = () => { 
  const user = useAuth();
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
 }