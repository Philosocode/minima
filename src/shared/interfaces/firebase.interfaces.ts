import { IVideo } from "./youtube.interfaces";

export type DbCollectionType = "channels" | "music" | "playlists" | "videos";

export interface IDocument {
  lastUpdatedMs: number;
}

export interface ISignInResult {
  status: "success" | "fail";
  data?: object;
  error?: string;
}