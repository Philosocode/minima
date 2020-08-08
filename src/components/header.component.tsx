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

  function renderContent() {
    if (!user) return (
      <Link to="/login" className="c-header__logo">minima</Link>
    );

    return (
      <>
        <Link to="/" className="c-header__logo">minima</Link>
        <SearchBar />
        <div onClick={handleLogout} className="c-header__link">Logout</div>
      </>
    );
  }

  return (
    <header className="c-header__container">
      <nav className="c-header__nav">
        { renderContent() } 
      </nav>
    </header>
  );
 }