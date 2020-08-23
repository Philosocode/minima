import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import { preferenceReducer } from "./preference";
import { videoReducer } from "./video";
import { likeReducer } from "./like";
import { authReducer } from "./auth";
import { playlistReducer } from "./playlist";

export const rootReducer = combineReducers({
  like: likeReducer,
  playlist: playlistReducer,
  preference: preferenceReducer,
  video: videoReducer,
  auth: authReducer,
  firebase: firebaseReducer
});

export type AppState = ReturnType<typeof rootReducer>;
