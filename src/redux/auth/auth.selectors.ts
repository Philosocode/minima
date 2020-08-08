import { createSelector } from 'reselect';

import { AppState } from "redux/root-reducer";

const selectAuth = (state: AppState) => state.auth;
const selectFirebase = (state: AppState) => state.firebase;

export const selectAuthError = createSelector(
  [selectAuth],
  auth => auth.error
);

export const selectUserId = createSelector(
  [selectFirebase],
  firebase => firebase.auth.uid
);