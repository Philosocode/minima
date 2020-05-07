import axios from "axios";

import { IChannelsResponse, ICommentsResponse, ICommentThreadsResponse, IPageInfo, IVideo } from "shared/interfaces/youtube.interface";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY as string;


/* API FUNCTIONS */
type SearchType = "video" | "playlist" | "channel";
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


export function getVideoDetails(videoId: string): Promise<IVideo> {
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


export function getChannelDetails(channelId: string): Promise<IChannelsResponse> {
  const url = BASE_URL + "/channels";
  const part = "id,snippet,statistics";

  const params = {
    key: API_KEY,
    id: channelId,
    part: part
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
};


interface ICommentThreadsParams {
  part: string;
  videoId: string;
  key: string;
  maxResults: number;
  order: string;
  pageToken: string | undefined;
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


interface ICommentsParams {
  part: string;
  parentId: string;
  key: string;
  maxResults: number;
  pageToken: string | undefined;
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