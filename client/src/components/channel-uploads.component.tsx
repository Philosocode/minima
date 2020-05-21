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
  state = {
    doneInitialLoad: false
  }

  async componentDidMount() {
    await this.props.loadUploads();
    this.setState({ doneInitialLoad: true });
  }

  getLoadMoreButton = () => {
    const { isLoading, hasMoreUploads, loadUploads } = this.props;

    if (isLoading) return <Loader position="center-horizontal" />

    if (!isLoading && hasMoreUploads) {
      return <button className="c-button" onClick={loadUploads}>LOAD MORE</button> 
    }
  }

  render() {
    const { uploads } = this.props;
    const { doneInitialLoad } = this.state;

    if (!doneInitialLoad) return null;
    return (
      <>
        <div className="c-video__grid">
          { uploads.map(v => (<ChannelVideo key={v.id} video={v} />)) }
        </div>
        { this.getLoadMoreButton() }
      </>
    )
  }
}