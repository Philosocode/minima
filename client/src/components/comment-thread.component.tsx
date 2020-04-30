import React, { FC, useState } from "react";

import { ICommentThread } from "apis/youtube.api";
import { Comment } from "components/comment.component";

interface IProps {
  thread: ICommentThread;
}

export const CommentThread: FC<IProps> = ({ thread }) => { 
  const [showReplies, setShowReplies] = useState(false);

  const { topLevelComment } = thread.snippet;

  function toggleShowReplies() {
    if (showReplies) setShowReplies(false);
    else setShowReplies(true);
  }

  function renderReplies() {
    if (!thread.replies) return;

    return (
      <div className="c-reply__list">
        <div className="c-video__show-toggle" onClick={toggleShowReplies}>
          {showReplies ? "Hide" : "Show"} Replies
        </div>
        {
          showReplies && thread.replies.comments.map(c => <Comment key={c.id} comment={c} type="reply" />)
        }
      </div>
    );
  }

  return (
    <div className="c-comment__thread">
      <Comment comment={topLevelComment} type="comment" />
      { renderReplies() }
    </div>
  )
 };
