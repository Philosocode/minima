import { combineReducers } from "redux";

import { videoReducer } from "./video";

export const rootReducer = combineReducers({
  videos: videoReducer
});

export type AppState = ReturnType<typeof rootReducer>;