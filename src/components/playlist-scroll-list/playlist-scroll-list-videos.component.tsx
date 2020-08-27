import React, { FC } from "react";

import { useToggle } from "hooks/use-toggle.hook";
import { Loader } from "components/loader/loader.component";
import { PlaylistScrollListVideo } from "components/playlist-scroll-list/playlist-scroll-list-video.component";
import { useSelector, useDispatch } from "react-redux";
import { selectHasMoreVideos, selectShowingVideos, fetchPlaylistVideosStart } from "redux/playlist";

interface IProps {
  isLoading: boolean;
  watchingVideoIdx: number;
}
export const PlaylistScrollListVideos: FC<IProps> = ({
  isLoading,
  watchingVideoIdx,
}) => {
  const [hidingPreviousVideos, toggleHidingPreviousVideos] = useToggle(true);
  const hasMoreVideos = useSelector(selectHasMoreVideos);
  const videos = useSelector(selectShowingVideos);
  const dispatch = useDispatch();

  function getVideosToShow() {
    if (hidingPreviousVideos) return videos.slice(watchingVideoIdx);
    return videos;
  }

  function getShowPreviousVideosToggle() {
    if (watchingVideoIdx === 0) return;

    const toggleText = hidingPreviousVideos
      ? "Show Previous Videos"
      : "Hide Previous Videos";

    return (
      <button className="c-playlist-scroll-list__button" onClick={toggleHidingPreviousVideos}>{toggleText}</button>
    );
  }

  function getLoadMoreVideosButton() {
    if (!hasMoreVideos) return;
    if (isLoading) return <Loader position="center-horizontal" />;

    return (
      <button className="c-playlist-scroll-list__button" onClick={handleLoadMoreVideos}>LOAD MORE</button>
    );
  }

  async function handleLoadMoreVideos() {
    dispatch(fetchPlaylistVideosStart());
  }

  function getVideos() {
    return getVideosToShow().map((video, idx) => { 
      // If not hiding, start at 0
      // If hiding, start at watchingVideoIdx
      const currentVideoIdx = hidingPreviousVideos
        ? watchingVideoIdx + idx
        : idx;

      const isCurrentVideo = (watchingVideoIdx === currentVideoIdx);

      return (
        <PlaylistScrollListVideo
          key={video.videoId}
          idxInList={currentVideoIdx}
          isCurrentVideo={isCurrentVideo}
          videoDetails={video}
        />
      )
    })
  }

  return (
    <div className="c-playlist-scroll-list__videos">
      { getShowPreviousVideosToggle() }
      { getVideos() }
      { getLoadMoreVideosButton() }
    </div>
  );
};