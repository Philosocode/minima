import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

import { IVideo } from "shared/interfaces/youtube.interfaces";
import { objectIsEmpty } from "shared/helpers";
import { getResourcesByIds, getVideoDetails } from "services/youtube.service";
import { selectLike } from "redux/like";

import { Loader } from "components/loader/loader.component";
import { MusicChannelHeader } from "components/music/music-channel-header.component";
import { InputWithClear } from "components/input/input-with-clear.component";

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
  const allLikes = useSelector(selectLike);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [musicDict, setMusicDict] = useState<IMusicDict>({});
  const [matchedSongs, setMatchedSongs] = useState<IMusicDict>({});
  const [expandedChannels, setExpandedChannels] = useState<IExpandedChannels>({});
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    loadData();
    
    async function loadData() {
      // Get liked songs from the DB
      const { music: likedMusicIds } = allLikes;

      if (likedMusicIds.length > 0) {
        const fetchedMusic = await getResourcesByIds<IVideo>(likedMusicIds, getVideoDetails);
        generateMusicDict(fetchedMusic);
      }

      setDataLoaded(true);
    }

    function generateMusicDict(music: IVideo[]) {
      // musicDict will contain all liked songs
      // matchedSongs will contain liked songs that match filter text
      const dict: IMusicDict = {};

      music.forEach(song => {
        const { channelTitle } = song.snippet;

        if (!dict[channelTitle]) dict[channelTitle] = [];
        dict[channelTitle].push(song);
      });

      setMusicDict(dict);
      setMatchedSongs(dict);
    }
  }, [allLikes]);

  useEffect(() => {
    if (!filterText) setMatchedSongs(musicDict); // Show all songs if no filter

    updateMatchedSongsWithFilter(filterText.toLowerCase());
  }, [filterText]); // eslint-disable-line

  function handleFilterTextChange(ev: React.FormEvent<HTMLInputElement>) {
    setFilterText(ev.currentTarget.value);
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
    // Only include song if channel name, song title, or description includes `filterTerm`

    return songs.filter(song => {
      const { channelTitle, title, description } = song.snippet;
      return channelTitle.toLowerCase().includes(filterTerm) ||
             title.toLowerCase().includes(filterTerm) || 
             description.toLowerCase().includes(filterTerm);
    });
  }

  function getMusic() {
    // Render all the channel headers sorted by channel name
    return Object.keys(matchedSongs).sort().map(channelTitle => {
      const songsForChannel = matchedSongs[channelTitle];
      const channelIsExpanded = expandedChannels[channelTitle] === true;

      return (
        <MusicChannelHeader
          key={channelTitle}
          channelTitle={channelTitle}
          songsForChannel={songsForChannel} 
          showingSongs={channelIsExpanded}
          toggleChannelExpanded={toggleChannelExpanded.bind(null, channelTitle)}
        />
      );
    });
  }

  function toggleAllExpandedChannels() {
    // If all channels are expanded, minimize them all
    // If there's a minimized channel, then expand them all
    const shouldExpand = !allChannelsExpanded();
    toggleAllChannels(shouldExpand);
  }

  function allChannelsExpanded() {
    // Check if all channels are expanded
    const channelTitles = Object.keys(matchedSongs);

    for (let idx = 0; idx < channelTitles.length; idx++) {
      const channelTitle = channelTitles[idx];
      if (!expandedChannels[channelTitle]) return false;
    }

    return true;
  }

  function toggleAllChannels(shouldExpand: boolean) {
    // Expand/contract all channels
    const updatedExpandedChannels = {...expandedChannels};

    Object.keys(musicDict).forEach(channelTitle => {
      updatedExpandedChannels[channelTitle] = shouldExpand;
    });

    setExpandedChannels(updatedExpandedChannels);
  }

  function toggleChannelExpanded(channelTitle: string) {
    // Expand/contract a channel
    const updatedValue = !expandedChannels[channelTitle];
    const updatedDict = Object.assign({}, expandedChannels, { [channelTitle]: updatedValue });

    setExpandedChannels(updatedDict);
  }

  if (!dataLoaded) return <Loader position="center-page" />;

  // When playing all liked songs, start at a random song
  // TODO: add functionality to start at beginning & random
  const randomChannel = _.sample(Object.keys(musicDict)) as string;
  const randomSongId = _.sample(musicDict[randomChannel])?.id;

  return (
    <div className="o-page o-grid">
      <div className="o-grid__item--wide">
        <h1 className="c-heading--title c-text--spaced c-text--centered c-music__heading">
          Music
          <Link className="c-heading--link c-music__link" to={`/watch?v=${randomSongId}&list=music`}>Play All</Link>
        </h1>
        <div className="c-music__controls">
          <InputWithClear
            onChange={handleFilterTextChange}
            onClear={() => setFilterText("")}
            value={filterText}
            containerClasses="c-music__input-container"
            inputClasses="c-music__control c-music__input"
          />
          <button
            onClick={toggleAllExpandedChannels}
            className="c-music__control c-music__toggle"
          >{allChannelsExpanded() ? "Minimize All ↑" : "Expand All ↓"}</button>
        </div>

        {
          objectIsEmpty(matchedSongs)
            ? <h2 className="c-heading c-heading--subsubtitle c-text--centered c-heading--500 c-text--spaced">No songs found...</h2>
            : <ul className="c-music__list">{ getMusic() }</ul>
        }
      </div>
    </div>
  );
}