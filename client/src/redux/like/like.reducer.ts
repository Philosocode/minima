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
    case LikeConstants.LIKE_RESOURCE:
      return {
        ...state,
        [action.collectionName]: [...state[action.collectionName], action.payload]
      };
    case LikeConstants.UNLIKE_RESOURCE:
      return {
        ...state,
        [action.collectionName]: state[action.collectionName].filter(resourceId => resourceId !== action.payload)
      };
    default:
      return state;
  }
};
