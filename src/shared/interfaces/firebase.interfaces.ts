export type DbCollectionType = "channels" | "playlists" | "users" | "videos";
export type DbLikeType = "channels" | "music" | "playlists" | "videos";

export interface IUser {
  likes: IUserLikes;
}

export interface IUserLikes {
  channels: string[];
  music: string[];
  playlists: string[];
  videos: string[];
}

export interface IDocument {
  lastUpdatedMs: number;
}