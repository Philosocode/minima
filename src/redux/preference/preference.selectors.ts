import { createSelector } from 'reselect';
import { AppState } from "redux/root-reducer";

const selectPreference = (state: AppState) => state.preference;

export const selectSessionPlaybackSpeed = createSelector(
  [selectPreference],
  preference => preference.sessionPlaybackSpeed
);