export enum AuthConstants {
  LOGIN = "LOGIN",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGOUT",
};

/* ACTIONS */
export interface ILogin {
  type: AuthConstants.LOGIN
};

export interface ILoginError {
  type: AuthConstants.LOGIN_ERROR
  error: string;
};

export interface ILogout {
  type: AuthConstants.LOGOUT
};

export interface IAuthState {
  error: string;
}

export type AuthAction =
  | ILogin
  | ILoginError
  | ILogout;