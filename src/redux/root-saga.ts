import { all, call } from "redux-saga/effects";

import { playlistSagas } from "./playlist/playlist.sagas";

export function* rootSaga() {
  yield all([call(playlistSagas)]);
}
