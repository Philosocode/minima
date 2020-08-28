import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import { authReducer } from "./auth/auth.slice";
import { channelReducer } from "./channel/channel.slice";
import { likeReducer } from "./like/like.slice";
import { playlistReducer } from "./playlist/playlist.slice";
import { preferenceReducer } from "./preference/preference.slice";
import { videoReducer } from "./video/video.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelReducer,
  firebase: firebaseReducer,
  like: likeReducer,
  playlist: playlistReducer,
  preference: preferenceReducer,
  video: videoReducer,
});