import React, { FC, useEffect } from "react";

import { useToggle } from "hooks/use-toggle.hook";
import { linkify } from "helpers/helpers";

interface IProps {
  desc: string;
}

export const VideoDescription: FC<IProps> = ({ desc }) => {
  const formattedDesc = linkify(desc);
  const shortDesc = getShortDescription(formattedDesc);
  const [showReadMore, toggleShowReadMore] = useToggle(true);
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  useEffect(() => {
    // Don't show for short descriptions, e.g. formattedDesc == shortDesc
    if (shortDesc === formattedDesc) toggleShowReadMore();
  }, [shortDesc, formattedDesc, toggleShowReadMore]);

  function getShortDescription(desc: string): string {
    // Referenced: https://stackoverflow.com/a/4321178
    const splitDesc = desc.split(/\r?\n/);
    const firstFewLines = splitDesc.slice(0, 5);

    return firstFewLines.join("\n");
  }

  function getDescriptionToShow(): string {
    return isExpanded
      ? formattedDesc
      : shortDesc;
  }

  function getShowDescriptionToggle() {
    const text = isExpanded 
      ? "Show Less"
      : "Show More";

    return <div className="c-video__show-toggle" onClick={toggleIsExpanded}>{ text }</div>
  }

  return (
    <>
      <p className="c-video__description" dangerouslySetInnerHTML={{ __html: getDescriptionToShow() }}></p>
      { showReadMore && getShowDescriptionToggle() }
    </>
  );
}