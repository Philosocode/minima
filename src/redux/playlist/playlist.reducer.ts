import { 
  IPlaylistState, 
  TPlaylistAction, 
  EPlaylistConstants
} from "./playlist.types";

const initialState: IPlaylistState = {
  id: "",
  currentPlaylist: undefined,
  videos: [],
  showingVideos: [],
  nextPageToken: "",
  hasMoreVideos: true,
  isFetching: false,
}

export const playlistReducer = (state = initialState, action: TPlaylistAction): IPlaylistState => {
  switch (action.type) {
    case EPlaylistConstants.CLEAR_PLAYLIST:
      return initialState;
    case EPlaylistConstants.SET_PLAYLIST_ID:
      return {
        ...state,
        id: action.payload
      }
    case EPlaylistConstants.SET_HAS_MORE_VIDEOS:
      return {
        ...state,
        hasMoreVideos: action.payload
      }
    case EPlaylistConstants.SET_NEXT_PAGE_TOKEN:
      return {
        ...state,
        nextPageToken: action.payload
      }
    case EPlaylistConstants.FETCH_CURRENT_PLAYLIST_START:
      return {
        ...state,
        isFetching: true,
      }
    case EPlaylistConstants.FETCH_CURRENT_PLAYLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentPlaylist: action.payload
      }
    case EPlaylistConstants.FETCH_CURRENT_PLAYLIST_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    case EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_START:
      return {
        ...state,
        isFetching: false,
      }
    case EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        videos: [...state.videos, ...action.payload]
      }
    case EPlaylistConstants.FETCH_PLAYLIST_VIDEOS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state;
  }
};
