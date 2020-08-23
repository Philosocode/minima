export enum ECustomPlaylistTypes {
  MUSIC = "music",
  VIDEOS = "videos",
};

export interface IScrollListVideos {
  hasMoreVideos: boolean;
  loadMoreVideos?: () => void;
  videos: IScrollListVideo[];
}

export interface IScrollListVideo {
  channelTitle: string;
  playlistId: string;
  thumbnailUrl: string;
  title: string;
  videoId: string;
}

export interface IScrollListHeader {
  playlistId: string;
  playlistTitle: string;
  totalVideos: number;
  channelId?: string;
  channelTitle?: string;
}

export interface IThumbnail {
  id: string;
  resourceUrl: string;
  title: string;
  thumbnailUrl: string;
  date?: string;
  numItemsInPlaylist?: number | string;
}
