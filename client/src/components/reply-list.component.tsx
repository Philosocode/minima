import React, { FC, useState } from "react";

import { IComment, getRepliesForCommentThread } from "apis/youtube.api";
import { Comment } from "components/comment.component";
import { useToggle } from "hooks/use-toggle.hook";

interface IProps {
  topLevelCommentId: string;
  totalReplyCount: number;
}

export const ReplyList: FC<IProps> = ({ topLevelCommentId, totalReplyCount }) => { 
  const [showingReplies, toggleShowingReplies] = useToggle(false);
  const [replies, setReplies] = useState<IComment[]>([]);
  const [hasReplies, setHasReplies] = useState(true);

  async function loadReplies() {
    if (replies.length < totalReplyCount) {
      try {
        const res = await getRepliesForCommentThread(topLevelCommentId);
  
        // Comments are from newest to oldest, but for replies, we want oldest to newest
        const newComments = res.items.reverse();
  
        setReplies(replies.concat(newComments));
      }
      catch (err) {
        console.log("ERROR:", err);
      }
    }

    toggleShowingReplies();
  }

  function renderReplyToggle() {
    let functionToCall: typeof toggleShowingReplies | typeof loadReplies;
    let text: string;

    if (showingReplies) {
      functionToCall = toggleShowingReplies;
      text = "↑ Hide Replies";
    }
    else {
      functionToCall = loadReplies;
      text = `↓ Show ${totalReplyCount} Replies`;
    }
    
    return <div className="c-video__show-toggle" onClick={functionToCall}>{text}</div>;
  }

  return (
    <div className="c-reply__list">
      { renderReplyToggle() }
      { showingReplies && replies.map(c => <Comment key={c.id} comment={c} type="reply" />) }
    </div>
  )
 };
