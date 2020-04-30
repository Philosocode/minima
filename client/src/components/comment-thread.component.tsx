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

  async function loadReplies() {
    if (replies.length < totalReplyCount) {
      try {
        const res = await getRepliesForCommentThread(thread.id);
  
        // Comments are from newest to oldest, but for replies, we want oldest to newest
        const newComments = res.items.reverse();
  
        setReplies(replies.concat(newComments));
      }
      catch (err) {
        console.log("ERROR:", err);
      }
    }

    toggleShowReplies();
  }

  function renderReplies() {
    return (
      <div className="c-reply__list">
        { renderReplyToggle() }
        { showReplies && replies.map(c => <Comment key={c.id} comment={c} type="reply" />) }
      </div>
    );
  }

  function renderReplyToggle() {
    if (showReplies)
      return <div className="c-video__show-toggle" onClick={toggleShowReplies}>↑ Hide Replies</div>
    else
      return <div className="c-video__show-toggle" onClick={loadReplies}>↓ Show {totalReplyCount} Replies</div>;
  }

  return (
    <div className="c-comment__thread">
      <Comment comment={topLevelComment} type="comment" />
      { renderReplies() }
    </div>
  )
 };
