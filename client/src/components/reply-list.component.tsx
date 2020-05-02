import React, { FC, useState } from "react";

import { IComment, getRepliesForCommentThread } from "apis/youtube.api";
import { Comment } from "components/comment.component";
import { useToggle } from "hooks/use-toggle.hook";
import { Loader } from "./loader.component";

interface IProps {
  topLevelCommentId: string;
  totalReplyCount: number;
}

export const ReplyList: FC<IProps> = ({ topLevelCommentId, totalReplyCount }) => { 
  const [replies, setReplies] = useState<IComment[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [showingReplies, toggleShowingReplies] = useToggle(false);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleShowReplies() {
    loadReplies();
    toggleShowingReplies();
  }

  async function loadReplies() {
    if (hasMoreReplies) {
      try {
        setIsLoading(true);
        const res = await getRepliesForCommentThread(topLevelCommentId, nextPageToken);
        setIsLoading(false);

        // A nextPageToken means there are more replies to load
        if (res.nextPageToken) {
          setNextPageToken(res.nextPageToken);
        } else {
          setHasMoreReplies(false);
        }
  
        // Comments are from newest to oldest, but for replies, we want oldest to newest
        const newComments = res.items.reverse();
  
        setReplies(replies.concat(newComments));
      }
      catch (err) {
        console.log("ERROR:", err);
      }
    }
  }

  function renderReplyToggle() {
    let functionToCall: () => void;
    let text: string;

    if (showingReplies) {
      functionToCall = toggleShowingReplies;
      text = "↑ Hide Replies";
    }
    else {
      functionToCall = handleShowReplies;
      text = `↓ Show ${totalReplyCount} Replies`;
    }
    
    return <div className="c-link-text c-link-text--bold" onClick={functionToCall}>{text}</div>;
  }

  function renderShowMoreReplies() {
    if (isLoading)
      return <Loader position="left" />;

    if (showingReplies && hasMoreReplies)
      return <div className="c-link-text c-link-text--bold" onClick={loadReplies}>Show More</div>;
  }

  return (
    <div className="c-reply__list">
      { renderReplyToggle() }
      { showingReplies && replies.map(c => <Comment key={c.id} comment={c} type="reply" />) }
      { renderShowMoreReplies() }
    </div>
  )
 };
