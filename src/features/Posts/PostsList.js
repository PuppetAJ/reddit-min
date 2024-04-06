import React from "react";

function PostsList({ postsData }) {
  const postsArr = postsData.data ? postsData.data.children : null;
  // console.log(postsData);

  return (
    <div className="container">
      <h2>Posts</h2>
      <ul>
        {postsArr &&
          postsArr.map((post, i) => (
            <li key={post.data.id}>
              <div className="post-content">
                <h2>{i}</h2>
                <p>Title: {post.data.title}</p>
                <p>Author: {post.data.author}</p>
                {post.data.preview && !post.data.is_video && (
                  <img
                    className="image"
                    src={post.data.preview.images[0].source.url}
                    alt={"post preview."}
                  />
                )}
                {post.data.is_video && (
                  <video className="video" controls autoPlay muted>
                    <source
                      src={post.data.media.reddit_video.fallback_url}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PostsList;
