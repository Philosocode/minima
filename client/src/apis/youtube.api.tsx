export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

type SearchType = "video" | "playlist" | "channel";

export function getUrlAndParams(query: string, searchType: SearchType = "video", numResults: number = 5): [string, object] {
  const params = {
    part: "snippet",
    key: API_KEY,
    query: query,
    maxResults: numResults
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