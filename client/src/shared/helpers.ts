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

// FROM: https://howchoo.com/g/nwywodhkndm/how-to-turn-an-object-into-query-string-parameters-in-javascript#using-map-and-join
export function getQueryStringFromObject(params: { [key: string] : string } ) {  
  return "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

// FROM: https://www.skptricks.com/2018/01/convert-text-urls-into-links-using-javascript.html
export function linkify(text: string): string {
  const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  const maxNumChars = 70;
  
  return text.replace(exp, (match, p1) => {
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