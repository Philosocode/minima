import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { IChannel } from "shared/interfaces/youtube.interface";
import { getChannelDetails, getChannelPlaylists } from "apis/youtube.api";

import { Loader } from "components/loader.component";

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

          const playlistsForChannel = await getChannelPlaylists(channelId);
          console.log(playlistsForChannel);
          
  
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


  // Render
  if (!channelData) {
    return <Loader position="center-page" />;
  }
  return (
    <div className="o-site__page o-grid__container">
    </div>
  )
}

export const ChannelPage = withRouter(_ChannelPage);