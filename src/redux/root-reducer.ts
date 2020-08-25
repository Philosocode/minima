import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import { authReducer } from "./auth";
import { channelReducer } from "./channel";
import { likeReducer } from "./like";
import { playlistReducer } from "./playlist";
import { preferenceReducer } from "./preference";
import { videoReducer } from "./video";

export const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelReducer,
  firebase: firebaseReducer,
  like: likeReducer,
  playlist: playlistReducer,
  preference: preferenceReducer,
  video: videoReducer,
});