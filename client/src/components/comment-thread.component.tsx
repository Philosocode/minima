import React, { FC } from "react";

import { ICommentThread } from "shared/interfaces/youtube.interface";
import { Comment } from "components/comment.component";
import { ReplyList } from "components/reply-list.component";

interface IProps {
  thread: ICommentThread;
}

export const CommentThread: FC<IProps> = ({ thread }) => {
  const { topLevelComment, totalReplyCount } = thread.snippet;

  return (
    <div className="o-container u-margin-bottom--large">
      <Comment comment={topLevelComment} type="comment" />
      {totalReplyCount > 0 && (
        <ReplyList
          topLevelCommentId={topLevelComment.id}
          totalReplyCount={totalReplyCount}
        />
      )}
    </div>
  );
};
