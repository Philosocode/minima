import { createSelector } from 'reselect';
import { AppState } from "redux/root-reducer";

const selectLike = (state: AppState) => state.like;

export const selectLikedVideos = createSelector(
  [selectLike],
  like => like.videos
);