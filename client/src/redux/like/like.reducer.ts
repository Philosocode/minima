import { 
  ILikeState, 
  LikeAction, 
  LikeConstants
} from "./like.types";

const initialState: ILikeState = {
  videos: []
}

export const likeReducer = (state = initialState, action: LikeAction) => {
  switch (action.type) {
    case LikeConstants.LIKE_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.payload]
      };
    case LikeConstants.UNLIKE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter(videoId => videoId !== action.payload)
      };
    default:
      return state;
  }
};
