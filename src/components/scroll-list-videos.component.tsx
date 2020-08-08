import React, { FC } from "react";

import { IScrollListVideos } from "shared/interfaces/custom.interfaces";
import { useToggle } from "hooks/use-toggle.hook";
import { Loader } from "components/loader.component";
import { ScrollListVideo } from "components/scroll-list-video.component";

interface IProps {
  isLoading: boolean;
  videosDetails: IScrollListVideos;
  watchingVideoIdx: number;
}
export const ScrollListVideos: FC<IProps> = ({
  isLoading,
  watchingVideoIdx,
  videosDetails
}) => {
  const [hidingPreviousVideos, toggleHidingPreviousVideos] = useToggle(true);
  const { hasMoreVideos, loadMoreVideos, videos } = videosDetails;

  function getVideosToShow() {
    if (hidingPreviousVideos) return videos.slice(watchingVideoIdx);
    return videos;
  }

  async function handleLoadMoreVideos() {
    loadMoreVideos && await loadMoreVideos();
  }

  function renderLoadMoreVideosButton() {
    if (!hasMoreVideos) return;
    if (isLoading) return <Loader position="center-horizontal" />;

    return (
      <div className="c-playlist-scroll-list__toggle-previous" onClick={async () => await handleLoadMoreVideos()}>LOAD MORE</div>
    );
  }

  function renderShowPreviousVideosToggle() {
    if (watchingVideoIdx === 0) return;

    const toggleText = hidingPreviousVideos
      ? "Show Previous Videos"
      : "Hide Previous Videos";

    return (
      <div className="c-playlist-scroll-list__toggle-previous" onClick={toggleHidingPreviousVideos}>{toggleText}</div>
    );
  }

  function renderVideos() {
    return getVideosToShow().map((video, idx) => { 
      // If not hiding, start at 0
      // If hiding, start at watchingVideoIdx
      const currentVideoIdx = hidingPreviousVideos
        ? watchingVideoIdx + idx
        : idx;

      const isCurrentVideo = (watchingVideoIdx === currentVideoIdx);

      return (
        <ScrollListVideo
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
      { renderShowPreviousVideosToggle() }
      { renderVideos() }
      { renderLoadMoreVideosButton() }
    </div>
  );
};