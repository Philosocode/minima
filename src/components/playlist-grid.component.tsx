import React, { Component } from "react";

import { IPlaylist } from "shared/interfaces/youtube.interfaces";
import { Loader } from "components/loader.component";
import { VideoThumbnail } from "./video-thumbnail.component";
import { NotFoundHeading } from "./not-found-heading.component";
import { Button } from "./button/button.component";

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
      return <Button centered onClick={loadPlaylists}>LOAD MORE</Button>
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
              date={p.snippet.publishedAt}
              resourceUrl={`/playlist?list=${p.id}`}
              numVideos={p.contentDetails.itemCount.toString()}
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