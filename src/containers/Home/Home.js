import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectAllPosts } from "../../features/Posts/postsSlice";
import PostsList from "../../features/Posts/PostsList";

function Home() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);

  useEffect(() => {
    dispatch(fetchPosts({ sub: "all", mode: "hot" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <PostsList postsData={posts} />
    </div>
  );
}

export default Home;
