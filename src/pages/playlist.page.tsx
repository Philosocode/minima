import React, { FC, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { getQueryParams } from "shared/helpers";
import { ECustomPlaylistTypes } from "shared/interfaces/custom.interfaces";
import { setPlaylistId, selectPlaylistId, selectIsFetching, selectCurrentPlaylist, fetchCurrentPlaylistStart } from "redux/playlist";
import { Divider } from "components/divider/divider.component";
import { Loader } from "components/loader/loader.component";
import { PlaylistDetails } from "components/playlist/playlist-details.component";
import { PlaylistVideosThumbnailGrid } from "components/thumbnail-grid/playlist-videos-thumbnail-grid.component";

export const PlaylistPage: FC = () => {
  // State
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const playlistId = useSelector(selectPlaylistId);
  const isFetching = useSelector(selectIsFetching);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  
  // Functions
  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const playlistQueryParam = queryParams.query["list"];

    if (typeof playlistQueryParam === "string") {
      if (playlistQueryParam === ECustomPlaylistTypes.MUSIC) {
        history.push("/music");
      }
      else {
        dispatch(setPlaylistId(playlistQueryParam));
      }
    }
  }, [dispatch, history, location.search]);

  useEffect(() => {
    if (!playlistId) return;
    dispatch(fetchCurrentPlaylistStart());

  }, [dispatch, playlistId])

  useEffect(() => {
    if (!currentPlaylist) return;
    document.title = currentPlaylist.snippet.title;
  }, [currentPlaylist]);

  // Render
  if (isFetching || !currentPlaylist) return <Loader position="center-page" />;

  return (
    <div className="o-page o-grid">
      <div className="o-grid__item--center">
        <PlaylistDetails playlist={currentPlaylist} />
        <Divider />
      </div>

      <div className="o-grid__item--wide">
        <PlaylistVideosThumbnailGrid playlistId={currentPlaylist.id} />
      </div>
    </div>
  )
}
