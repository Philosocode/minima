import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { faCalendarDay, faEye, faVideo } from "@fortawesome/free-solid-svg-icons";

import { IChannel, IPlaylistItem, IPlaylist } from "shared/interfaces/youtube.interface";
import { getChannelDetails, getVideosForPlaylist, getChannelPlaylists } from "apis/youtube.api";

import { Loader } from "components/loader.component";
import { ChannelBox } from "components/channel-box.component";
import { linkify, addCommasToNumber, getFormattedDate } from "shared/helpers";
import { StatsCard } from "components/stats-card.component";
import { ChannelTabs } from "components/channel-tabs.component";
import { ChannelUploads } from "components/channel-uploads.component";
import { ChannelPlaylists } from "components/channel-playlists.component";

interface IRouteParams {
  channelId: string;
}

export type ChannelTab = "Videos" | "Playlists" | "About";
const channelTabs: ChannelTab[] = ["Videos", "Playlists", "About"];

const _ChannelPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => {
  // State
  const [channelData, setChannelData] = useState<IChannel>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<ChannelTab>("About");

  const [uploads, setUploads] = useState<IPlaylistItem[]>([]);
  const [uploadsPageToken, setUploadsPageToken] = useState<string>();
  const [hasMoreUploads, setHasMoreUploads] = useState(true);

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [playlistsPageToken, setPlaylistsPageToken] = useState<string>();
  const [hasMorePlaylists, setHasMorePlaylists] = useState(true);

  const channelId = match.params.channelId;
  
  // Functions
  useEffect(() => {
    async function fetchChannelData() {
      setIsLoading(true);

      try {
        const channelRes = await getChannelDetails(channelId);
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
    
    fetchChannelData();
  }, [channelId]);

  function getStatsCardData() {
    if (!channelData) return;

    return [
      { icon: faCalendarDay, text: getFormattedDate(channelData.snippet.publishedAt, "MMM io, yyyy") },
      { icon: faVideo, text: addCommasToNumber(channelData.statistics.videoCount) },
      { icon: faEye, text: addCommasToNumber(channelData.statistics.viewCount) }
    ];
  }

  async function loadUploads() {
    if (!channelData || !hasMoreUploads) return;
    
    const uploadsPlaylistId = channelData.contentDetails.relatedPlaylists.uploads;

    setIsLoading(true);
    try {
      const res = await getVideosForPlaylist(uploadsPlaylistId, uploadsPageToken);
      
      if (res.nextPageToken) {
        setUploadsPageToken(res.nextPageToken);
      }
      else {
        setHasMoreUploads(false);
      }

      const updatedVideos = uploads.concat(res.items);
      setUploads(updatedVideos);
    }
    catch(err) {
      alert("ERROR: Failed to load videos.");
    }
    finally {
      setIsLoading(false);
    }
  }

  async function loadPlaylists() {
    if (!channelData || !hasMorePlaylists) return;

    setIsLoading(true);
    try {
      const res = await getChannelPlaylists(channelId, playlistsPageToken);

      console.log("PLAYLIST RES");
      console.log(res);
      
      if (res.nextPageToken) {
        setPlaylistsPageToken(res.nextPageToken);
      }
      else {
        setHasMorePlaylists(false);
      }

      const updatedPlaylists = playlists.concat(res.items);
      setPlaylists(updatedPlaylists);
    }
    catch(err) {
      alert("ERROR: Failed to load videos.");
    }
    finally {
      setIsLoading(false);
    }
  }

  function renderAbout() {
    if (!channelData) return;
    return (
      <>
        <div className="o-text-container c-channel__description">
          <p dangerouslySetInnerHTML={{ __html: linkify(channelData.snippet.description) }}></p>
        </div>

        <StatsCard statsCardData={getStatsCardData()} isShort />
      </>
    )
  }

  // Render
  if (!channelData) {
    return <Loader position="center-page" />;
  }
  return (
    <div className="o-page o-page--channel o-grid__container">
      <div className="o-grid__item--center">
        <ChannelBox channelData={channelData} location="channel-page" />
        <ChannelTabs currentTab={currentTab} tabNames={channelTabs} setCurrentTab={setCurrentTab} />
        {
          currentTab === "Videos" && <ChannelUploads uploads={uploads} loadUploads={loadUploads} hasMoreUploads={hasMoreUploads} isLoading={isLoading} />
        }
        {
          currentTab === "Playlists" && <ChannelPlaylists playlists={playlists} loadPlaylists={loadPlaylists} hasMorePlaylists={hasMorePlaylists} isLoading={isLoading} />
        }
        {
          currentTab === "About" && renderAbout()
        }
      </div>
    </div>
  )
}

export const ChannelPage = withRouter(_ChannelPage);