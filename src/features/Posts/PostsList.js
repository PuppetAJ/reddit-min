import React from "react";
import Post from "./Post";

function PostsList({ postsData }) {
  const postsArr = postsData.data ? postsData.data.children : null;
  // console.log(postsData);

  return (
    <div>
      {/* <h2>Posts</h2> */}
      <ul>
        {postsArr &&
          postsArr.map((post, i) => (
            <Post key={post.data.id} post={post} i={i} />
          ))}
      </ul>
    </div>
  );
}

export default PostsList;
