import {
  PreferenceConstants,
  ISetSessionPlaybackSpeed
} from "./preference.types";

export const setSessionPlaybackSpeed = (speed: number): ISetSessionPlaybackSpeed => ({
  type: PreferenceConstants.SET_SESSION_PLAYBACK_SPEED,
  payload: speed
});