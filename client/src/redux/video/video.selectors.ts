import { createSelector } from 'reselect';
import { AppState } from "redux/root-reducer";

const selectVideos = (state: AppState) => state.videos;

export const selectCurrentVideo = createSelector(
  [selectVideos],
  videos => videos.currentVideo
);