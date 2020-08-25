import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { getVideoDetails } from "services/youtube.service";

export interface IVideoState {
  currentVideo?: IVideo;
  shouldLoop: boolean;
  isFetching: boolean;
  startSeconds?: number;
  endSeconds?: number;
}
const initialState: IVideoState = {
  currentVideo: undefined,
  shouldLoop: true,
  isFetching: false,
  startSeconds: undefined,
  endSeconds: undefined,
};

export const fetchVideo = createAsyncThunk(
  "video/fetchVideo",
  async function (videoId: string, thunkAPI) {
    try {
      return await getVideoDetails(videoId);
    }
    catch (err) {
      thunkAPI.rejectWithValue(err);
    }

  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
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
  extraReducers: {
    [fetchVideo.pending.type]: (state) => { state.isFetching = true },
    [fetchVideo.fulfilled.type]: (state, action: PayloadAction<IVideo>) => {
      state.currentVideo = action.payload;
      state.isFetching = false;
    },
    [fetchVideo.rejected.type]: (state) => { state.isFetching = false }
  }
});

export const videoReducer = videoSlice.reducer;
export const {
  setShouldLoop,
  setStartSeconds,
  setEndSeconds,
} = videoSlice.actions;
