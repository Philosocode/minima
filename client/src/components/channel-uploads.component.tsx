import React, { FC, useEffect } from "react";

import { IPlaylistItem } from "shared/interfaces/youtube.interface";
import { Loader } from "./loader.component";

interface IProps {
  isLoading: boolean;
  hasMoreUploads: boolean;
  loadUploads: () => Promise<void>;
  uploads: IPlaylistItem[];
}

export const ChannelUploads: FC<IProps> = ({ isLoading, hasMoreUploads, loadUploads, uploads }) => {
  useEffect(() => {
    async function initialLoadUploads() {
      await loadUploads();
    }

    initialLoadUploads();
  }, [loadUploads]);

  if (isLoading) return <Loader position="center-horizontal" />;

  return (
    <ul>
      { uploads.map(v => (<p key={v.id}>{v.snippet.title}</p> )) }
      {
        !isLoading && hasMoreUploads && <button onClick={loadUploads}>Load More</button>
      }
    </ul>
  )
}