import React, { FC, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faCalendarDay, faEye, faVideo } from "@fortawesome/free-solid-svg-icons";

import { addCommasToNumber, getFormattedDate, getQueryParams } from "shared/helpers";
import { linkifyText } from "shared/jsx-helpers";
import { fetchChannel, selectCurrentChannel, selectChannelIsFetching } from "redux/channel";

import { ChannelBox } from "components/channel/channel-box.component";
import { ChannelTabs } from "components/channel/channel-tabs.component";
import { ChannelTabPanel } from "components/channel/channel-tab-panel.component";
import { HTMLTextContainer } from "components/text/html-text-container.component";
import { Loader } from "components/loader/loader.component";
import { PlaylistsThumbnailGrid } from "components/thumbnail-grid/playlists-thumbnail-grid.component";
import { PlaylistVideosThumbnailGrid } from "components/thumbnail-grid/playlist-videos-thumbnail-grid.component";
import { StatsCard } from "components/card/stats-card.component";
import { IFetchChannelArgs } from "shared/interfaces/youtube.interfaces";

export type ChannelTab = "videos" | "playlists" | "about";
const channelTabs = ["videos", "playlists", "about"];

export const ChannelPage: FC = () => {
  // State
  const currentChannel = useSelector(selectCurrentChannel);
  const isLoading = useSelector(selectChannelIsFetching);
  const [currentTab, setCurrentTab] = useState<ChannelTab>("videos");
  const { channelId, userName } = useParams();

  const dispatch = useDispatch();
  const location = useLocation();

  // Functions
  useEffect(() => {
    // Fetch current channel based on the channelId / userName
    if (!channelId && !userName) return;

    // Don't fetch if channelId or userName === current channel displayed
    if (channelId && (channelId === currentChannel?.id)) return;
    if (userName && (userName === currentChannel?.snippet.customUrl)) return;

    let idData: IFetchChannelArgs;
    
    if (channelId) {
      idData = { id: channelId, idType: "channel" };
    } else if (userName) {
      idData = { id: userName, idType: "username" };
    } else {
      return alert("ERROR: Channel ID or user name is required on channel page.");
    }

    dispatch(fetchChannel(idData));
    
  }, [channelId, userName, dispatch]); // eslint-disable-line

  useEffect(() => {
    // Set the current tab whenever the `tab` query param changes
    const { query } = getQueryParams(location.search);
    const tabQuery = query["tab"];

    if (typeof tabQuery === "string") {
      if (tabQuery !== currentTab && channelTabs.includes(tabQuery)) {
        setCurrentTab(tabQuery as ChannelTab);
      }
    } else {
      setCurrentTab("videos");
    }
  }, [location.search]); // eslint-disable-line

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

  function getAbout() {
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
        <ChannelTabs currentTab={currentTab} tabNames={channelTabs as ChannelTab[]} />
        <ChannelTabPanel isVisible={currentTab === "about"}>
          { getAbout() }
        </ChannelTabPanel>
      </div>

      <div className="o-grid__item--wide">
        <ChannelTabPanel isVisible={currentTab === "videos"}>
          <PlaylistVideosThumbnailGrid
            playlistId={currentChannel.contentDetails.relatedPlaylists.uploads} 
          />
        </ChannelTabPanel>

        <ChannelTabPanel isVisible={currentTab === "playlists"}>
          <PlaylistsThumbnailGrid channelId={currentChannel.id} />
        </ChannelTabPanel>
      </div>
    </div>
  )
}
