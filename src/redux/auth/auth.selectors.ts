import { createSelector } from 'reselect';

import { AppState } from "redux/root-reducer";

const selectAuth = (state: AppState) => state.auth;

export const selectAuthError = createSelector(
  [selectAuth],
  auth => auth.error
);