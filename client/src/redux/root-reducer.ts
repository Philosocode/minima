import { combineReducers } from "redux";

import { preferenceReducer } from "./preference";
import { videoReducer } from "./video";
import { likeReducer } from "./like";

export const rootReducer = combineReducers({
  like: likeReducer,
  preference: preferenceReducer,
  video: videoReducer
});

export type AppState = ReturnType<typeof rootReducer>;