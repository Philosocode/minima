/* ======== */
// CHANNEL
/* ======== */
export interface IChannel {
  id: string;
  contentDetails: IChannelContentDetails;
  snippet: IChannelSnippet;
  statistics: IChannelStatistics;
}

interface IChannelContentDetails {
  relatedPlaylists: {
    favorites: string;
    likes: string;
    uploads: string;
  }
}

export interface IChannelsResponse {
  items: IChannel[];
  pageInfo: IPageInfo;
}

interface IChannelSnippet {
  customUrl: string;
  description: string;
  thumbnails: IThumbnails;
  publishedAt: string;
  title: string;
}

interface IChannelStatistics {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}


/* ======== */
// COMMENT
/* ======== */
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

export interface ICommentsResponse {
  items: IComment[];
  nextPageToken: string;
  pageInfo: IPageInfo;
}

export interface ICommentThread {
  id: string;
  snippet: {
    topLevelComment: IComment;
    totalReplyCount: number;
  }
}

export interface ICommentThreadsResponse {
  items: ICommentThread[];
  nextPageToken: string;
  pageInfo: IPageInfo;
}


/* ======== */
// PAGE INFO
/* ======== */
export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}


/* ======== */
// PLAYLISTS
/* ======== */
export interface IPlaylist {
  id: string;
  contentDetails: IPlaylistContentDetails;
  snippet: IVideoSnippet;
}

interface IPlaylistContentDetails {
  itemCount: number;
}

export interface IPlaylistsResponse {
  items: IPlaylist[];
  pageInfo: IPageInfo;
  nextPageToken: string;
}


/* ======== */
// PLAYLIST ITEMS
/* ======== */
export interface IPlaylistItem {
  id: string;
  snippet: IPlaylistItemSnippet;
}

export interface IPlaylistItemSnippet extends IVideoSnippet {
  playlistId: string;
  position: string;
  resourceId: {
    videoId: string;
  }
}

export interface IPlaylistItemsResponse {
  items: IPlaylistItem[];
  nextPageToken?: string;
  pageInfo: IPageInfo;
}


/* ======== */
// THUMBNAIL
/* ======== */
interface IThumbnails {
  default: IThumbnail;
  medium: IThumbnail;
  high: IThumbnail;
}

interface IThumbnail {
  height: number;
  width: number;
  url: string;
}


/* ======== */
// VIDEO
/* ======== */
export interface IVideoBase {
  etag: string;
  snippet: IVideoSnippet;
  statistics: IVideoStatistics;
}

export interface IVideo extends IVideoBase {
  id: string;
}

export interface IVideoPlayer {
  embedHtml: string;
  embedHeight: number;
  embedWidth: number;
}

export interface IVideosResponse {
  etag: string;
  items: IVideo[];
  pageInfo: IPageInfo;
}

interface IVideoSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnails: IThumbnails;
  title: string;
}

export interface IVideoStatistics {
  commentCount: string;
  dislikeCount: string;
  likeCount: string;
  viewCount: string;
}