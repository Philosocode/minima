import React, { FC, useState, useEffect } from "react";

import { useToggle } from "hooks/use-toggle.hook";
import { linkify } from "shared/helpers";

interface IProps {
  text: string;
  showMoreLabel?: string;
  showLessLabel?: string;
}

export const ToggleText: FC<IProps> = ({ text, showLessLabel, showMoreLabel }) => {
  const [excerpt, setExcerpt] = useState("");
  const [fullText, setFullText] = useState("");
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  useEffect(() => {
    const textWithAnchorTags = linkify(text);
    setFullText(textWithAnchorTags);
    setExcerpt(getExcerpt(textWithAnchorTags));
  }, [text]);

  function getExcerpt(fullText: string): string {
    // Referenced: https://stackoverflow.com/a/4321178
    const splitDesc = fullText.split(/\r?\n/);
    const firstFewLines = splitDesc.slice(0, 5);

    return firstFewLines.join("\n");
  }

  function getTextToShow() {
    return isExpanded
      ? fullText
      : excerpt;
  }

  function getShowMoreToggle() {
    if (excerpt === fullText) return;
  
    const toggleLabel = isExpanded 
      ? showLessLabel ?? "SHOW LESS"
      : showMoreLabel ?? "SHOW MORE";
    
    let textClasses = "c-toggle-text__toggle c-link-text c-link-text--bold";
  
    return <div className={textClasses} onClick={toggleIsExpanded}>{ toggleLabel }</div>
  }

  return (
    <div className="o-container">
      <p className="c-toggle-text__text" dangerouslySetInnerHTML={{ __html: getTextToShow() }}></p>
      { getShowMoreToggle() }
    </div>
  )
}