import React, { Component, createContext } from "react";
import { IYouTubeVideo } from "apis/youtube.api";

import { parseHtmlEntities } from "helpers/helpers";

/* Referenced: https://github.com/piotrwitek/react-redux-typescript-guide#themecontext */
// Create Context
interface IVideosContext {
  videos: IYouTubeVideo[];
  currentVideo?: IYouTubeVideo;
  clearVideos?: () => void;
  setVideos?: (videos: IYouTubeVideo[]) => void;
}
export const VideosContext = createContext<IVideosContext>({ videos: [] });

// Create Provider
interface IState {
  videos: IYouTubeVideo[],
  currentVideo?: IYouTubeVideo
};
export class VideosProvider extends Component<{}, IState> {
  state = {
    videos: []
  }

  clearVideos = () => {
    this.setState({ videos: [] });
  }

  setVideos = (videos: IYouTubeVideo[]) => {
    // Decode HTML entities in title
    videos.forEach(video => {
      video.snippet.title = parseHtmlEntities(video.snippet.title);
      video.snippet.description = parseHtmlEntities(video.snippet.description);
    });
    this.setState({ videos });
  }

  setCurrentVideo = (video: IYouTubeVideo) => {
    this.setState({ currentVideo: video });
  }

  render() {
    const { videos } = this.state;
    const { clearVideos, setVideos } = this;

    return (
      <VideosContext.Provider value={{ videos, clearVideos, setVideos }}>
        {this.props.children}
      </VideosContext.Provider>
    )
  }
}