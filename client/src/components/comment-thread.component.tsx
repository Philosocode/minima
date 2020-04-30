import React, { FC, useState } from "react";

import { ICommentThread, IComment, getRepliesForCommentThread } from "apis/youtube.api";
import { Comment } from "components/comment.component";
import { useToggle } from "hooks/use-toggle.hook";

interface IProps {
  thread: ICommentThread;
}

export const CommentThread: FC<IProps> = ({ thread }) => { 
  const [showReplies, toggleShowReplies] = useToggle(false);
  const [replies, setReplies] = useState<IComment[]>([]);

  const { topLevelComment, totalReplyCount } = thread.snippet;

  function renderReplies() {
    if (totalReplyCount <= 0) return;

    return (
      <div className="c-reply__list">
        <div className="c-video__show-toggle" onClick={loadReplies}>
          {showReplies ? "↑ Hide Replies" : `↓ Show ${totalReplyCount} Replies`}
        </div>
        {
          showReplies && replies.map(c => <Comment key={c.id} comment={c} type="reply" />)
        }
      </div>
    );
  }

  function loadReplies() {
    getRepliesForCommentThread(thread.id)
      .then(res => {
        // Comments are from newest to oldest, but for replies, we want oldest to newest
        const newComments = res.items.reverse();
        setReplies(replies.concat(newComments));
        toggleShowReplies();
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="c-comment__thread">
      <Comment comment={topLevelComment} type="comment" />
      { renderReplies() }
    </div>
  )
 };
