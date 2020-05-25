import { 
  IVideoState, 
  VideoAction, 
  VideoConstants
} from "./video.types";

const initialState: IVideoState = {
  currentVideo: undefined
}

export const videoReducer = (state = initialState, action: VideoAction) => {
  switch (action.type) {
    case VideoConstants.SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: action.payload
      };
    default:
      return state;
  }
};
