import { IVideo } from "shared/interfaces/youtube.interface";

export enum VideoConstants {
  SET_CURRENT_VIDEO = "SET_CURRENT_VIDEO",
  SET_START_SECONDS = "SET_START_SECONDS",
  SET_END_SECONDS = "SET_END_SECONDS",
  SET_IS_LOOPING = "SET_IS_LOOPING"
}

export interface IVideoState {
  currentVideo?: IVideo;
  isLooping: boolean;
  startSeconds?: number;
  endSeconds?: number;
}

/* ACTIONS */
export interface ISetCurrentVideoAction {
  type: VideoConstants.SET_CURRENT_VIDEO;
  payload: IVideo;
}

export interface ISetIsLoopingAction {
  type: VideoConstants.SET_IS_LOOPING;
  payload: boolean;
}

export interface ISetStartSecondsAction {
  type: VideoConstants.SET_START_SECONDS;
  payload: number;
}

export type VideoAction =
  | ISetCurrentVideoAction
  | ISetIsLoopingAction
  | ISetStartSecondsAction;