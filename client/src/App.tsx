import React from "react";
import { Switch, Route } from "react-router-dom";

/* Pages */
import { HomePage } from "pages/home.page";

/* Components */
import { Header } from "components/header.component";
import { Footer } from "components/footer.component";
import { VideosProvider } from "contexts/videos.context";

export function App() {
  return (
    <VideosProvider>
      <div className="o-site-layout">
        <Header />
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
        <Footer />
      </div>
    </VideosProvider>
  );
}
