import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { selectAllLikes } from "redux/like";
import { getResourcesByIds, getVideoDetails } from "apis/youtube.api";
import { Loader } from "components/loader.component";
import { objectIsEmpty } from "shared/helpers";
import { MusicChannelHeader } from "components/music-channel-header.component";

interface IProps {
  music?: IVideo[];
}

interface IMusicDict {
  [key: string]: IVideo[];
}

interface IExpandedChannels {
  [key: string]: boolean;
}

export const MusicPage: FC<IProps> = () => {
  const allLikes = useSelector(selectAllLikes);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [musicDict, setMusicDict] = useState<IMusicDict>({});
  const [matchedSongs, setMatchedSongs] = useState<IMusicDict>({});
  const [expandedChannels, setExpandedChannels] = useState<IExpandedChannels>({});

  useEffect(() => {
    async function loadData() {
      const { music: likedMusicIds } = allLikes;

      if (likedMusicIds.length > 0) {
        const fetchedMusic = await getResourcesByIds<IVideo>(likedMusicIds, getVideoDetails);
        generateMusicDict(fetchedMusic);
      }

      setDataLoaded(true);
    }

    function generateMusicDict(music: IVideo[]) {
      const dict: IMusicDict = {};

      music.forEach(song => {
        const { channelTitle } = song.snippet;

        if (!dict[channelTitle]) dict[channelTitle] = [];
        dict[channelTitle].push(song);
      });

      setMusicDict(dict);
      setMatchedSongs(dict);
    }

    loadData();
  }, [allLikes]);

  function handleFilterTextChange(ev: React.FormEvent<HTMLInputElement>) {
    const filterTerm = ev.currentTarget.value.toLowerCase();
    if (!filterTerm) setMatchedSongs(musicDict); // Show all songs if no filter

    updateMatchedSongsWithFilter(filterTerm);
  }

  function updateMatchedSongsWithFilter(filterTerm: string) {
    const matchedSongsDict: IMusicDict = {};

    // Loop through songs for each channel
    Object.keys(musicDict).forEach(channelTitle => {
      const matchedSongs = filterSongsByTerm(musicDict[channelTitle], filterTerm);

      if (matchedSongs.length > 0) matchedSongsDict[channelTitle] = matchedSongs;
    });

    setMatchedSongs(matchedSongsDict);
  }
  
  function filterSongsByTerm(songs: IVideo[], filterTerm: string) {
    return songs.filter(song => {
      const { channelTitle, title, description } = song.snippet;

      // Only include song if title or description includes `filterTerm`
      return channelTitle.toLowerCase().includes(filterTerm) ||
             title.toLowerCase().includes(filterTerm) || 
             description.toLowerCase().includes(filterTerm);
    });
  }

  function renderMusic() {
    if (objectIsEmpty(matchedSongs)) return (
      <h2 className="c-heading c-heading--subsubtitle c-heading--500">No songs found...</h2>
    );

    return Object.keys(matchedSongs).sort().map(channelTitle => {
      const songsForChannel = matchedSongs[channelTitle];
      const channelIsExpanded = expandedChannels[channelTitle] === true;

      return (
        <MusicChannelHeader
          channelTitle={channelTitle}
          songsForChannel={songsForChannel} 
          showingSongs={channelIsExpanded}
          toggleShowingSongs={toggleShowingSongs.bind(null, channelTitle)}
        />
      );
    });
  }

  function toggleShowingSongs(channelTitle: string) {
    const updatedValue = !expandedChannels[channelTitle];
    const updatedDict = Object.assign({}, expandedChannels, { [channelTitle]: updatedValue });

    setExpandedChannels(updatedDict);
  }

  if (!dataLoaded) return <Loader position="center-page" />

  return (
    <div className="o-page o-grid__container">
      <div className="o-grid__item--wide">
        <h1 className="c-heading c-heading--title">Music</h1>
        <div className="c-music-list__controls">
          <input
            type="search"
            className="c-music-list__search" 
            onChange={handleFilterTextChange}
          />
          <button className="c-music-list__show-all">Show All</button>
        </div>

        <ul className="c-music-list">
          { renderMusic() }
        </ul>
      </div>
    </div>
  );
}