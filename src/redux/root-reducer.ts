import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import { preferenceReducer } from "./preference";
import { videoReducer } from "./video";
import { likeReducer } from "./like";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  like: likeReducer,
  preference: preferenceReducer,
  video: videoReducer,
  auth: authReducer,
  firebase: firebaseReducer
});

export type AppState = ReturnType<typeof rootReducer>;