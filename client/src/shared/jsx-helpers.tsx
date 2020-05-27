import React from "react";
import { Link } from "react-router-dom";

export function addLinksToTimes(text: string) {
  /**
   * Convert text time links in video descriptions to YouTube video start times
   * e.g. 1:11:11 -> set video time to 1:11:11
   * 
   * @param text - the text to parse
   * @returns Text with time links changed
   */
  // FROM: https://stackoverflow.com/a/14892796
  // FROM: https://github.com/facebook/react/issues/3386#issuecomment-78605760
  // const exp = /([0-9]?[0-9][:])?([0-5]?[0-9]):([0-5][0-9])/g;
  const exp = /(\d?\d?:?[0-5]?[0-9]:[0-5][0-9])/g;
  
  const parts = text.split(exp);

  return <>{
    parts.map(part => (part.match(exp) ? <Link to={part}>{part}</Link> : part))
  }</>;
}

export function addLinksToTimes2(text: string, formattingFunction?: (value: number | string) => React.ReactNode, ...values: Array<number | string> ) {
  const templateSplit = new RegExp(/{(\d)}/g);
  const isNumber = new RegExp(/^\d+$/);

  const splitText = text.split(templateSplit);
  return splitText.map(sentence => {
    if (isNumber.test(sentence)) {
      const value = values[Number(sentence)];
      return formattingFunction ? formattingFunction(value) : value;
    }
    return sentence;
  });
}