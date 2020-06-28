import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

/* Pages */
import { HomePage } from "pages/home.page";
import { ChannelPage } from "pages/channel.page";
import { PlaylistPage } from "pages/playlist.page";
import { SearchPage } from "pages/search.page";
import { VideoPage } from "pages/video.page";
import { NotFoundPage } from "pages/not-found.page";

/* Components */
import { Header } from "components/header.component";
import { Footer } from "components/footer.component";

/* Contexts */
import { VideosProvider } from "contexts/videos.context";
import { SearchProvider } from "contexts/search.context";
import { getAllLikes } from "apis/firebase.api";
import { Loader } from "components/loader.component";
import { useDispatch } from "react-redux";
import { loadAllLikes } from "redux/like";

export function App() {
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadInitialState() {
      const allLikes = await getAllLikes();
      await dispatch(loadAllLikes(allLikes));

      setDataFetched(true);
    }

    loadInitialState();
  }, [dispatch]);

  if (!dataFetched) return <Loader position="center-page" />;

  return (
    <VideosProvider>
      <SearchProvider>
        <div className="o-site__container">
          <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/channel/:channelId" component={(props: any) => <ChannelPage key={window.location.pathname} {...props} />} />
              <Route exact path="/user/:userName" component={(props: any) => <ChannelPage key={window.location.pathname} {...props} />} />
              <Route exact path="/playlist" component={PlaylistPage} />
              <Route exact path="/watch" render={() => <VideoPage />} />
              <Route component={NotFoundPage} />
            </Switch>
          <Footer />
        </div>
      </SearchProvider>
    </VideosProvider>
  );
}
