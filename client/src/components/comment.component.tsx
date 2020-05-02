import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow, parseISO } from "date-fns";

import { IComment } from "apis/youtube.api";

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


  return (
    <div className="c-comment__container">
      <div>
        <img className={`c-comment__image ${type === "reply" && "c-comment__image--small"}`} src={authorProfileImageUrl} alt={authorDisplayName} />
      </div>
      <div>
        <div>
          <Link className="c-comment__author" to={`channel/${authorChannelId.value}`}>{authorDisplayName}</Link>
          <span className="c-comment__published-at">{formattedPublishedAt} ago { commentWasUpdated && "(edited)"}</span>
        </div>
        <p dangerouslySetInnerHTML={{__html: textDisplay}} className="c-comment__text"></p>
        <div className="c-comment__likes"><FontAwesomeIcon icon={faThumbsUp} className="c-comment__like-icon" /> {likeCount.toLocaleString()}</div>
      </div>
    </div>
  );
};
