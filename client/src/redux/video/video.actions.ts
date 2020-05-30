import {
  VideoConstants,
  ISetCurrentVideoAction,
  ISetIsLoopingAction,
  ISetStartSecondsAction
} from "./video.types";

import { IVideo } from "shared/interfaces/youtube.interface";

export const setCurrentVideo = (video: IVideo): ISetCurrentVideoAction => ({
  type: VideoConstants.SET_CURRENT_VIDEO,
  payload: video
});

export const setIsLooping = (isLooping: boolean): ISetIsLoopingAction => ({
  type: VideoConstants.SET_IS_LOOPING,
  payload: isLooping
});

export const setStartSeconds = (startSeconds: number): ISetStartSecondsAction => ({
  type: VideoConstants.SET_START_SECONDS,
  payload: startSeconds
});