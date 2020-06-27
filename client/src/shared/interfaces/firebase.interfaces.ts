import { IVideoBase } from "./youtube.interfaces";

/* ============ */
// GENERAL
/* ============ */
export type DbCollectionType = "channels" | "music" | "playlists" | "videos";

/* ======== */
// VIDEO
/* ======== */
export interface IVideoDocument extends IVideoBase {
  lastUpdatedMs: number;
}