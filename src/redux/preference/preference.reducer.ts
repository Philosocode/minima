import { 
  IPreferenceState, 
  PreferenceAction, 
  PreferenceConstants
} from "./preference.types";

const initialState: IPreferenceState = {
  sessionPlaybackSpeed: 1
}

export const preferenceReducer = (state = initialState, action: PreferenceAction) => {
  switch (action.type) {
    case PreferenceConstants.SET_SESSION_PLAYBACK_SPEED:
      return {
        ...state,
        sessionPlaybackSpeed: action.payload
      };
    default:
      return state;
  }
};
