import {
  VideoConstants,
  ISetCurrentVideoAction,
  ISetShouldLoopAction,
  ISetStartSecondsAction
} from "./video.types";

import { IVideo } from "shared/interfaces/youtube.interfaces";

export const setCurrentVideo = (video: IVideo): ISetCurrentVideoAction => ({
  type: VideoConstants.SET_CURRENT_VIDEO,
  payload: video
});

export const setShouldLoop = (shouldLoop: boolean): ISetShouldLoopAction => ({
  type: VideoConstants.SET_IS_LOOPING,
  payload: shouldLoop
});

export const setStartSeconds = (startSeconds: number): ISetStartSecondsAction => ({
  type: VideoConstants.SET_START_SECONDS,
  payload: startSeconds
});