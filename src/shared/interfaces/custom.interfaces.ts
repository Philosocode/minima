export enum CustomPlaylistTypes {
  CHANNEL = "channel",
  MUSIC = "music"
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