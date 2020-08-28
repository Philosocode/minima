import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DbLikeType } from "shared/interfaces/firebase.interfaces";
import { IVideo, IChannel, IPlaylist } from "shared/interfaces/youtube.interfaces";

export interface ILikeState {
  channels: IChannel[];
  playlists: IPlaylist[];
  music: IVideo[];
  videos: IVideo[];
  isLoading: boolean;
  doneInitialFetch: boolean;
}

export interface ILikeResourceStart {
  collectionName: DbLikeType;
}

export interface ILikeResourceSuccess {
  collectionName: DbLikeType;
  resource: IChannel | IPlaylist | IVideo;
}

export interface IFetchAllLikesPayload {
  channels?: IChannel[];
  music?: IVideo[];
  playlists?: IPlaylist[];
  videos?: IVideo[];
}

const initialState: ILikeState = {
  channels: [],
  playlists: [],
  music: [],
  videos: [],
  isLoading: false,
  doneInitialFetch: false,
};

function startLoading(state: ILikeState) { state.isLoading = true; }
function stopLoading(state: ILikeState) { state.isLoading = false; }

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    fetchAllLikesStart: startLoading,
    fetchAllLikesSuccess: (state, action: PayloadAction<IFetchAllLikesPayload>) => {
      const { channels, music, playlists, videos } = action.payload;

      if (channels) state.channels = channels;
      if (music) state.music = music;
      if (playlists) state.playlists = playlists;
      if (videos) state.videos = videos;

      state.isLoading = false;
      state.doneInitialFetch = true;
    },
    fetchAllLikesFailure: stopLoading,

    likeResourceStart: (state, action: PayloadAction<ILikeResourceStart>) => {
      state.isLoading = true;
    },
    likeResourceSuccess: (state, action: PayloadAction<ILikeResourceSuccess>) => {
      const { collectionName, resource } = action.payload;

      if (collectionName === "channels") {
        state["channels"].push(resource as IChannel);
      } else if (collectionName === "playlists") {
        state["playlists"].push(resource as IPlaylist);
      } else if (collectionName === "music") {
        state["music"].push(resource as IVideo)
      } else {
        state["videos"].push(resource as IVideo);
      }

      state.isLoading = false;
    },
    likeResourceFailure: stopLoading,

    unlikeResourceStart: (state, action: PayloadAction<ILikeResourceStart>) => {
      state.isLoading = true;
    },
    unlikeResourceSuccess: (state, action: PayloadAction<ILikeResourceSuccess>) => {
      const { collectionName, resource } = action.payload;
      const resourceId = resource.id;
      const collection = (state[collectionName] as any[]);

      const resourceIdx = collection.findIndex(item => item.id === resourceId);

      state[collectionName].splice(resourceIdx, 1);
      state.isLoading = false;
    },
    unlikeResourceFailure: stopLoading,
    clearLikes: () => initialState,
  },
});

export const likeReducer = likeSlice.reducer;

export const {
  fetchAllLikesStart, fetchAllLikesSuccess, fetchAllLikesFailure,
  likeResourceStart, likeResourceSuccess, likeResourceFailure,
  unlikeResourceStart, unlikeResourceSuccess, unlikeResourceFailure,
  clearLikes
} = likeSlice.actions;
