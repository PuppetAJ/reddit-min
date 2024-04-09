import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectAllPosts } from "../../features/Posts/postsSlice";
import PostsList from "../../features/Posts/PostsList";
import SubredditInfo from "../../features/SubredditInfo/SubredditInfo";
import {
  selectSubredditInfo,
  fetchSubredditInfo,
} from "../../features/SubredditInfo/subredditInfoSlice";

function Home({ currentSub, currentMode }) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const subredditInfo = useAppSelector(selectSubredditInfo);

  useEffect(() => {
    dispatch(fetchPosts({ sub: currentSub, mode: currentMode }));
    dispatch(fetchSubredditInfo({ sub: currentSub }));

    // eslint-disable-next-line
  }, [currentSub, currentMode]);

  return (
    <div className="home-container">
      {/* <h1>Home</h1> */}
      <div className="home-content">
        <PostsList postsData={posts} />
        <SubredditInfo subredditInfo={subredditInfo} currentSub={currentSub} />
      </div>
    </div>
  );
}

export default Home;
