import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Pages */
import { HomePage } from "pages/home.page";
import { ChannelPage } from "pages/channel.page";
import { MusicPage } from "pages/music.page";
import { NotFoundPage } from "pages/not-found.page";
import { PlaylistPage } from "pages/playlist.page";
import { SearchPage } from "pages/search.page";
import { VideoPage } from "pages/video.page";

/* Components */
import { Header } from "components/header.component";
import { Footer } from "components/footer.component";

/* Contexts */
import { getAllLikes } from "apis/firebase.api";
import { VideosProvider } from "contexts/videos.context";
import { SearchProvider } from "contexts/search.context";
import { Loader } from "components/loader.component";
import { loadAllLikes } from "redux/like";
import { LoginPage } from "pages/login.page";

export function App() {
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadInitialState() {
      const allLikes = await getAllLikes();
      dispatch(loadAllLikes(allLikes));

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
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/music" component={MusicPage} />
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
