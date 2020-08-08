import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

const middlewares = (process.env.NODE_ENV !== "production") 
  ? [require("redux-immutable-state-invariant").default(), thunk] 
  : [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export type AppState = ReturnType<typeof rootReducer>;