import React from "react";
import { Link } from "react-router-dom";
import { convertTimeToSeconds } from "./helpers";

const timeExp = /(\d?\d?:?[0-5]?[0-9]:[0-5][0-9])/g;
// FROM: https://stackoverflow.com/a/17773849
const urlExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig;
const youtubeUrlExp = /https?:\/\/www\.youtube\.com/ig;

export function linkifyText(text: string) {
  /**
   * Convert text time links in video descriptions to YouTube video start times
   * e.g. 1:11:11 -> set video time to 1:11:11
   * 
   * @param text - the text to parse
   * @returns Text with time links changed
   */
  // FROM: https://stackoverflow.com/a/14892796
  // FROM: https://github.com/facebook/react/issues/3386#issuecomment-78605760
  const parts = text.split(timeExp);

  return (
    <>{
      parts.map((part) => {
        // It's a time. Convert to Link element
        if (part.match(timeExp)) {
          return convertTimeStringToLinkElement(part);
        }
        // It's a URL. Convert to anchor element
        else if (part.match(urlExp)) {
          return convertUrlToAnchorElement(part);
        }

        return part;
      })
    }</>
  );
}

function convertTimeStringToLinkElement(time: string) {
  // Time will either be ##:##:## or ##:## format
  const timeParts = time.split(":");
  let startSeconds = 0;

  // ##:##
  if (timeParts.length === 2) {
    const [minutes, seconds] = timeParts;
    startSeconds = convertTimeToSeconds(minutes, seconds);
  }

  // ##:##:##
  else if (timeParts.length === 3) {
    const [hours, minutes, seconds] = timeParts;

    startSeconds = convertTimeToSeconds(minutes, seconds, hours);
  }

  else {
    throw new Error("ERROR: Invalid time passed");
  }

  return (
    <Link to={`/watch?v=lhu8HWc9TlA&start=${startSeconds}`}>{time}</Link>
  );
}

function convertUrlToAnchorElement(url: string) {
  const parts = url.split(urlExp);

  return (
    <>{
      parts.map(
        part => {
          // It's a YouTube URL. Convert to Link element
          if (part.match(youtubeUrlExp)) {
            const relativeUrl = part.replace(youtubeUrlExp, "");
            const shortenedUrl = getShortenedUrl(part);

            return (
              <Link to={relativeUrl}>{shortenedUrl}</Link>
            )
          }

          // It's a URL. Convert to anchor element
          else if (part.match(urlExp)) {
            const shortenedUrl = getShortenedUrl(part);

            return (
              <a href={part} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
            )
          }
          // Regular text
          return part;
      })
    }</>
  );
}

function getShortenedUrl(url: string) {
  const maxNumChars = 70;
  const includeDots = url.length > maxNumChars;

  let shortenedUrl = `${url.substring(0, maxNumChars)}`;
  if (includeDots) shortenedUrl += "...";

  return shortenedUrl;
}