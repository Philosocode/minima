import React, { FC } from "react";

import { ICommentThread } from "apis/youtube.api";
import { Comment } from "components/comment.component";

interface IProps {
  thread: ICommentThread;
}

export const CommentThread: FC<IProps> = ({ thread }) => { 
  const { topLevelComment } = thread.snippet;

  return (
    <div className="c-comment__thread">
      <Comment comment={topLevelComment} />
    </div>
  )
 };
