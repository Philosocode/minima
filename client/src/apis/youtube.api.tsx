import axios from "axios";

import { IChannelsResponse, ICommentsResponse, ICommentThreadsResponse, IVideo, IVideosResponse } from "shared/interfaces/youtube.interface";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY as string;

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

export function getChannelDetails(channelId: string): Promise<IChannelsResponse> {
  const url = BASE_URL + "/channels";
  const part = "id,snippet,statistics";
  const params = {
    key: API_KEY,
    id: channelId,
    part: part
  };

  return makeApiRequest<IChannelsResponse>(url, params);
};

interface ICommentThreadsParams {
  part: string;
  videoId: string;
  key: string;
  maxResults: number;
  order: string;
  pageToken: string | undefined;
}
export function getCommentThreadsForVideo(videoId: string, nextPageToken?: string): Promise<ICommentThreadsResponse> {
  const url = BASE_URL + "/commentThreads";
  const part = "id,snippet";
  const MAX_NUM_THREADS = 100;

  const params: ICommentThreadsParams = {
    key: API_KEY,
    maxResults: MAX_NUM_THREADS,
    pageToken: nextPageToken,
    part: part,
    videoId: videoId,
    order: "relevance"
  };

  return makeApiRequest<ICommentThreadsResponse>(url, params);
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

  return makeApiRequest<ICommentsResponse>(url, params);
}

export function getVideoDetails(videoId: string): Promise<IVideo> {
  const url = BASE_URL + "/videos";
  const part = "snippet,statistics";
  const params = {
    id: videoId,
    key: API_KEY,
    part: part
  };

  return makeApiRequest<IVideosResponse>(url, params)
    .then(videosRes => videosRes.items[0])
    .catch(err => {
      throw new Error(err);
    });
}

async function makeApiRequest<IResponseType>(url: string, params: object): Promise<IResponseType> {
  try {
    const res = await axios.get(url, { params });

    if (res.status !== 200) {
      throw new Error("ERROR: Failed to fetch data.");
    }
    else {
      return res.data;
    }
  }
  catch(err) {
    throw new Error(err);
  }
}