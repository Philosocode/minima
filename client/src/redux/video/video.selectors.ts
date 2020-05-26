import { createSelector } from 'reselect';
import { AppState } from "redux/root-reducer";

const selectVideos = (state: AppState) => state.video;

export const selectCurrentVideo = createSelector(
  [selectVideos],
  video => video.currentVideo
);