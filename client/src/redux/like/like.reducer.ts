import { 
  ILikeState, 
  LikeAction, 
  LikeConstants
} from "./like.types";

const initialState: ILikeState = {
  channels: [],
  music: [],
  playlists: [],
  videos: [],
}

export const likeReducer = (state = initialState, action: LikeAction) => {
  switch (action.type) {
    case LikeConstants.LOAD_ALL_LIKES:
      return {
        ...state,
        ...action.payload
      };
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
