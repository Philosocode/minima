import React, { FC } from "react";

import { ICommentThread } from "shared/interfaces/youtube.interfaces";
import { addCommasToNumber } from "shared/helpers";
import { getVideoCommentThreads } from "services/youtube.service";
import { useFetchPaginatedResource } from "hooks/use-fetch-paginated-resource.hook";
import { Loader } from "components/loader/loader.component";
import { Thread } from "components/comment/thread.component";
import { Button } from "components/button/button.component";

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

  function getLoadCommentsButton() {
    if (isLoading) return <Loader position="center-horizontal" />;

    const loadMoreText = threads.length <= 0
      ? `LOAD COMMENTS`
      : `LOAD MORE`;

    return <Button centered onClick={loadCommentThreads}>{loadMoreText}</Button>;
  }

  return (
    <div>
      { threads.length > 0 && <h2 className="c-heading c-heading--subsubtitle c-text--spaced">{addCommasToNumber(numComments)} Comments</h2> }
      { threads.map(t => <Thread key={t.id} thread={t} />) }
      { hasMoreComments && getLoadCommentsButton() }
    </div>
  );
};
