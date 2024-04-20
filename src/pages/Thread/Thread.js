import React, { useEffect } from "react";
import {
  selectPost,
  fetchPost,
  selectPostsLoading,
  selectPostsError,
} from "../../features/Posts/postsSlice";
import { fetchSubredditInfo } from "../../features/SubredditInfo/subredditInfoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import ThreadPostCard from "../../features/Posts/ThreadPostCard";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
import Comments from "../../components/Comments/Comments";
import CommentSkeleton from "../../components/CommentSkeleton/CommentSkeleton";
import { useNavigate } from "react-router-dom";

function Thread({ currentSub, setCurrentSub }) {
  const navigate = useNavigate();
  const error = useAppSelector(selectPostsError);
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectPostsLoading);
  const { subreddit, id, slug } = useParams();

  useEffect(() => {
    const endpoint = `https://www.reddit.com/r/${subreddit}/comments/${id}/${slug}/.json?raw_json=1`;

    async function fetchData() {
      await setCurrentSub(subreddit);
      if (currentSub !== "all") {
        dispatch(fetchPost(endpoint));
        dispatch(fetchSubredditInfo({ sub: currentSub }));
      }
    }

    fetchData();

    // eslint-disable-next-line
  }, [subreddit, id, slug, currentSub]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    navigate("/r/all");
    return null;
  }

  const navigateBack = () => {
    navigate(-1);
  };

  // console.log(post[0]);
  // console.log(post);

  return (
    <div
      className="subreddit-posts-container"
      style={{ fontFamily: "Quicksand" }}
    >
      <div className="thread-wrapper">
        {post && Object.keys(post).length !== 0 && !loading && post[0].data && (
          <ThreadPostCard post={post[0]?.data.children[0]} />
        )}

        {loading && (
          <>
            <PostSkeleton wide={true} />
          </>
        )}
        <div className="thread-comments">
          {!loading && (
            <>
              <div className="comments-head">
                <h1>Comments</h1>
                <button onClick={navigateBack}>Back</button>
              </div>
              {post[1]?.data.children.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center ",
                  }}
                >
                  <h2>No comments found</h2>
                </div>
              )}
              <Comments comments={post[1]?.data.children} />
            </>
          )}
          {loading && (
            <>
              <div className="comments-head">
                <h1>Comments</h1>
                <button onClick={null}>Back</button>
              </div>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Thread;
