import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { IChannel, IFetchChannelArgs } from "shared/interfaces/youtube.interfaces";
import { getChannelDetails } from "services/youtube.service";

export interface IChannelState {
  currentChannel?: IChannel;
  isFetching: boolean;
  error?: string;
}
const initialState: IChannelState = {
  currentChannel: undefined,
  isFetching: false,
  error: undefined
};

export const fetchChannel = createAsyncThunk(
  "channel/fetchChannel",
  async function (data: IFetchChannelArgs, thunkAPI) {
    try {
      return await getChannelDetails(data);
    }
    catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    clearChannel: () => initialState,
    setCurrentChannel: (state, action: PayloadAction<IChannel>) => {
      state.currentChannel = action.payload;
    },
  },
  extraReducers: {
    [fetchChannel.pending.type]: (state) => { state.isFetching = true; },
    [fetchChannel.fulfilled.type]: (state, action: PayloadAction<IChannel>) => {
      state.currentChannel = action.payload;
      state.isFetching = false;
    },
    [fetchChannel.rejected.type]: (state) => { state.isFetching = false; }
  }
});

export const channelReducer = channelSlice.reducer;

export const {
  clearChannel,
  setCurrentChannel,
} = channelSlice.actions;
