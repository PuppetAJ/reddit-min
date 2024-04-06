import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectAllPosts } from "../../features/Posts/postsSlice";
import {
  fetchSubreddits,
  selectAllSubreddits,
} from "../../features/Subreddits/subredditsSlice";
import PostsList from "../../features/Posts/PostsList";
import SubredditsList from "../../features/Subreddits/SubredditsList";

function Home() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const subreddits = useAppSelector(selectAllSubreddits);

  useEffect(() => {
    dispatch(fetchPosts({ sub: "all", mode: "hot" }));
    dispatch(fetchSubreddits());
    // eslint-disable-next-line
  }, []);

  // const asyncFetch = async () => {
  //   const data = await fetch("https://www.reddit.com/best/communities/1.json/");
  //   console.log(await data.json());
  // };

  setTimeout(() => {
    console.log(posts);
    console.log(subreddits);
  }, 1000);

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div>
        <PostsList postsData={posts} />
        <SubredditsList subredditsData={subreddits} />
      </div>
    </div>
  );
}

export default Home;
