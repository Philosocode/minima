import {
  VideoConstants,
  ISetCurrentVideoAction
} from "./video.types";

import { IVideo } from "shared/interfaces/youtube.interface";

export const setCurrentVideo = (video: IVideo): ISetCurrentVideoAction => ({
  type: VideoConstants.SET_CURRENT_VIDEO,
  payload: video
});