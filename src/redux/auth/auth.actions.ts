import { Dispatch } from "redux";

import { AuthConstants } from "./auth.types";
import { login, logout } from "services/firebase.service";

export const loginUser = (
  email: string,
  password: string,
  callback: Function
) => async (dispatch: Dispatch) => {
  try {
    await login(email, password);
    dispatch({ type: AuthConstants.LOGIN });
    callback();
  }
  catch (err) {
    dispatch({ type: AuthConstants.LOGIN_ERROR, error: "Invalid username or password." });
  }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    await logout();
    dispatch({ type: AuthConstants.LOGOUT });
  }
  catch (err) {
    throw new Error(err);
  }
}