import { 
  IVideoState, 
  VideoAction, 
  VideoConstants
} from "./video.types";

const initialState: IVideoState = {
  currentVideo: undefined,
  isLooping: false,
}

export const videoReducer = (state = initialState, action: VideoAction) => {
  switch (action.type) {
    case VideoConstants.SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: action.payload
      };
    case VideoConstants.SET_IS_LOOPING:
      return {
        ...state,
        isLooping: action.payload
      };
    case VideoConstants.SET_START_SECONDS:
      return {
        ...state,
        startSeconds: action.payload
      };
    default:
      return state;
  }
};
