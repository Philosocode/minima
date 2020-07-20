import { createSelector } from 'reselect';
import { AppState } from "redux/root-reducer";

const selectLike = (state: AppState) => state.like;

export const selectAllLikes = createSelector(
  [selectLike],
  like => like
);

export const selectLikedChannels = createSelector(
  [selectLike],
  like => like.channels
);

export const selectLikedMusic = createSelector(
  [selectLike],
  like => like.music
);

export const selectLikedPlaylists = createSelector(
  [selectLike],
  like => like.playlists
);

export const selectLikedVideos = createSelector(
  [selectLike],
  like => like.videos
);
