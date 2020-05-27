import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { IComment } from "shared/interfaces/youtube.interface";
import { getFormattedDateFromToday } from "shared/helpers";
import { selectCurrentVideo } from "redux/video";

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

  const currentVideo = useSelector(selectCurrentVideo);
  const channelUrl = `channel/${authorChannelId.value}`;
  const formattedDate = getFormattedDateFromToday(publishedAt);

  useEffect(() => {
  }, []);

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

    const commentAuthorId = comment.snippet.authorChannelId.value;
    const uploaderId = currentVideo?.snippet.channelId;

    if (commentAuthorId === uploaderId) {
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