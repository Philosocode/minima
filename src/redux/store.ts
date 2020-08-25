import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { actionTypes as rrfActionTypes } from 'react-redux-firebase'

import { rootReducer } from "./root-reducer";
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [
      // just ignore every redux-firebase and react-redux-firebase action type
      ...Object.keys(rrfActionTypes).map(
        type => `@@reactReduxFirebase/${type}`
      )
    ],
    ignoredPaths: ['firebase', 'firestore']
  },
}), thunk, sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware
});

sagaMiddleware.run(rootSaga);

export type TAppState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
