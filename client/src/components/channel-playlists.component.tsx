import React, { Component } from "react";

import { IPlaylist } from "shared/interfaces/youtube.interface";
import { ChannelPlaylist } from "components/channel-playlist.component";
import { Loader } from "components/loader.component";

interface IProps {
  isLoading: boolean;
  hasMorePlaylists: boolean;
  loadPlaylists: () => Promise<void>;
  playlists: IPlaylist[];
}

export class ChannelPlaylists extends Component<IProps> {
  state = {
    doneInitialLoad: false
  }

  async componentDidMount() {
    await this.props.loadPlaylists();
    this.setState({ doneInitialLoad: true });
  }

  getLoadMoreButton = () => {
    const { isLoading, hasMorePlaylists, loadPlaylists } = this.props;

    if (isLoading) return <Loader position="center-horizontal" />

    if (!isLoading && hasMorePlaylists) {
      return <button className="c-button" onClick={loadPlaylists}>LOAD MORE</button> 
    }
  }

  render() {
    const { doneInitialLoad } = this.state;
    const { playlists } = this.props;

    if (!doneInitialLoad) return null;

    return (
      <>
        <div className="c-channel__grid">
          { playlists.map(p => <ChannelPlaylist key={p.id} playlist={p} />) }
        </div>
        { this.getLoadMoreButton() }
      </>
    )
  }
}