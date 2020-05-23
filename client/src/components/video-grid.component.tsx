import React, { Component } from "react";

import { IPlaylistItem } from "shared/interfaces/youtube.interface";
import { Loader } from "components/loader.component";
import { VideoThumbnail } from "components/video-thumbnail.component";
import { NotFoundHeading } from "./not-found-heading.component";
import { MISSING_THUMBNAIL_URL } from "apis/youtube.api";

interface IProps {
  isLoading: boolean;
  hasMoreVideos: boolean;
  loadVideos: () => Promise<void>;
  showVideoIndices?: boolean;
  playlistId?: string;
  videos: IPlaylistItem[];
}

export class VideoGrid extends Component<IProps> {
  state = {
    doneInitialLoad: false
  }

  async componentDidMount() {
    await this.props.loadVideos();
    this.setState({ doneInitialLoad: true });
  }

  getLoadMoreButton = () => {
    const { isLoading, hasMoreVideos, loadVideos } = this.props;

    if (isLoading) return <Loader position="center-horizontal" />

    if (!isLoading && hasMoreVideos) {
      return <button className="c-button" onClick={loadVideos}>LOAD MORE</button> 
    }
  }

  render() {
    const { videos, showVideoIndices, playlistId } = this.props;
    const { doneInitialLoad } = this.state;

    if (!doneInitialLoad) return null;
    if (doneInitialLoad && videos.length <= 0) return <NotFoundHeading>No Videos</NotFoundHeading>

    return (
      <>
        <div className="c-video-thumbnail__grid">
          { videos.map((v, idx) => { 
            let url = `/watch?v=${v.snippet.resourceId.videoId}`;
            if (playlistId) url += `&list=${playlistId}`;

            const thumbnailUrl = v.snippet.thumbnails.medium?.url ?? MISSING_THUMBNAIL_URL;
            
            return (
              <VideoThumbnail 
                key={v.id}
                date={v.snippet.publishedAt}
                resourceUrl={url}
                thumbnailUrl={thumbnailUrl}
                title={v.snippet.title}
                index={showVideoIndices ? idx.toString() : undefined}
              />
            )
        }) }
        </div>
        { this.getLoadMoreButton() }
      </>
    )
  }
}