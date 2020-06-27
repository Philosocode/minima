import React, { FC } from "react";

import { ICommentThread } from "shared/interfaces/youtube.interfaces";
import { Comment } from "components/comment.component";
import { ReplyList } from "components/reply-list.component";

interface IProps {
  thread: ICommentThread;
}

export const Thread: FC<IProps> = ({ thread }) => {
  const { topLevelComment, totalReplyCount } = thread.snippet;
  
  return (
    <div className="o-container c-thread__container">
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
