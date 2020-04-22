// FROM: https://stackoverflow.com/a/7394814
export function parseHtmlEntities(str: string) {
  return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
      var num = parseInt(numStr, 10); // read num as normal number
      return String.fromCharCode(num);
  });
}

// FROM: https://www.skptricks.com/2018/01/convert-text-urls-into-links-using-javascript.html
export function linkify(text: string): string {
  const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  
  return text.replace(exp, `<a href="$1" target="_blank" rel="noopener">$1</a>`);
}