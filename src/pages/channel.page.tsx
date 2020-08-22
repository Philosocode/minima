import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faCalendarDay, faEye, faVideo } from "@fortawesome/free-solid-svg-icons";

import { IChannel } from "shared/interfaces/youtube.interfaces";
import { getChannelDetails } from "services/youtube.service";
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

export type ChannelTab = "Videos" | "Playlists" | "About";
const channelTabs: ChannelTab[] = ["Videos", "Playlists", "About"];

export const ChannelPage: FC = () => {
  // State
  const [channelData, setChannelData] = useState<IChannel>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<ChannelTab>("Videos");

  const { channelId, userName } = useParams();
  
  // Functions
  useEffect(() => {
    fetchChannelData();

    async function fetchChannelData() {
      if (!channelId) return;
      setIsLoading(true);

      try {
        const channelRes = await getChannelDetails(channelId, userName);

        setChannelData(channelRes);
        
        document.title = channelRes.snippet.title;
      }
      catch (err) {
        alert("ERROR: couldn't load channel data.");
      }
      finally {
        setIsLoading(false);
      }
    }
  }, [channelId, userName]);

  function getStatsCardData() {
    if (!channelData) return;

    return [
      { icon: faCalendarDay, text: getFormattedDate(channelData.snippet.publishedAt, "MMM io, yyyy") },
      { icon: faVideo, text: addCommasToNumber(channelData.statistics.videoCount) },
      { icon: faEye, text: addCommasToNumber(channelData.statistics.viewCount) }
    ];
  }

  function renderAbout() {
    if (!channelData) return;
    return (
      <>
        <HTMLTextContainer textElement={linkifyText(channelData.snippet.description)} />
        <StatsCard statsCardData={getStatsCardData()} isShort />
      </>
    )
  }

  // Render
  if (!channelData || isLoading) return <Loader position="center-page" />;
  return (
    <div className="o-page o-grid">
      <div className="o-grid__item--center">
        <ChannelBox channelData={channelData} location="channel-page" />
        <ChannelTabs currentTab={currentTab} tabNames={channelTabs} setCurrentTab={setCurrentTab} />
        <ChannelTabPanel isVisible={currentTab === "About"}>
          { renderAbout() }
        </ChannelTabPanel>
      </div>

      <div className="o-grid__item--wide">
        <ChannelTabPanel isVisible={currentTab === "Videos"}>
          <PlaylistVideosThumbnailGrid playlistId={channelData.contentDetails.relatedPlaylists.uploads} />
        </ChannelTabPanel>

        <ChannelTabPanel isVisible={currentTab === "Playlists"}>
          <PlaylistsThumbnailGrid channelId={channelData.id} />
        </ChannelTabPanel>
      </div>
    </div>
  )
}
