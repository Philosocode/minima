import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { actionTypes as rrfActionTypes } from 'react-redux-firebase'
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { rootReducer } from "./root-reducer";
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [
      // just ignore every redux-firebase and react-redux-firebase action type
      ...Object.keys(rrfActionTypes).map(
        type => `@@reactReduxFirebase/${type}`
      ),
      "persist/PERSIST",
      "persist/REHYDRATE",
    ],
    ignoredPaths: ['firebase', 'firestore']
  },
}), sagaMiddleware];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["like"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type TAppState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
