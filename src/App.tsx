import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* Pages */
import { HomePage } from "pages/home.page";
import { ChannelPage } from "pages/channel.page";
import { MusicPage } from "pages/music.page";
import { NotFoundPage } from "pages/not-found.page";
import { PlaylistPage } from "pages/playlist.page";
import { VideoPage } from "pages/video.page";

/* Components */
import { Header } from "components/navigation/header.component";
import { Footer } from "components/navigation/footer.component";

/* Contexts */
import { getUserData } from "services/firebase.service";
import { Loader } from "components/loader/loader.component";
import { selectAuthLoaded } from "redux/auth";
import { loadAllLikes } from "redux/like";
import { LoginPage } from "pages/login.page";
import { PrivateRoute } from "components/navigation/private-route.component";
import { useAuth } from "hooks/use-auth.hook";

export function App() {
  const [dataFetched, setDataFetched] = useState(false);
  const userId = useAuth();
  const dispatch = useDispatch();
  const authLoaded = useSelector(selectAuthLoaded);

  useEffect(() => {
    if (!authLoaded) return;
    if (userId) loadInitialState();

    async function loadInitialState() {
      const userData = await getUserData(userId);      
      const allLikes = userData.likes;
      
      dispatch(loadAllLikes(allLikes));
      
      setDataFetched(true);
    }
  }, [authLoaded, dispatch, userId]);

  function renderRoutes() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />  
        <PrivateRoute exact path="/music" component={MusicPage} />
        <PrivateRoute exact path="/channel/:channelId" component={(props: any) => <ChannelPage key={window.location.pathname} {...props} />} />
        <PrivateRoute exact path="/user/:userName" component={(props: any) => <ChannelPage key={window.location.pathname} {...props} />} />
        <PrivateRoute exact path="/playlist" component={PlaylistPage} />
        <PrivateRoute exact path="/watch" component={VideoPage} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    )
  }

  if (!authLoaded || (userId && !dataFetched)) return <Loader position="center-page" />;

  return (
    <div className="o-site">
      <Header />
        { renderRoutes() }
      <Footer />
    </div>
  );
}
