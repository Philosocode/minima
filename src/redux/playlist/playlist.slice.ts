import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { IScrollListVideo } from "shared/interfaces/custom.interfaces";

export interface IPlaylistState {
  id: string;
  currentPlaylist?: IPlaylist;
  videos: IScrollListVideo[];
  showingVideos: IScrollListVideo[];
  nextPageToken: string;
  hasMoreVideos: boolean;
  isFetching: boolean;
}

const initialState: IPlaylistState = {
  id: "",
  currentPlaylist: undefined,
  videos: [],
  showingVideos: [],
  nextPageToken: "",
  hasMoreVideos: true,
  isFetching: false,
}

function startFetching(state: IPlaylistState) { state.isFetching = true; }
function stopFetching(state: IPlaylistState) { state.isFetching = false; }

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    clearPlaylist: () => initialState,
    setPlaylistId: (state, action: PayloadAction<string>) => { state.id = action.payload },
    setNextPageToken: (state, action: PayloadAction<string>) => { state.nextPageToken = action.payload },
    setHasMoreVideos: (state, action: PayloadAction<boolean>) => { state.hasMoreVideos = action.payload },

    // Async Reducers
    fetchCurrentPlaylistStart: startFetching,
    fetchCurrentPlaylistSuccess: (state, action: PayloadAction<IPlaylist>) => {
      state.currentPlaylist = action.payload;
      state.isFetching = false;
    },
    fetchCurrentPlaylistFailure: stopFetching,
    fetchPlaylistVideosStart: startFetching,
    fetchPlaylistVideosSuccess: (state, action: PayloadAction<IScrollListVideo[]>) => {
      state.videos = action.payload;
      state.isFetching = false;
    },
    fetchPlaylistVideosFailure: stopFetching,
  }
});

export const playlistReducer = playlistSlice.reducer;

export const {
  clearPlaylist,
  setPlaylistId,
  setNextPageToken,
  setHasMoreVideos,
  fetchCurrentPlaylistStart, fetchCurrentPlaylistSuccess, fetchCurrentPlaylistFailure,
  fetchPlaylistVideosStart, fetchPlaylistVideosSuccess, fetchPlaylistVideosFailure
} = playlistSlice.actions;