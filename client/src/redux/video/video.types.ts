import { IVideo } from "shared/interfaces/youtube.interface";

export enum VideoConstants {
  SET_CURRENT_VIDEO = "SET_CURRENT_VIDEO"
}

// TODO: https://stackoverflow.com/questions/47181789/limit-object-properties-to-keyof-interface
/* ACTIONS */
export interface ISetCurrentVideoAction {
  type: VideoConstants.SET_CURRENT_VIDEO;
  payload: IVideo;
}

export interface IVideoState {
  currentVideo?: IVideo;
}

export type VideoAction =
  | ISetCurrentVideoAction;