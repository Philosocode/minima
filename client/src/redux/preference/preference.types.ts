export enum PreferenceConstants {
  SET_SESSION_PLAYBACK_SPEED = "SET_SESSION_LAYBACK_SPEED"
};

// TODO: https://stackoverflow.com/questions/47181789/limit-object-properties-to-keyof-interface
/* ACTIONS */
export interface ISetSessionPlaybackSpeed {
  type: PreferenceConstants.SET_SESSION_PLAYBACK_SPEED;
  payload: number;
}

export interface IPreferenceState {
  sessionPlaybackSpeed: number;
}

export type PreferenceAction =
  | ISetSessionPlaybackSpeed;