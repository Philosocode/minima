import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IComment } from "apis/youtube.api";

interface IProps {
  comment: IComment
}

export const Comment: FC<IProps> = ({ comment }) => { 
  const { snippet } = comment;

  return (
    <div className="c-comment__container">
      <div className="c-comment__thumbnail">
        <img src={snippet.authorProfileImageUrl} alt={snippet.authorDisplayName} />
      </div>
      <div className="c-comment__text">
        <div className="c-comment__author">
          <Link to={`channel/${snippet.authorChannelId.value}`}>{snippet.authorDisplayName}</Link>
        </div>
        <div className="c-comment__date">{snippet.publishedAt}</div>
        <p className="c-comment">{snippet.textOriginal}</p>
      </div>
    </div>
  )
 };
