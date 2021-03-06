import { createSelector } from "reselect";

import { TAppState } from "redux/store";

const selectPlaylist = (state: TAppState) => state.playlist;

export const selectPlaylistId = createSelector(
  [selectPlaylist],
  (playlist) => playlist.id
);

export const selectIsFetching = createSelector(
  [selectPlaylist],
  (playlist) => playlist.isFetching
);

export const selectIsShuffled = createSelector(
  [selectPlaylist],
  (playlist) => playlist.isShuffled
);

export const selectScrollListLoaded = createSelector(
  [selectPlaylist],
  (playlist) => playlist.scrollListLoaded
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

export const selectShowingVideos = createSelector(
  [selectPlaylist],
  (playlist) => playlist.showingVideos
);