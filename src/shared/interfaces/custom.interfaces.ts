export interface IScrollListVideos {
  hasMoreVideos: boolean;
  loadMoreVideos: () => Promise<void>;
  videos: IScrollListVideo[];
}

export interface IScrollListVideo {
  // indexInPlaylist: number;
  channelTitle: string;
  playlistId: string;
  // setWatchingVideoIdx: Dispatch<SetStateAction<number>>;
  thumbnailUrl: string;
  title: string;
  videoId: string;
  // watchingVideoId: string;
}

export interface IScrollListHeader {
  channelTitle?: string;
  // currentVideoIdx: number;
  playlistTitle: string;
  totalVideos: number;
}