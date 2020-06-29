import { createSelector } from 'reselect';
import { AppState } from "redux/root-reducer";

const selectLike = (state: AppState) => state.like;

export const selectAllLikes = createSelector(
  [selectLike],
  like => like
);

export const selectLikedVideos = createSelector(
  [selectLike],
  like => like.videos
);

export const selectLikedMusic = createSelector(
  [selectLike],
  like => like.music
);