import React, { FC } from "react";

import { IComment } from "shared/interfaces/youtube.interfaces";
import { getCommentThreadReplies } from "services/youtube.service";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";
import { useToggle } from "hooks/use-toggle.hook";
import { Comment } from "components/comment/comment.component";
import { Loader } from "components/loader/loader.component";

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
  } = useFetchPaginatedResource<IComment>(getCommentThreadReplies, topLevelCommentId, { shouldReverseItems: true });

  function handleShowReplies() {
    loadMoreReplies();
    toggleShowingReplies();
  }

  function getReplies() {
    return replies.map(c => <Comment key={c.id} comment={c} type="reply" />);
  }

  function getReplyToggle() {
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
    
    return <div className="c-text--link c-comment__link" onClick={functionToCall}>{text}</div>;
  }

  function getShowMoreReplies() {
    if (isLoading) {
      return <Loader position="left" />;
    }
    if (showingReplies && hasMoreReplies) {
      return <div className="c-text--link c-comment__link" onClick={loadMoreReplies}>Load More Replies</div>;
    }
  }

  return (
    <div className="c-comment__replies">
      { getReplyToggle() }
      { showingReplies && getReplies() }
      { hasMoreReplies && getShowMoreReplies() }
    </div>
  )
 };