import React, { FC } from "react";

import { IComment } from "shared/interfaces/youtube.interfaces";
import { getCommentThreadReplies } from "services/youtube.service";
import { Comment } from "components/comment.component";
import { useToggle } from "hooks/use-toggle.hook";
import { Loader } from "./loader.component";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";

interface IProps {
  topLevelCommentId: string;
  totalReplyCount: number;
}

export const ReplyList: FC<IProps> = ({ topLevelCommentId, totalReplyCount }) => { 
  const [showingReplies, toggleShowingReplies] = useToggle(false);

  const {
    hasMore: hasMoreReplies,
    isLoading,
    items: replies,
    loadResources: loadMoreReplies
  } = useFetchPaginatedResource<IComment>(getCommentThreadReplies, topLevelCommentId, true);


  function handleShowReplies() {
    loadMoreReplies();
    toggleShowingReplies();
  }

  function renderReplies() {
    return replies.map(c => <Comment key={c.id} comment={c} type="reply" />);
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
      text = (totalReplyCount === 1)
        ? `↓ Show Reply`
        : `↓ Show ${totalReplyCount} Replies`;
    }
    
    return <div className="c-link-text" onClick={functionToCall}>{text}</div>;
  }

  function renderShowMoreReplies() {
    if (isLoading) {
      return <Loader position="left" />;
    }
    if (showingReplies && hasMoreReplies) {
      return <div className="c-link-text" onClick={loadMoreReplies}>Load More Replies</div>;
    }
  }

  return (
    <div className="c-comment__list">
      { renderReplyToggle() }
      { showingReplies && renderReplies() }
      { hasMoreReplies && renderShowMoreReplies() }
    </div>
  )
 };