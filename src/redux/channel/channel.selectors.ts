import { createSelector } from "reselect";
import { TAppState } from "redux/store";

const selectChannel = (state: TAppState) => state.channel;

export const selectCurrentChannel = createSelector(
  [selectChannel],
  (channel) => channel.currentChannel
);

export const selectChannelIsFetching = createSelector(
  [selectChannel],
  (channel) => channel.isFetching
);

export const selectChannelError = createSelector(
  [selectChannel],
  (channel) => channel.error
);
