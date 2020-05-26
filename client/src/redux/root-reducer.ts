import { combineReducers } from "redux";

import { preferenceReducer } from "./preference";
import { videoReducer } from "./video";

export const rootReducer = combineReducers({
  preference: preferenceReducer,
  video: videoReducer
});

export type AppState = ReturnType<typeof rootReducer>;