import axios from "axios";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY as string;

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

interface ICommentsParams {
  part: string,
  videoId: string,
  key: string,
  maxResults: number,
  pageToken: string | undefined
}

export interface ICommentsResponse {
  items: ICommentThread[];
  nextPageToken: string;
  pageInfo: IPageInfo;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ICommentThread {
  id: string;
  replies?: {
    comments: IComment[];
  }
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
  const videoPart = "snippet,statistics";
  const params = {
    id: videoId,
    key: API_KEY,
    part: videoPart
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

export function getCommentsForVideo(videoId: string, pageInfo?: IPageInfo, nextPageToken?: string): Promise<ICommentsResponse> {
  const url = BASE_URL + "/commentThreads";
  const commentPart = "id,replies,snippet";
  const MAX_NUM_COMMENTS = 100;
  
  let numCommentsToFetch = MAX_NUM_COMMENTS;
  const totalResults = pageInfo?.totalResults

  if (totalResults && totalResults < MAX_NUM_COMMENTS) {
    numCommentsToFetch = totalResults;
  }

  const params: ICommentsParams = {
    key: API_KEY,
    maxResults: numCommentsToFetch,
    pageToken: nextPageToken,
    part: commentPart,
    videoId: videoId,
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