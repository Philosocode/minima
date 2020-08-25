import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "services/firebase.service";

export interface IAuthState {
  error: string;
}

const initialState: IAuthState = {
  error: ""
};

interface ILoginData {
  email: string;
  password: string;
  callback: Function;
}
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async function (data: ILoginData, thunkAPI) {
    const { callback, email, password } = data;

    try {
      await login(email, password);
      callback();
    }
    catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/loginUser",
  async function (_, thunkAPI) {
    try {
      await logout();
    }
    catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
)

function clearError(state: IAuthState) { state.error = ""; } 

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled.type]: clearError,
    [loginUser.rejected.type]: (state, error) => state.error = error,
    [logoutUser.fulfilled.type]: clearError
  }
});

export const authReducer = authSlice.reducer;