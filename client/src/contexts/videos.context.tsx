import React, { Component, createContext } from "react";
import { IYouTubeVideo } from "apis/youtube.api";

/* Referenced: https://github.com/piotrwitek/react-redux-typescript-guide#themecontext */
// Create Context
interface IVideosContext {
  videos: IYouTubeVideo[];
  clearVideos?: () => void;
  setVideos?: (videos: IYouTubeVideo[]) => void;
}
export const VideosContext = createContext<IVideosContext>({ videos: [] });

// Create Provider
interface IState {
  videos: IYouTubeVideo[]
};
export class VideosProvider extends Component<{}, IState> {
  state = {
    videos: []
  }

  clearVideos = () => {
    this.setState({ videos: [] });
  }

  setVideos = (videos: IYouTubeVideo[]) => {
    this.setState({ videos });
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