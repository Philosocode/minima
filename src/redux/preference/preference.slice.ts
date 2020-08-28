import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPreferenceState {
  sessionPlaybackSpeed: number;
}
const initialState: IPreferenceState = {
  sessionPlaybackSpeed: 1, 
};

const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setSessionPlaybackSpeed(state, action: PayloadAction<number>) {
      state.sessionPlaybackSpeed = action.payload;
    },
    clearPreferences: () => initialState,
  },
});

export const preferenceReducer = preferenceSlice.reducer;
export const { clearPreferences, setSessionPlaybackSpeed } = preferenceSlice.actions;