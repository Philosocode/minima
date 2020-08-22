import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { IComment } from "shared/interfaces/youtube.interfaces";
import { getFormattedDateFromToday } from "shared/helpers";
import { selectCurrentVideo } from "redux/video";
import { HTMLTextContainer } from "../text/html-text-container.component";
import { linkifyText } from "shared/jsx-helpers";

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

  const containerClasses = classNames({
    "o-media c-comment": true,
    "c-comment--reply": type === "reply"
  });

  const channelImageClasses = classNames({
    "o-thumbnail c-channel__image": true,
    "c-channel__image--small": type === "reply"
  });
  

  function commentWasUpdated(): boolean {
    return updatedAt !== publishedAt;    
  }

  function getChannelNameClasses(): string {
    const commentAuthorId = comment.snippet.authorChannelId.value;
    const uploaderId = currentVideo?.snippet.channelId;

    const isUploader = (commentAuthorId === uploaderId);

    return classNames({
      "c-heading c-heading--small c-text--link": true,
      "c-comment__uploader": isUploader 
    });
  }

  return (
    <div className={containerClasses}>
      <Link to={channelUrl} className="o-media__image">
        <img className={channelImageClasses} src={authorProfileImageUrl} alt={authorDisplayName} />
      </Link>
      
      <div className="o-media__body">
        <Link className={getChannelNameClasses()} to={channelUrl}>{authorDisplayName}</Link>
        <div className="c-comment__date">{formattedDate} ago { commentWasUpdated() && "(edited)"}</div>
        <HTMLTextContainer textElement={linkifyText(textDisplay)} />
        <div>
          <FontAwesomeIcon className="c-icon" icon={faThumbsUp} /> 
          <span className="c-icon__text">{likeCount.toLocaleString()}</span>
        </div>
      </div>

    </div>
  );
};