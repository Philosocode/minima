import { format, formatDistanceToNow, parseISO } from "date-fns";
import { parseUrl } from "query-string";

// FROM: https://stackoverflow.com/a/17663871
export function addCommasToNumber(num: number | string) {
  return Number(num).toLocaleString();
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

export function getQueryParams(url: string){
  return parseUrl(url);
}

// FROM: https://howchoo.com/g/nwywodhkndm/how-to-turn-an-object-into-query-string-parameters-in-javascript#using-map-and-join
export function getQueryStringFromObject(params: { [key: string] : string } ) {  
  return "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

// FROM: https://www.skptricks.com/2018/01/convert-text-urls-into-links-using-javascript.html
export function linkify(text: string): string {
  const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  const maxNumChars = 70;
  
  return text.replace(exp, (_, p1) => {
    const includeDots = p1.length > maxNumChars;
    let anchorTag = `<a href="${p1}" target="_blank" rel="noopener">${p1.substring(0, maxNumChars)}`;
    if (includeDots) anchorTag += "...";
    anchorTag += "</a>";
    
    return anchorTag;
  });
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

export function timeify(text: string) {
  /**
   * Convert text time links to YouTube video start times
   * e.g. 1:11 -> change video to 1:11
   * 
   * @param text - the text to parse
   * @returns Text with time links changed
   */
  // FROM: https://stackoverflow.com/a/7536768
  const exp = /t=([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g;
  let matches = text.matchAll(exp);

  for (const match of matches) {
    console.log(match);
  }
  
  return text;
}