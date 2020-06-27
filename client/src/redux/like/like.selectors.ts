import { createSelector } from 'reselect';
import { AppState } from "redux/root-reducer";

const selectLike = (state: AppState) => state.like;

export const selectSessionPlaybackSpeed = createSelector(
  [selectLike],
  like => like.videos
);