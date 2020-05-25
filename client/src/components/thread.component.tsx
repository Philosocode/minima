import React, { FC } from "react";

import { ICommentThread } from "shared/interfaces/youtube.interface";
import { Comment } from "components/comment.component";
import { ReplyList } from "components/reply-list.component";

interface IProps {
  thread: ICommentThread;
  uploaderId: string;
}

export const Thread: FC<IProps> = ({ thread, uploaderId }) => {
  const { topLevelComment, totalReplyCount } = thread.snippet;
  
  return (
    <div className="o-container c-thread__container">
      <Comment comment={topLevelComment} type="comment" isUploader={topLevelComment.snippet.authorChannelId.value === uploaderId} />

      {totalReplyCount > 0 && (
        <ReplyList
          topLevelCommentId={topLevelComment.id}
          totalReplyCount={totalReplyCount}
          uploaderId={uploaderId}
        />
      )}
    </div>
  );
};
