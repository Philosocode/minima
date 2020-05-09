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
  
  const channelUrl = `channel/${authorChannelId.value}`;
  const formattedPublishedAt = formatDistanceToNow(parseISO(updatedAt));

  let commentWasUpdated = false;
  if (updatedAt !== publishedAt) commentWasUpdated = true;

  function getChannelImageClasses() {
    let classes = "o-media__img c-channel__image";
    if (type === "reply") classes += "c-channel__image--small";

    return classes;
  }

  return (
    <div className="o-media c-comment__container">
      <Link to={channelUrl}>
        <img className={getChannelImageClasses()} src={authorProfileImageUrl} alt={authorDisplayName} />
      </Link>
      
      <div className="o-media__body">
        <Link className="c-channel__name" to={channelUrl}>{authorDisplayName}</Link>
        <span className="c-comment__date">{formattedPublishedAt} ago { commentWasUpdated && "(edited)"}</span>
        <p dangerouslySetInnerHTML={{__html: textDisplay}} className="c-comment__text"></p>
        <div className="c-comment__likes"><FontAwesomeIcon icon={faThumbsUp} className="c-icon" /> {likeCount.toLocaleString()}</div>
      </div>
    </div>
  );
};
