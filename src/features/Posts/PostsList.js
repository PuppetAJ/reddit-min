import React from "react";
import Post from "./Post";
import { selectPosts } from "./postsSlice";
import { useAppSelector } from "../../app/hooks";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";

function PostsList({ postsData }) {
  const postsObj = useAppSelector(selectPosts);
  let postsArr = null;
  if (postsData) {
    postsArr = postsData.data ? postsData.data.children : null;
  }

  let skeletonArr = [];
  for (let i = 0; i < 20; i++) {
    skeletonArr.push(<PostSkeleton />);
  }

  return (
    <div className="post-list">
      {postsData && !postsObj.loading && (
        <ul className="post-list-list">
          {postsArr &&
            postsArr.map((post, i) => (
              <Post key={post.data.id} post={post} i={i} />
            ))}
        </ul>
      )}
      {postsObj.loading && (
        <ul className="post-list-list">
          {skeletonArr.map((skeleton, i) => (
            <li key={i} className="post-wrapper">
              {skeleton}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsList;
