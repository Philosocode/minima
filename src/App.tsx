import React, { useEffect } from "react";
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
import { Loader } from "components/loader/loader.component";
import { selectAuthLoaded, selectUserId } from "redux/auth";
import { selectDoneInitialFetch, fetchAllLikesStart } from "redux/like";
import { LoginPage } from "pages/login.page";
import { PrivateRoute } from "components/navigation/private-route.component";

export function App() {
  const authLoaded = useSelector(selectAuthLoaded);
  const doneInitialFetch = useSelector(selectDoneInitialFetch);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);


  useEffect(() => {
    if (!authLoaded) return;
    if (userId && !doneInitialFetch) dispatch(fetchAllLikesStart());

  }, [authLoaded, doneInitialFetch, dispatch, userId]);

  if (!authLoaded || (userId && !doneInitialFetch)) return <Loader position="center-page" />;
  
  return (
    <div className="o-site">
      <Header />
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
      <Footer />
    </div>
  );
}
