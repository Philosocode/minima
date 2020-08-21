import React, { FC } from "react";

import { ICommentThread } from "shared/interfaces/youtube.interfaces";
import { getVideoCommentThreads } from "services/youtube.service";
import { Loader } from "components/loader.component";
import { Thread } from "components/thread.component";
import { addCommasToNumber } from "shared/helpers";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";
import { Button } from "./button/button.component";

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

  function renderLoadCommentsButton() {
    if (isLoading) return <Loader position="center-horizontal" />;

    const loadMoreText = threads.length <= 0
      ? `LOAD COMMENTS`
      : `LOAD MORE`;

    return (
      <Button
        centered
        onClick={loadCommentThreads}
      >{loadMoreText}</Button>
    )
  }

  return (
    <div>
      { threads.length > 0 && <h2 className="c-heading c-heading--subsubtitle c-heading--spaced">{addCommasToNumber(numComments)} Comments</h2> }
      {
        threads.map(t => <Thread key={t.id} thread={t} />)
      }
      { hasMoreComments && renderLoadCommentsButton() }
    </div>
  );
};
