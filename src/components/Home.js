import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, selectAllPosts } from "../features/Posts/postsSlice";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    dispatch(fetchAllPosts());
    console.log(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const fetchAll = async () => {
  //   const data = await fetch("https://www.reddit.com/r/all/top.json");
  //   console.log(await data.json());
  // };

  return <h1>Home</h1>;
}

export default Home;
