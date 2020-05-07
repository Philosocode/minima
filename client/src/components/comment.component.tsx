import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow, parseISO } from "date-fns";

import { IComment } from "shared/interfaces/youtube.interface";

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
  
  const formattedPublishedAt = formatDistanceToNow(parseISO(updatedAt));

  let commentWasUpdated = false;
  if (updatedAt !== publishedAt) commentWasUpdated = true;

  const channelUrl = `channel/${authorChannelId.value}`;

  return (
    <div className="c-comment__container">
      <Link to={channelUrl}>
        <img className={`c-channel__image ${type === "reply" ? "c-channel__image--small" : ""}`} src={authorProfileImageUrl} alt={authorDisplayName} />
      </Link>
      <div>
        <Link className="c-channel__name" to={channelUrl}>{authorDisplayName}</Link>
        <span className="c-comment__published-at">{formattedPublishedAt} ago { commentWasUpdated && "(edited)"}</span>
        <p dangerouslySetInnerHTML={{__html: textDisplay}} className="c-comment__text"></p>
        <div className="c-comment__likes"><FontAwesomeIcon icon={faThumbsUp} className="c-comment__like-icon" /> {likeCount.toLocaleString()}</div>
      </div>
    </div>
  );
};
