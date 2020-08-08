import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import { PrivateRoute } from "components/private-route.component";
import { useAuth } from "hooks/use-auth.hook";

export function App() {
  const [dataFetched, setDataFetched] = useState(false);
  const history = useHistory();
  const user = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadInitialState() {
      const allLikes = await getAllLikes();
      dispatch(loadAllLikes(allLikes));

      setDataFetched(true);
    }

    loadInitialState();
  }, [dispatch, user, history]);

  function renderRoutes() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />  
        <PrivateRoute exact path="/music" component={MusicPage} />
        <PrivateRoute exact path="/search" component={SearchPage} />
        <PrivateRoute exact path="/channel/:channelId" component={(props: any) => <ChannelPage key={window.location.pathname} {...props} />} />
        <PrivateRoute exact path="/user/:userName" component={(props: any) => <ChannelPage key={window.location.pathname} {...props} />} />
        <PrivateRoute exact path="/playlist" component={PlaylistPage} />
        <PrivateRoute exact path="/watch" component={VideoPage} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    )
  }

  if (!dataFetched) return <Loader position="center-page" />;

  return (
    <VideosProvider>
      <SearchProvider>
        <div className="o-site__container">
          <Header />
            { renderRoutes() }
          <Footer />
        </div>
      </SearchProvider>
    </VideosProvider>
  );
}
