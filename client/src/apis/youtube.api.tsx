import axios from "axios";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

type SearchType = "video" | "playlist" | "channel";
interface IThumbnail {
  height: number,
  width: number,
  url: string
}
export interface IYouTubeVideo {
  id: {
    kind: string,
    videoId: string
  },
  snippet: {
    channelId: string,
    channelTitle: string,
    description: string,
    publishedAt: Date,
    thumbnails: {
      default: IThumbnail,
      medium: IThumbnail,
      high: IThumbnail,
    },
    title: string,
  }
}

export function getSearchUrlAndParams(query: string, searchType: SearchType = "video", numResults: number = 6): [string, object] {
  const params = {
    part: "snippet",
    key: API_KEY,
    q: query,
    maxResults: numResults,
    type: searchType
  };

  let url;
  switch (searchType) {
    case "video": 
      url = BASE_URL + "/search";
      break;
    default: 
      url = BASE_URL + "/search"
  }

  return [url, params]
}

export function getVideo(videoId: string): Promise<IYouTubeVideo> {
  const url = BASE_URL + "/videos";
  const VIDEO_PART = "snippet,statistics";
  const params = {
    id: videoId,
    part: VIDEO_PART,
    key: API_KEY,
  };

  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => resolve(res.data.items[0]))
      .catch(err => reject(err));
  });
}