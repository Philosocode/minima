import React from "react";
import { Switch, Route } from "react-router-dom";

/* Pages */
import { HomePage } from "pages/home.page";

/* Components */
import { NavBar } from "components/navbar.component";
import { Footer } from "components/footer.component";

export function App() {
  return (
    <div className="o-site-layout">
      <NavBar />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
}
