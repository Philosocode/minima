import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserData, addLikeToDb, removeLikeFromDb } from "services/firebase.service";
import { IUserLikes, DbLikeType } from "shared/interfaces/firebase.interfaces";

export interface ILikeState {
  channels: string[];
  playlists: string[];
  music: string[];
  videos: string[];
  isLoading: boolean;
}

interface ILikeResourceData {
  collectionName: DbLikeType;
  resourceId: string;
  userId: string;
}

interface ILikeResourcePayload {
  collectionName: DbLikeType;
  resourceId: string;
}

// Thunks
export const fetchAllLikes = createAsyncThunk(
  "like/fetchAllLikes",
  async function (userId: string) {
    const response = await getUserData(userId);

    return response.likes;
  }
);

export const likeResource = createAsyncThunk(
  "like/likeResource",
  async function (data: ILikeResourceData, thunkAPI) {
    const { collectionName, resourceId, userId } = data;

    try {
      await addLikeToDb(collectionName, resourceId, userId);
      return { collectionName, resourceId };
    }
    catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

export const unlikeResource = createAsyncThunk(
  "like/unlikeResource",
  async function (data: ILikeResourceData, thunkAPI) {
    const { collectionName, resourceId, userId } = data;

    try {
      await removeLikeFromDb(collectionName, resourceId, userId);
      return { collectionName, resourceId };
    }
    catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
)

// Slice
const initialState: ILikeState = {
  channels: [],
  playlists: [],
  music: [],
  videos: [],
  isLoading: true,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllLikes.pending.type]: (state) => { state.isLoading = true; },
    [fetchAllLikes.fulfilled.type]: (state, action: PayloadAction<IUserLikes>) => {
      return { ...state, ...action.payload, isLoading: false };
    },
    [fetchAllLikes.rejected.type]: (state) => { state.isLoading = false; },
    [likeResource.fulfilled.type]: (state, action: PayloadAction<ILikeResourcePayload>) => {
      const { collectionName, resourceId } = action.payload;
      state[collectionName].push(resourceId);
    },
    [unlikeResource.fulfilled.type]: (state, action: PayloadAction<ILikeResourcePayload>) => {
      const { collectionName, resourceId } = action.payload;
      const resourceIdx = state[collectionName].findIndex(id => id === resourceId);
      state[collectionName].splice(resourceIdx, 1);
    }
  }
});

export const likeReducer = likeSlice.reducer;