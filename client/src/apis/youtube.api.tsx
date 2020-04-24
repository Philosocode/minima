import axios from "axios";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

/* TYPES */
type SearchType = "video" | "playlist" | "channel";
interface IThumbnail {
  height: number;
  width: number;
  url: string;
}

export interface IYouTubeVideo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: Date;
    thumbnails: {
      default: IThumbnail;
      medium: IThumbnail;
      high: IThumbnail;
    },
    title: string;
  }
}

export interface ICommentsResponse {
  items: ICommentThread[];
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  }
}

export interface ICommentThread {
  id: string;
  replies?: IComment[];
  snippet: {
    topLevelComment: IComment;
    totalReplyCount: number;
  }
}

export interface IComment {
  id: string;
  snippet: {
    authorChannelId: { value: string; };
    authorChannelUrl: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    likeCount: number;
    publishedAt: Date;
    textDisplay: string;
    textOriginal: string;
    updatedAt: Date;
  }
}

/* FUNCTIONS */
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
      .then(res => {
        if (res.data.items.length <= 0) {
          reject("ERROR: Video not found.")
        } 
        else {
          resolve(res.data.items[0])
        }
      })
      .catch(err => reject(err));
  });
}

export function getCommentsForVideo(videoId: string, maxNumComments=50): Promise<ICommentsResponse> {
  const url = BASE_URL + "/commentThreads";
  const PART = "id,replies,snippet";
  const params = {
    part: PART,
    videoId: videoId,
    key: API_KEY,
    maxResults: maxNumComments
  };

  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        if (res.data.items.length <= 0) {
          reject("ERROR: Couldn't load comments.");
        }
        else {
          resolve(res.data);
        }
      })
      .catch(err => reject(err));
  });
}