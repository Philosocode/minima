import React, { FC, useEffect } from "react";

import { IPlaylist } from "shared/interfaces/youtube.interface";
import { Loader } from "./loader.component";

interface IProps {
  isLoading: boolean;
  hasMorePlaylists: boolean;
  loadPlaylists: () => Promise<void>;
  playlists: IPlaylist[];
}

export const ChannelPlaylists: FC<IProps> = ({ isLoading, hasMorePlaylists, loadPlaylists, playlists }) => {
  useEffect(() => {
    async function initialLoadPlaylists() {
      await loadPlaylists();
    }

    initialLoadPlaylists();
  }, [loadPlaylists]);

  if (isLoading) return <Loader position="center-horizontal" />;

  return (
    <ul>
      { playlists.map(p => (<p key={p.id}>{p.id}</p> )) }
      {
        !isLoading && hasMorePlaylists && <button onClick={loadPlaylists}>Load More</button>
      }
    </ul>
  )
}