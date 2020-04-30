import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

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

  let containerClass = "c-comment__container";
  if (type === "reply") containerClass += " c-comment__container--reply";

  return (
    <div className={containerClass}>
      <div className="c-comment__thumbnail">
        <img src={authorProfileImageUrl} alt={authorDisplayName} />
      </div>
      <div className="c-comment__text">
        <div className="c-comment__author">
          <Link to={`channel/${authorChannelId.value}`}>{authorDisplayName}</Link>
        </div>
        {
          publishedAt === updatedAt 
            ? <div className="c-comment__published">Published: {publishedAt}</div>
            : <div className="c-comment__updated">Updated: {updatedAt}</div>
        }
        <p dangerouslySetInnerHTML={{__html: textDisplay}} className="c-comment__description"></p>
        <div className="c-comment__likes"><FontAwesomeIcon icon={faThumbsUp} className="c-comment__like-icon" /> {likeCount}</div>
      </div>
    </div>
  );
};
