import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow, parseISO } from "date-fns";

import { IComment } from "apis/youtube.api";
import { ToggleText } from "./toggle-text.component";

type CommentType = "comment" | "reply";

interface IProps {
  comment: IComment;
  type: CommentType;
}

export const Comment: FC<IProps> = ({ comment, type }) => {
  const {
    authorChannelId,
    authorDisplayName,
    authorProfileImageUrl,
    likeCount,
    publishedAt,
    textDisplay,
    updatedAt,
  } = comment.snippet;

  let containerClass = "c-comment__container";
  if (type === "reply") containerClass += " c-comment__container--reply";

  let commentWasUpdated = false;
  if (updatedAt !== publishedAt) commentWasUpdated = true;

  const formattedPublishedAt = formatDistanceToNow(parseISO(updatedAt));

  return (
    <div className={containerClass}>
      <div>
        <img className="c-comment__image" src={authorProfileImageUrl} alt={authorDisplayName} />
      </div>
      <div className="c-comment__text">
        <div>
          <Link className="c-comment__author" to={`channel/${authorChannelId.value}`}>{authorDisplayName}</Link>
          <span className="c-comment__published-at">{formattedPublishedAt} ago { commentWasUpdated && "(edited)"}</span>
        </div>
        <ToggleText text={textDisplay} showMoreLabel="Read More" showLessLabel="Read Less" />
        <div className="c-comment__likes"><FontAwesomeIcon icon={faThumbsUp} className="c-comment__like-icon" /> {likeCount.toLocaleString()}</div>
      </div>
    </div>
  );
};
