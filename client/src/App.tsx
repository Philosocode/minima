import React from "react";
import { Switch, Route } from "react-router-dom";

/* Pages */
import { HomePage } from "pages/home.page";
import { SearchPage } from "pages/search.page";
import { VideoPage } from "pages/video.page";

/* Components */
import { Header } from "components/header.component";
import { Footer } from "components/footer.component";
import { VideosProvider } from "contexts/videos.context";
import { SearchProvider } from "contexts/search.context";

export function App() {
  return (
    <VideosProvider>
      <SearchProvider>
        <div className="o-site-layout">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/watch?v=:videoId" component={VideoPage} />
          </Switch>
          <Footer />
        </div>
      </SearchProvider>
    </VideosProvider>
  );
}
