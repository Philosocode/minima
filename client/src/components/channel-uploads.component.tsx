import React, { Component } from "react";

import { IPlaylistItem } from "shared/interfaces/youtube.interface";
import { Loader } from "./loader.component";
import { ChannelVideo } from "./channel-video.component";

interface IProps {
  isLoading: boolean;
  hasMoreUploads: boolean;
  loadUploads: () => Promise<void>;
  uploads: IPlaylistItem[];
}

export class ChannelUploads extends Component<IProps> {
  async componentDidMount() {
    await this.props.loadUploads();
  }

  render() {
    const { isLoading, hasMoreUploads, loadUploads, uploads } = this.props;

    if (isLoading) return <Loader position="center-horizontal" />;
    return (
      <>
        <div className="c-video__grid">
          { uploads.map(v => (<ChannelVideo video={v} />)) }
        </div>
        { !isLoading && hasMoreUploads && <button className="c-button" onClick={loadUploads}>LOAD MORE</button> }
      </>
    )
  }
}