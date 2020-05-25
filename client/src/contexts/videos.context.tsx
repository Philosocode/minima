import React, { Component, createContext } from "react";

import { IVideo } from "shared/interfaces/youtube.interface";
import { parseHtmlEntities } from "shared/helpers";

/* Referenced: https://github.com/piotrwitek/react-redux-typescript-guide#themecontext */
// Create Context
type VideosContextProps = {
  videos: IVideo[];
  currentVideo?: IVideo;
  clearVideos?: () => void;
  setVideos?: (videos: IVideo[]) => void;
  setCurrentVideo?: (video: IVideo) => void;
}
export const VideosContext = createContext<VideosContextProps>({ videos: [] });

// Create Provider
interface IState {
  videos: IVideo[],
  currentVideo?: IVideo
};
export class VideosProvider extends Component<{}, IState> {
  state = {
    videos: []
  }

  clearVideos = () => {
    this.setState({ videos: [] });
  }

  setVideos = (videos: IVideo[]) => {
    // Decode HTML entities in title
    videos.forEach(video => {
      video.snippet.title = parseHtmlEntities(video.snippet.title);
      video.snippet.description = parseHtmlEntities(video.snippet.description);
    });
    this.setState({ videos });
  }

  setCurrentVideo = (video: IVideo) => {
    this.setState({ currentVideo: video });
  }

  render() {
    const { videos } = this.state;
    const { clearVideos, setVideos, setCurrentVideo } = this;

    return (
      <VideosContext.Provider value={{ videos, clearVideos, setVideos, setCurrentVideo }}>
        {this.props.children}
      </VideosContext.Provider>
    )
  }
}