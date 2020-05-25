import React, { Component } from "react";
import PropTypes from "prop-types";

let loadYT;

// FROM: https://stackoverflow.com/a/39519244
export class YouTubePlayer extends Component {
  componentDidMount() {
    if (!loadYT) {
      // SEE: https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      loadYT = new Promise((resolve) => {
        const tag = document.createElement("script");

        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName("script")[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }

    const options = {
      modestBranding: 1,
      rel: 0,
      ...this.props.playlistId && { 
        listType: "playlist",
        list: this.props.playlistId
      }
    };
    console.log("OPTIONS:", options);

    loadYT.then((YT) => {
      this.player = new YT.Player(this.youtubePlayerAnchor, {
        height: this.props.height || 390,
        width: this.props.width || 640,
        videoId: this.props.videoId,
        playerVars: options,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
      });
    });
  }

  onPlayerReady = (e) => {
    if (typeof this.props.onPlayerReady === "function") {
      this.props.onPlayerReady(e);
    }
  }

  onPlayerStateChange = (e) => {
    if (typeof this.props.onStateChange === "function") {
      this.props.onStateChange(e);
    }
  };

  render() {
    return (
      <section>
        <div
          className="c-video-player__iframe"
          ref={(r) => {
            this.youtubePlayerAnchor = r;
          }}
        ></div>
      </section>
    );
  }
}

YouTubePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  playlistId: PropTypes.string,
  onStateChange: PropTypes.func,
  onPlayerReady: PropTypes.func,
  playbackRate: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};