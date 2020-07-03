import React, { FC } from "react";

import { ICommentThread } from "shared/interfaces/youtube.interfaces";
import { getVideoCommentThreads } from "apis/youtube.api";
import { Loader } from "components/loader.component";
import { Thread } from "components/thread.component";
import { addCommasToNumber } from "shared/helpers";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";

interface IProps {
  numComments: string;
  videoId: string;
}

export const ThreadList: FC<IProps> = ({ numComments, videoId }) => {
  const {
    hasMore: hasMoreComments,
    isLoading,
    items: threads,
    loadResources: loadCommentThreads
  } = useFetchPaginatedResource<ICommentThread>(getVideoCommentThreads, videoId);

  function renderThreads() {
    return threads.map(t => <Thread key={t.id} thread={t} />);
  }

  function renderLoadCommentsButton() {
    if (isLoading) {
      return <Loader position="center-horizontal" />;
    }

    const loadMoreText = threads.length <= 0
      ? `LOAD COMMENTS`
      : `LOAD MORE`;

    return <button className="c-button c-button--centered c-thread__button" onClick={loadCommentThreads}>{loadMoreText}</button>
  }

  return (
    <div className="o-list">
      { threads.length > 0 && <h2 className="c-comment__total">{addCommasToNumber(numComments)} Comments</h2> }
      { renderThreads() }
      { hasMoreComments && renderLoadCommentsButton() }
    </div>
  );
};
