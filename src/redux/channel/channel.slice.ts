import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { IChannel } from "shared/interfaces/youtube.interfaces";
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

interface IFetchChannelArgs {
  channelId: string;
  userName?: string;
}
export const fetchChannel = createAsyncThunk(
  "channel/fetchChannel",
  async function (data: IFetchChannelArgs, thunkAPI) {
    const { channelId, userName } = data;

    try {
      return await getChannelDetails(channelId, userName);
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
    clearChannel: () => initialState
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
  clearChannel
} = channelSlice.actions;
