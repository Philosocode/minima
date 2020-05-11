import React from "react";
import { Switch, Route } from "react-router-dom";

/* Pages */
import { HomePage } from "pages/home.page";
import { SearchPage } from "pages/search.page";
import { VideoPage } from "pages/video.page";
import { NotFoundPage } from "pages/not-found.page";

/* Components */
import { Header } from "components/header.component";
import { Footer } from "components/footer.component";
import { VideosProvider } from "contexts/videos.context";
import { SearchProvider } from "contexts/search.context";

export function App() {
  return (
    <VideosProvider>
      <SearchProvider>
        <div className="o-site-layout o-grid__container">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/watch/:videoId" component={VideoPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
      </SearchProvider>
    </VideosProvider>
  );
}
