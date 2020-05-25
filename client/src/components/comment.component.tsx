import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { IComment } from "shared/interfaces/youtube.interface";
import { getFormattedDateFromToday } from "shared/helpers";

type CommentType = "comment" | "reply";

interface IProps {
  comment: IComment;
  type: CommentType;
  isUploader?: boolean;
}

export const Comment: FC<IProps> = ({ comment, type, isUploader }) => {
  const {
    authorChannelId,
    authorDisplayName,
    authorProfileImageUrl,
    likeCount,
    publishedAt,
    textDisplay,
    updatedAt,
  } = comment.snippet;

  const channelUrl = `channel/${authorChannelId.value}`;
  const formattedDate = getFormattedDateFromToday(publishedAt);

  function commentWasUpdated(): boolean {
    return updatedAt !== publishedAt;    
  }

  function getChannelImageClasses(): string {
    let classes = "o-thumbnail c-channel__image";
    if (type === "reply") classes += " c-channel__image--small";

    return classes;
  }

  function getChannelNameClasses(): string {
    let classes = "c-heading c-heading--small";
    if (isUploader) {
      classes += " c-comment__uploader";
    }
    else {
      classes += " c-heading--link";
    }

    return classes;
  }

  function getContainerClasses(): string {
    let classes = "o-media c-comment__container";
    if (type === "reply") classes += " c-comment__container--reply"

    return classes;
  }

  return (
    <div className={getContainerClasses()}>

      <Link to={channelUrl} className="o-media__image">
        <img className={getChannelImageClasses()} src={authorProfileImageUrl} alt={authorDisplayName} />
      </Link>
      
      <div className="o-media__body">
        <Link className={getChannelNameClasses()} to={channelUrl}>{authorDisplayName}</Link>
        <div className="c-comment__date">{formattedDate} ago { commentWasUpdated() && "(edited)"}</div>
        <p dangerouslySetInnerHTML={{__html: textDisplay}} className="o-text-container o-text-container--html c-comment__content"></p>
        <div><FontAwesomeIcon className="c-icon__icon" icon={faThumbsUp} /> <span className="c-icon__text">{likeCount.toLocaleString()}</span></div>
      </div>

    </div>
  );
};
