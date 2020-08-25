import { createSelector } from 'reselect';
import { TAppState } from "redux/store";

const selectPreference = (state: TAppState) => state.preference;

export const selectSessionPlaybackSpeed = createSelector(
  [selectPreference],
  preference => preference.sessionPlaybackSpeed
);