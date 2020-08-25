import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IVideo } from "shared/interfaces/youtube.interfaces";

export interface IVideoState {
  currentVideo?: IVideo;
  shouldLoop: boolean;
  startSeconds?: number;
  endSeconds?: number;
}
const initialState: IVideoState = {
  currentVideo: undefined,
  shouldLoop: true,
  startSeconds: undefined,
  endSeconds: undefined,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setCurrentVideo(state, action: PayloadAction<IVideo>) {
      state.currentVideo = action.payload;
    },
    setShouldLoop(state, action: PayloadAction<boolean>) {
      state.shouldLoop = action.payload;
    },
    setStartSeconds(state, action: PayloadAction<number>) {
      state.startSeconds = action.payload;
    },
    setEndSeconds(state, action: PayloadAction<number>) {
      state.endSeconds = action.payload;
    },
  },
});

export const videoReducer = videoSlice.reducer;
export const {
  setCurrentVideo,
  setShouldLoop,
  setStartSeconds,
  setEndSeconds,
} = videoSlice.actions;
