export enum CustomPlaylistTypes {
  MUSIC = "music",
  VIDEOS = "videos",
};

export interface IScrollListVideos {
  hasMoreVideos: boolean;
  loadMoreVideos?: () => Promise<void>;
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
  channelTitle?: string;
  // currentVideoIdx: number;
  playlistTitle: string;
  totalVideos: number;
}