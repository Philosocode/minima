import { createSelector } from "reselect";

import { AppState } from "redux/root-reducer";

const selectPlaylist = (state: AppState) => state.playlist;

export const selectPlaylistId = createSelector(
  [selectPlaylist],
  (playlist) => playlist.id
);

export const selectIsFetching = createSelector(
  [selectPlaylist],
  (playlist) => playlist.isFetching
);

export const selectNextPageToken = createSelector(
  [selectPlaylist],
  (playlist) => playlist.nextPageToken
);

export const selectHasMoreVideos = createSelector(
  [selectPlaylist],
  (playlist) => playlist.hasMoreVideos
);

export const selectCurrentPlaylist = createSelector(
  [selectPlaylist],
  (playlist) => playlist.currentPlaylist
);

export const selectPlaylistVideos = createSelector(
  [selectPlaylist],
  (playlist) => playlist.videos
);