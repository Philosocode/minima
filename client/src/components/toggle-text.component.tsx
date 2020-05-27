import React, { FC, useState, useEffect } from "react";

import { useToggle } from "hooks/use-toggle.hook";

interface IProps {
  text: string;
  textElement?: JSX.Element;
  showMoreLabel?: string;
  showLessLabel?: string;
}

export const ToggleText: FC<IProps> = ({ text, textElement, showLessLabel, showMoreLabel }) => {
  const [excerpt, setExcerpt] = useState("");
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  useEffect(() => {
    setExcerpt(getExcerpt());

    function getExcerpt(): string {
      // Referenced: https://stackoverflow.com/a/4321178
      const splitDesc = text.split(/\r?\n/);
      const firstFewLines = splitDesc.slice(0, 5);
  
      return firstFewLines.join("\n");
    }
  }, [text]);

  function getTextToShow() {
    return isExpanded
      ? text
      : excerpt;
  }

  function getToggleLabel() {
    if (excerpt === text) return;
  
    return isExpanded 
      ? showLessLabel ?? "SHOW LESS"
      : showMoreLabel ?? "SHOW MORE";
  }

  return (
    <div className="o-text-container o-text-container--html c-toggle-text__container">
      <p className="c-toggle-text__text" dangerouslySetInnerHTML={{ __html: getTextToShow() }}></p>
      {
        excerpt !== text && (
          <div className="c-link-text" onClick={toggleIsExpanded}>
            { getToggleLabel() }
          </div>
        )
      }
      {
        textElement
      }
    </div>
  )
}