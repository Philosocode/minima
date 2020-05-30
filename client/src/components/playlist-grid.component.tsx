import React, { Component } from "react";

import { IPlaylist } from "shared/interfaces/youtube.interface";
import { Loader } from "components/loader.component";
import { VideoThumbnail } from "./video-thumbnail.component";
import { NotFoundHeading } from "./not-found-heading.component";

interface IProps {
  isLoading: boolean;
  hasMorePlaylists: boolean;
  loadPlaylists: () => Promise<void>;
  playlists: IPlaylist[];
}

export class PlaylistGrid extends Component<IProps> {
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
    if (doneInitialLoad && playlists.length <= 0) return <NotFoundHeading>No Playlists</NotFoundHeading>

    return (
      <>
        <div className="c-video-thumbnail__grid">
          { playlists.map(p =>  
            <VideoThumbnail 
              key={p.id} 
              count={p.contentDetails.itemCount.toString()}
              date={p.snippet.publishedAt}
              resourceUrl={`/playlist?list=${p.id}`}
              thumbnailUrl={p.snippet.thumbnails.medium.url}
              title={p.snippet.title}
            />
          )}
        </div>
        { this.getLoadMoreButton() }
      </>
    )
  }
}