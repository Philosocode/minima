import { createSelector } from 'reselect';

import { TAppState } from "redux/store";

const selectAuth = (state: TAppState) => state.auth;
const selectFirebase = (state: TAppState) => state.firebase;

export const selectAuthError = createSelector(
  [selectAuth],
  auth => auth.error
);

export const selectAuthLoaded = createSelector(
  [selectFirebase],
  firebase => firebase.auth.isLoaded
);

export const selectUserId = createSelector(
  [selectFirebase],
  firebase => firebase.auth.uid
);