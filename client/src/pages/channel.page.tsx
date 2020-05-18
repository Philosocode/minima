import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { faCalendarDay, faEye, faVideo } from "@fortawesome/free-solid-svg-icons";

import { IChannel } from "shared/interfaces/youtube.interface";
import { getChannelDetails, getChannelPlaylists } from "apis/youtube.api";

import { Loader } from "components/loader.component";
import { ChannelBox } from "components/channel-box.component";
import { linkify, addCommasToNumber, getFormattedDate } from "shared/helpers";
import { StatsCard } from "components/stats-card.component";
import { ChannelTabs } from "components/channel-tabs.component";

interface IRouteParams {
  channelId: string;
}

const _ChannelPage: FC<RouteComponentProps<IRouteParams>> = ({ match }) => { 
  const [channelData, setChannelData] = useState<IChannel>();
  const [isLoading, setIsLoading] = useState(false);

  const channelId = match.params.channelId;

    // Functions
    useEffect(() => {
      async function fetchChannelData() {
        setIsLoading(true);
  
        try {
          const channelRes = await getChannelDetails(channelId);
          setChannelData(channelRes);

          console.log(channelRes);
  
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

  // Render
  if (!channelData) {
    return <Loader position="center-page" />;
  }
  return (
    <div className="o-page o-page--channel o-grid__container">
      <div className="o-grid__item--center">
        <ChannelBox channelData={channelData} location="channel-page" />

        <ChannelTabs />

        <div className="o-text-container c-channel__description">
          <p dangerouslySetInnerHTML={{ __html: linkify(channelData.snippet.description) }}></p>
        </div>

        <StatsCard statsCardData={getStatsCardData()} isShort />
      </div>
    </div>
  )
}

export const ChannelPage = withRouter(_ChannelPage);