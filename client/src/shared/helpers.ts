import { format, formatDistanceToNow, parseISO, toDate, differenceInDays } from "date-fns";
import { parseUrl, ParsedQuery } from "query-string";
import { IDocument } from "./interfaces/firebase.interfaces";

// FROM: https://stackoverflow.com/a/17663871
export function addCommasToNumber(num: number | string) {
  return Number(num).toLocaleString();
}

export function convertTimeToSeconds(minutes: string, seconds: string, hours?: string) {
  let totalSeconds = 0;

  totalSeconds += (+seconds);
  
  totalSeconds += (+minutes * 60);
  if (hours) {
    const hoursWithoutColon = hours.substring(0, hours.length - 1);
    totalSeconds += (+hoursWithoutColon * 60 * 60);
  }

  return totalSeconds;
}

export function documentIsOutdated(doc: IDocument, numDays: number) {
  const lastUpdated = toDate(doc.lastUpdatedMs);
  const today = new Date();
  const daysSinceLastUpdate = differenceInDays(today, lastUpdated);

  return daysSinceLastUpdate > numDays;
}

export function getAbbreviatedNumber(num: number | string): string {
  const fullValue = Number(num);

  /* Less than a thousand */
  if (fullValue <= 999) {
    return fullValue.toString();
  }
  
  /* Thousands */
  if (fullValue <= 999999) {
    return `${Math.floor(fullValue / 1000)}K`;
  }

  /* Millions */
  return `${Math.floor(fullValue / 1000000)}M`;
}

export function getFormattedDateFromToday(dateString: string) {
  return formatDistanceToNow(parseISO(dateString));
}

type DateFormat = "PPP" | "MMM io, yyyy";
export function getFormattedDate(dateToFormat: string, dateFormat: DateFormat) {
  return format(parseISO(dateToFormat), dateFormat);
}

export function getQueryParams(url: string) {
  return parseUrl(url);
}

export function getVideoQueryString(queryParams: ParsedQuery<string>) {
  // Params: v, list, index, start, end
  let queryString = "";

  if (typeof queryParams["v"] === "string") queryString += `?v=${queryParams["v"]}`;

  const otherParams = ["list", "index", "start", "end"];
  otherParams.forEach(param => {
    if (typeof queryParams[param] === "string") queryString += `&${param}=${queryParams[param]}`;
  });

  return queryString;
}

// FROM: https://howchoo.com/g/nwywodhkndm/how-to-turn-an-object-into-query-string-parameters-in-javascript#using-map-and-join
export function getQueryStringFromObject(params: { [key: string] : string } ) {  
  return "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

// FROM: https://stackoverflow.com/a/7394814
export function parseHtmlEntities(str: string) {
  return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
      var num = parseInt(numStr, 10); // read num as normal number
      return String.fromCharCode(num);
  });
}

export function roundToTwoDecimals(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function scrollToTop() {
  window.scrollTo(0,0);
}