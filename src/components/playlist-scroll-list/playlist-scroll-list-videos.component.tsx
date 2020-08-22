import React, { FC } from "react";

import { IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { useToggle } from "hooks/use-toggle.hook";
import { Loader } from "components/loader/loader.component";
import { PlaylistScrollListVideo } from "components/playlist-scroll-list/playlist-scroll-list-video.component";

interface IProps {
  isLoading: boolean;
  videosDetails: IScrollListVideos;
  watchingVideoIdx: number;
}
export const PlaylistScrollListVideos: FC<IProps> = ({
  isLoading,
  videosDetails,
  watchingVideoIdx,
}) => {
  const [hidingPreviousVideos, toggleHidingPreviousVideos] = useToggle(true);
  const { hasMoreVideos, loadMoreVideos, videos } = videosDetails;

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
      <button className="c-playlist-scroll-list__button" onClick={async () => await handleLoadMoreVideos()}>LOAD MORE</button>
    );
  }

  async function handleLoadMoreVideos() {
    loadMoreVideos && await loadMoreVideos();
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