import React, { FC } from "react";

import { ICommentThread } from "shared/interfaces/youtube.interfaces";
import { Comment } from "components/comment/comment.component";
import { ReplyList } from "components/comment/reply-list.component";

interface IProps {
  thread: ICommentThread;
}
export const Thread: FC<IProps> = ({ thread }) => {
  const { topLevelComment, totalReplyCount } = thread.snippet;
  
  return (
    <div className="c-comment__thread">
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
