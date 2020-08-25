import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faCalendarDay, faEye, faVideo } from "@fortawesome/free-solid-svg-icons";

import { addCommasToNumber, getFormattedDate } from "shared/helpers";
import { linkifyText } from "shared/jsx-helpers";

import { ChannelBox } from "components/channel/channel-box.component";
import { ChannelTabs } from "components/channel/channel-tabs.component";
import { ChannelTabPanel } from "components/channel/channel-tab-panel.component";
import { HTMLTextContainer } from "components/text/html-text-container.component";
import { Loader } from "components/loader/loader.component";
import { PlaylistsThumbnailGrid } from "components/thumbnail-grid/playlists-thumbnail-grid.component";
import { PlaylistVideosThumbnailGrid } from "components/thumbnail-grid/playlist-videos-thumbnail-grid.component";
import { StatsCard } from "components/card/stats-card.component";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannel, selectCurrentChannel, selectChannelIsFetching } from "redux/channel";

export type ChannelTab = "Videos" | "Playlists" | "About";
const channelTabs: ChannelTab[] = ["Videos", "Playlists", "About"];

export const ChannelPage: FC = () => {
  // State
  const currentChannel = useSelector(selectCurrentChannel);
  const isLoading = useSelector(selectChannelIsFetching);
  const [currentTab, setCurrentTab] = useState<ChannelTab>("Videos");
  const dispatch = useDispatch();

  const { channelId, userName } = useParams();
  
  // Functions
  useEffect(() => {
    if (!channelId) return;
    if (channelId === currentChannel?.id) return;

    dispatch(fetchChannel({ channelId, userName}));
    
  }, [currentChannel, channelId, userName, dispatch]);

  useEffect(() => {
    if (!currentChannel) return;

    document.title = currentChannel.snippet.title;
  }, [currentChannel]);

  function getStatsCardData() {
    if (!currentChannel) return;

    return [
      { icon: faCalendarDay, text: getFormattedDate(currentChannel.snippet.publishedAt, "MMM io, yyyy") },
      { icon: faVideo, text: addCommasToNumber(currentChannel.statistics.videoCount) },
      { icon: faEye, text: addCommasToNumber(currentChannel.statistics.viewCount) }
    ];
  }

  function renderAbout() {
    if (!currentChannel) return;
    return (
      <>
        <HTMLTextContainer textElement={linkifyText(currentChannel.snippet.description)} />
        <StatsCard statsCardData={getStatsCardData()} isShort />
      </>
    )
  }

  // Render
  if (!currentChannel || isLoading) return <Loader position="center-page" />;
  return (
    <div className="o-page o-grid">
      <div className="o-grid__item--center">
        <ChannelBox channelData={currentChannel} location="channel-page" />
        <ChannelTabs currentTab={currentTab} tabNames={channelTabs} setCurrentTab={setCurrentTab} />
        <ChannelTabPanel isVisible={currentTab === "About"}>
          { renderAbout() }
        </ChannelTabPanel>
      </div>

      <div className="o-grid__item--wide">
        <ChannelTabPanel isVisible={currentTab === "Videos"}>
          <PlaylistVideosThumbnailGrid playlistId={currentChannel.contentDetails.relatedPlaylists.uploads} />
        </ChannelTabPanel>

        <ChannelTabPanel isVisible={currentTab === "Playlists"}>
          <PlaylistsThumbnailGrid channelId={currentChannel.id} />
        </ChannelTabPanel>
      </div>
    </div>
  )
}
