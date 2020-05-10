import React, { FC, useState } from "react";

import { ICommentThread, IPageInfo } from "shared/interfaces/youtube.interface";
import { getCommentThreadsForVideo } from "apis/youtube.api";
import { Loader } from "components/loader.component";
import { Thread } from "components/thread.component";

interface IProps {
  numComments: string;
  videoId: string;
}

export const ThreadList: FC<IProps> = ({ numComments, videoId }) => {
  const [threads, setThreads] = useState<ICommentThread[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [pageInfo, setPageInfo] = useState<IPageInfo>();
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function loadCommentThreads() {
    setIsLoading(true);
    const res = await getCommentThreadsForVideo(videoId, pageInfo, nextPageToken);
    setIsLoading(false);

    if (res.nextPageToken) {
      setNextPageToken(res.nextPageToken);
    } else {
      setHasMoreComments(false);
    }

    const updatedThreads = threads.concat(res.items);
    setThreads(updatedThreads);
    setPageInfo(res.pageInfo);
  }

  function renderThreads() {
    return threads.map(t => <Thread key={t.id} thread={t} />);
  }

  function renderLoadCommentsButton() {
    if (isLoading) {
      return <Loader position="centered" />;
    }

    const loadMoreText = threads.length <= 0
      ? `LOAD COMMENTS`
      : `LOAD MORE COMMENTS`;

    if (hasMoreComments) {
      return <div className="c-link-text c-link-text--bold" onClick={loadCommentThreads}>{loadMoreText}</div>
    }
  }

  return (
    <div className="o-list c-thread__list">
      { threads.length > 0 && <h2 className="c-comments__total">{numComments} Comments</h2> }
      { renderThreads() }
      { renderLoadCommentsButton() }
    </div>
  );
};
