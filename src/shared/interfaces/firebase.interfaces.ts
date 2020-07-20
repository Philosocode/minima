import { IVideo } from "./youtube.interfaces";

export type DbCollectionType = "channels" | "music" | "playlists" | "videos";

export interface IDocument {
  lastUpdatedMs: number;
}