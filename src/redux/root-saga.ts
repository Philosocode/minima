import { all, call } from "redux-saga/effects";

import { playlistSagas } from "./playlist/playlist.sagas";
import { likeSagas } from "./like/like.sagas";

export function* rootSaga() {
  yield all(
    [
      call(playlistSagas),
      call(likeSagas),
    ],
  );
}
