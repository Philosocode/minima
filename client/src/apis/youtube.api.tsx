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

/* INTERFACES */
export interface IVideo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: IVideoSnippet;
  statistics: IVideoStatistics;
}

interface IVideoSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: IThumbnail;
    medium: IThumbnail;
    high: IThumbnail;
  };
  title: string;
}

export interface IVideoStatistics {
  commentCount: string;
  dislikeCount: string;
  likeCount: string;
  viewCount: string;
}

interface ICommentThreadsParams {
  part: string;
  videoId: string;
  key: string;
  maxResults: number;
  order: string;
  pageToken: string | undefined;
}

export interface ICommentThreadsResponse {
  items: ICommentThread[];
  nextPageToken: string;
  pageInfo: IPageInfo;
}

interface ICommentsParams {
  part: string;
  parentId: string;
  key: string;
  maxResults: number;
  pageToken: string | undefined;
}

export interface ICommentsResponse {
  items: IComment[];
  nextPageToken: string;
  pageInfo: IPageInfo;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ICommentThread {
  id: string;
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
    publishedAt: string;
    textDisplay: string;
    textOriginal: string;
    updatedAt: string;
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

export function getVideo(videoId: string): Promise<IVideo> {
  const url = BASE_URL + "/videos";
  const part = "snippet,statistics";
  const params = {
    id: videoId,
    key: API_KEY,
    part: part
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

export function getCommentThreadsForVideo(videoId: string, pageInfo?: IPageInfo, nextPageToken?: string): Promise<ICommentThreadsResponse> {
  const url = BASE_URL + "/commentThreads";
  const part = "id,snippet";
  const MAX_NUM_COMMENTS = 100;
  
  let numCommentsToFetch = MAX_NUM_COMMENTS;
  const totalResults = pageInfo?.totalResults

  if (totalResults && totalResults < MAX_NUM_COMMENTS) {
    numCommentsToFetch = totalResults;
  }

  const params: ICommentThreadsParams = {
    key: API_KEY,
    maxResults: numCommentsToFetch,
    pageToken: nextPageToken,
    part: part,
    videoId: videoId,
    order: "relevance"
  };

  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        console.log(res);
        
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

export function getRepliesForCommentThread(threadId: string, nextPageToken?: string): Promise<ICommentsResponse> {
  const url = BASE_URL + "/comments";
  const part = "id,snippet";
  const MAX_NUM_COMMENTS = 100;

  const params: ICommentsParams = {
    key: API_KEY,
    maxResults: MAX_NUM_COMMENTS,
    pageToken: nextPageToken,
    part: part,
    parentId: threadId
  };

  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        console.log(res);
        
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