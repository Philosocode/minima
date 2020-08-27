import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

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
  scrollListLoaded: boolean;
  isShuffling: boolean;
  isShuffled: boolean;
}

const initialState: IPlaylistState = {
  id: "",
  currentPlaylist: undefined,
  videos: [],
  showingVideos: [],
  nextPageToken: "",
  hasMoreVideos: true,
  isFetching: false,
  scrollListLoaded: false,
  isShuffling: false,
  isShuffled: false,
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
    shuffleStart: (state) => { state.isShuffling = true; },
    shuffleSuccess: (state, action: PayloadAction<IScrollListVideo[]>) => {
      state.showingVideos = action.payload;
      state.isShuffled = true;
    },
    unshuffle: (state) => {
      state.showingVideos = state.videos; 
      state.isShuffled = false;
    },

    // Async Reducers
    fetchCurrentPlaylistStart: startFetching,
    fetchCurrentPlaylistSuccess: (state, action: PayloadAction<IPlaylist>) => {
      state.currentPlaylist = action.payload;
      state.isFetching = false;
    },
    fetchCurrentPlaylistFailure: stopFetching,
    fetchPlaylistVideosStart: startFetching,
    fetchPlaylistVideosSuccess: (state, action: PayloadAction<IScrollListVideo[]>) => {
      if (state.isShuffled) {
        const shuffledVideos = _.shuffle(action.payload);
        state.showingVideos.push(...shuffledVideos);
      }
      else {
        state.showingVideos.push(...action.payload);
      }
      
      if (!state.scrollListLoaded) {
        state.scrollListLoaded = true;
      }

      state.videos.push(...action.payload);
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
  shuffleStart,
  shuffleSuccess,
  unshuffle,
  fetchCurrentPlaylistStart, fetchCurrentPlaylistSuccess, fetchCurrentPlaylistFailure,
  fetchPlaylistVideosStart, fetchPlaylistVideosSuccess, fetchPlaylistVideosFailure
} = playlistSlice.actions;