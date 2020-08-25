import { createSelector } from "reselect";
import { TAppState } from "redux/store";

const selectVideos = (state: TAppState) => state.video;

export const selectCurrentVideo = createSelector(
  [selectVideos],
  (video) => video.currentVideo
);

export const selectCurrentVideoId = createSelector(
  [selectVideos],
  (video) => video.currentVideo?.id
);

export const selectShouldLoop = createSelector(
  [selectVideos],
  (video) => video.shouldLoop
);

export const selectStartSeconds = createSelector(
  [selectVideos],
  (video) => video.startSeconds
);

export const selectEndSeconds = createSelector(
  [selectVideos],
  (video) => video.endSeconds
);
