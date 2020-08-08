import axios from "axios";

import { 
  IChannelsResponse, 
  ICommentsResponse, 
  ICommentThreadsResponse, 
  IPlaylistItemsResponse,
  IVideo, 
  IVideosResponse,
  IPlaylistItem,
  IPlaylist,
  IPlaylistsResponse,
  IChannel,
} from "shared/interfaces/youtube.interfaces";
import { VIDEO_CACHE_DAYS } from "shared/constants";
import { addDocToDb, getDocFromDb, getChannelFromDbWithUsername, getLikes, getDocsFromDb } from "./firebase.api";
import { IDocument } from "shared/interfaces/firebase.interfaces";
import { documentIsOutdated } from "shared/helpers";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY as string;
export const MISSING_THUMBNAIL_URL = "http://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg";

interface ICommentsParams {
  part: string;
  parentId: string;
  key: string;
  maxResults: number;
  pageToken: string | undefined;
  textFormat: "html" | "plainText";
}
export function getCommentThreadReplies(threadId: string, nextPageToken?: string): Promise<ICommentsResponse> {
  const url = BASE_URL + "/comments";
  const part = "id,snippet";
  const MAX_NUM_COMMENTS = 100;

  const params: ICommentsParams = {
    key: API_KEY,
    maxResults: MAX_NUM_COMMENTS,
    pageToken: nextPageToken,
    part: part,
    parentId: threadId,
    textFormat: "plainText"
  };

  return makeApiRequest<ICommentsResponse>(url, params);
}

export async function getResourcesByIds<ResourceType>(
  ids: string[],
  getResourceCb: (id: string) => Promise<ResourceType>
): Promise<ResourceType[]> {
  const resources: ResourceType[] = [];

  await Promise.all(ids.map(async (id) => {
    const resource = await getResourceCb(id);
    resources.push(resource);
  }));

  return resources;
}

export async function getChannelDetails(channelId: string, username?: string): Promise<IChannel> {
  if (!channelId && !username) throw new Error("Must provide channel ID or username");

  type ChannelDocument = IChannel & IDocument;

  const channelFromDb = (username)
    ? await getChannelFromDbWithUsername(username) as ChannelDocument
    : await getDocFromDb("channels", channelId) as ChannelDocument;
    
  if (!channelFromDb || documentIsOutdated(channelFromDb, VIDEO_CACHE_DAYS)) {
    return await fetchChannelDetails(channelId, username);
  }

  return channelFromDb;
};

async function fetchChannelDetails(channelId?: string, username?: string): Promise<IChannel> {
  const url = BASE_URL + "/channels";
  const part = "id,contentDetails,snippet,statistics";
  const params = {
    key: API_KEY,
    id: channelId,
    forUsername: username,
    part: part
  };
  
  try {
    const channelRes = await makeApiRequest<IChannelsResponse>(url, params);
    const channel = channelRes.items[0];

    const { id, contentDetails, snippet, statistics } = channel;
    const channelDoc = { contentDetails, snippet, statistics };

    addDocToDb("channels", id, channelDoc);

    return channel;
  }
  catch (err) {
    throw new Error(err);
  }
}

export function getChannelPlaylists(channelId: string, nextPageToken?: string): Promise<IPlaylistsResponse> {
  const url = BASE_URL + "/playlists";
  const part = "id,contentDetails,snippet";
  const MAX_NUM_PLAYLISTS = 50;

  const params = {
    key: API_KEY,
    maxResults: MAX_NUM_PLAYLISTS,
    channelId: channelId,
    part: part,
    pageToken: nextPageToken
  }

  return makeApiRequest<IPlaylistsResponse>(url, params);
}

export async function getPlaylistDetails(playlistId: string) {
  const playlistFromDb = await getDocFromDb("playlists", playlistId) as (IPlaylist & IDocument);

  if (!playlistFromDb || documentIsOutdated(playlistFromDb, VIDEO_CACHE_DAYS)) {
    return await fetchPlaylistDetails(playlistId);
  }

  return playlistFromDb;
}

export async function fetchLikedVideos(likeType: "music" | "videos") {
  // Get liked video IDs from DB
  const likedVideos = await getLikes(likeType) as { likes: string[] };
  const likedVideoIds = likedVideos.likes;
  
  // Get all videos from DB
  const videos = await getDocsFromDb("videos", likedVideoIds) as IVideo[];

  return videos;
}

async function fetchPlaylistDetails(playlistId: string): Promise<IPlaylist> {
  const url = BASE_URL + "/playlists";
  const part = "id,contentDetails,snippet";
  const MAX_NUM_PLAYLISTS = 50;

  const params = {
    key: API_KEY,
    maxResults: MAX_NUM_PLAYLISTS,
    id: playlistId,
    part: part,
  }

  try {
    const playlistRes = await makeApiRequest<IPlaylistsResponse>(url, params);
    const playlist = playlistRes.items[0];

    const { id, contentDetails, snippet } = playlist;
    const playlistDoc = { contentDetails, snippet };

    addDocToDb("playlists", id, playlistDoc);

    return playlist;
  }
  catch (err) {
    throw new Error(err);
  }
}

export async function getPlaylistVideos(playlistId: string, nextPageToken?: string): Promise<IPlaylistItemsResponse> {
  /**
   * Fetch up to `MAX_NUM_PLAYLIST_VIDEOS` videos from a playlist. Use `nextPageToken` if provided
   * 
   * @returns Videos from the playlist
   */
  const url = BASE_URL + "/playlistItems";
  const part = "id,snippet";
  const MAX_NUM_PLAYLIST_VIDEOS = 50;

  const params: IPlaylistVideosParams = {
    key: API_KEY,
    maxResults: MAX_NUM_PLAYLIST_VIDEOS,
    playlistId: playlistId,
    part: part,
    pageToken: nextPageToken
  }

  return makeApiRequest<IPlaylistItemsResponse>(url, params);
}

export async function getPlaylistVideosUntilCurrentVideo(
  currentVideoId: string,
  playlistId: string,
): Promise<[IPlaylistItem[], string]> {
  /**
   * Fetch videos from the beginning of a playlist in batches of MAX_NUM_PLAYLIST_VIDEOS
   * Stop once a set of videos contains the current video
   * 
   * @returns Videos, including the current video, in increments of MAX_NUM_PLAYLIST_VIDEOS (e.g. 50 videos, 100 videos, etc)
   */
  const videos: IPlaylistItem[] = [];
  let nextPageToken = "";

  while (true) {
    const videosRes = await getPlaylistVideos(playlistId, nextPageToken);    
    const videosFetched = videosRes.items;

    videos.push(...videosFetched);

    // If `nextPageToken` is in the res, that means more videos can be loaded
    // If not, that means all videos have been loaded, so break out of the loop
    if (videosRes.nextPageToken) {
      nextPageToken = videosRes.nextPageToken
    }
    else {
      nextPageToken = "";
      break;
    }

    // If current video is among the fetched batch, stop fetching more videos
    const resContainsCurrentVideo = videosFetched.some(
      v => v.snippet.resourceId.videoId === currentVideoId
    );
    if (resContainsCurrentVideo) break;
  }

  return [videos, nextPageToken];
}

interface ICommentThreadsParams {
  part: string;
  videoId: string;
  key: string;
  maxResults: number;
  order: string;
  pageToken: string | undefined;
  textFormat: "html" | "plainText";
}
export function getVideoCommentThreads(videoId: string, nextPageToken?: string): Promise<ICommentThreadsResponse> {
  const url = BASE_URL + "/commentThreads";
  const part = "id,snippet";
  const MAX_NUM_THREADS = 100;

  const params: ICommentThreadsParams = {
    key: API_KEY,
    maxResults: MAX_NUM_THREADS,
    pageToken: nextPageToken,
    part: part,
    videoId: videoId,
    order: "relevance",
    textFormat: "plainText"
  };

  return makeApiRequest<ICommentThreadsResponse>(url, params);
}

export async function getVideoDetails(videoId: string): Promise<IVideo> {
  const videoFromDb = await getDocFromDb("videos", videoId) as (IVideo & IDocument);
  if (!videoFromDb || documentIsOutdated(videoFromDb, VIDEO_CACHE_DAYS)) {
    return fetchVideoDetails(videoId);
  }

  return videoFromDb;
}

async function fetchVideoDetails(videoId: string): Promise<IVideo> {
  const url = BASE_URL + "/videos";
  const part = "snippet,statistics,player";
  const params = {
    id: videoId,
    key: API_KEY,
    part: part
  };

  try {
    const videosRes = await makeApiRequest<IVideosResponse>(url, params);
    const video = videosRes.items[0];

    const { id, snippet, statistics } = video;
    const videoDoc = { snippet, statistics };

    addDocToDb("videos", id, videoDoc);

    return video;
  }
  catch (err) {
    throw new Error(err);
  }
}

interface IPlaylistVideosParams {
  part: string;
  playlistId: string;
  key: string;
  maxResults: number;
  pageToken?: string;
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