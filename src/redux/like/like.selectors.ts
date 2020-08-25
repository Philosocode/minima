import { createSelector } from 'reselect';

import { TAppState } from "redux/store";

export const selectLike = (state: TAppState) => state.like;

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
