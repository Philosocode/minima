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

  function getToggleLabel() {
    if (excerpt === fullText) return;
  
    return isExpanded 
      ? showLessLabel ?? "SHOW LESS"
      : showMoreLabel ?? "SHOW MORE";
  }

  return (
    <div className="o-text-container o-text-container--html c-toggle-text__container">
      <p className="c-toggle-text__text" dangerouslySetInnerHTML={{ __html: getTextToShow() }}></p>
      {
        excerpt !== fullText && (
          <div className="c-link-text" onClick={toggleIsExpanded}>
            { getToggleLabel() }
          </div>
        )
      }
    </div>
  )
}