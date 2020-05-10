import React, { FC, useState } from "react";

import { ICommentThread, IPageInfo } from "shared/interfaces/youtube.interface";
import { getCommentThreadsForVideo } from "apis/youtube.api";
import { Loader } from "components/loader.component";
import { Thread } from "components/thread.component";
import { addCommasToNumber } from "shared/helpers";

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
    try {
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
    catch(err) {
      console.log("ERROR:", err);
    }
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

    return <div className="c-link-text c-link-text--centered" onClick={loadCommentThreads}>{loadMoreText}</div>
  }

  return (
    <div className="o-list">
      { threads.length > 0 && <h2 className="c-comment__total">{addCommasToNumber(numComments)} Comments</h2> }
      { renderThreads() }
      { hasMoreComments && renderLoadCommentsButton() }
    </div>
  );
};
