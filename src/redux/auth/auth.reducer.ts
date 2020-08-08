import { 
  IAuthState, 
  AuthAction, 
  AuthConstants
} from "./auth.types";

const initialState: IAuthState = {
  error: ""
}

export const authReducer = (state = initialState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case AuthConstants.LOGIN:
      return {
        error: ""
      };
    case AuthConstants.LOGIN_ERROR:
      return {
        error: action.error
      }
    case AuthConstants.LOGOUT:
      return {
        error: ""
      };
    default:
      return state;
  }
};
