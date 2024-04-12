import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectAllPosts } from "../../features/Posts/postsSlice";
import PostsList from "../../features/Posts/PostsList";
import SubredditInfo from "../../features/SubredditInfo/SubredditInfo";
import SubredditHeader from "../../components/SubredditHeader/SubredditHeader";
import {
  selectSubredditInfo,
  fetchSubredditInfo,
} from "../../features/SubredditInfo/subredditInfoSlice";
import { useParams } from "react-router-dom";

function Subreddit({ currentSub, currentMode, setCurrentSub }) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const subredditInfo = useAppSelector(selectSubredditInfo);
  const { subreddit } = useParams();
  useEffect(() => {
    // const searchPath = window.location.pathname;
    // console.log(searchParams);

    if (subreddit) {
      dispatch(fetchPosts({ sub: subreddit, mode: currentMode }));
      dispatch(fetchSubredditInfo({ sub: subreddit }));
      setCurrentSub(subreddit);
      return;
    }

    if (!subreddit || !currentSub) {
      setCurrentSub("all");
    }

    dispatch(fetchPosts({ sub: currentSub, mode: currentMode }));
    dispatch(fetchSubredditInfo({ sub: currentSub }));

    // eslint-disable-next-line
  }, [currentMode, subreddit, currentSub]);

  // useEffect(() => {

  // }, [subreddit])

  return (
    <div className="subreddit-posts-container">
      <SubredditHeader subredditInfo={subredditInfo} currentSub={currentSub} />
      <div className="subreddit-posts-content">
        <PostsList postsData={posts} />
        <SubredditInfo subredditInfo={subredditInfo} currentSub={currentSub} />
      </div>
    </div>
  );
}

export default Subreddit;
