import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IVideo, IChannel, IPlaylist } from "shared/interfaces/youtube.interfaces";
import { getResourcesByIds, getVideoDetails, getChannelDetails, getPlaylistDetails } from "apis/youtube.api";
import { selectAllLikes } from "redux/like";
import { Loader } from "components/loader.component";
import { HomeGrid } from "components/home-grid.component";
import { MusicList } from "components/music-list.component";
import { HomeChannels } from "components/home-channels.component";

export const HomePage: FC = () => {
  const allLikes = useSelector(selectAllLikes);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [music, setMusic] = useState<IVideo[]>([]);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { channels, music, playlists, videos } = allLikes;

      if (videos.length > 0) {
        const fetchedVideos = await getResourcesByIds<IVideo>(videos, getVideoDetails);
        setVideos(fetchedVideos);
      }

      if (music.length > 0) {
        const fetchedMusic = await getResourcesByIds<IVideo>(music, getVideoDetails);
        setMusic(fetchedMusic.reverse()); // Display most recently-added at the top
      }

      if (channels.length > 0) {
        const fetchedChannels = await getResourcesByIds<IChannel>(channels, getChannelDetails);
        setChannels(fetchedChannels);
      }

      if (playlists.length > 0) {
        const fetchedPlaylists = await getResourcesByIds<IPlaylist>(playlists, getPlaylistDetails);
        setPlaylists(fetchedPlaylists);
      }

      setDataLoaded(true);
    }

    loadData();
  }, [allLikes]);

  if (!dataLoaded) return <Loader position="center-page" />

  return (
    <div className="o-page o-grid__container">
      <HomeGrid videos={videos} />
      <MusicList music={music} />
      <HomeChannels channels={channels} />
      <HomeGrid playlists={playlists} />
    </div>
  );
 };