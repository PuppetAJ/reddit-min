import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPosts,
  fetchMorePosts,
  selectAllPosts,
  selectPostsError,
} from "../../features/Posts/postsSlice";
import PostsList from "../../features/Posts/PostsList";
import SubredditInfo from "../../features/SubredditInfo/SubredditInfo";
import SubredditHeader from "../../components/SubredditHeader/SubredditHeader";
import {
  selectSubredditInfo,
  fetchSubredditInfo,
  selectSubredditInfoError,
} from "../../features/SubredditInfo/subredditInfoSlice";
import { useParams, useNavigate } from "react-router-dom";

function Subreddit({ currentSub, currentMode, setCurrentSub }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const postsError = useAppSelector(selectPostsError);
  const subredditInfoError = useAppSelector(selectSubredditInfoError);
  const posts = useAppSelector(selectAllPosts);
  const subredditInfo = useAppSelector(selectSubredditInfo);
  const { subreddit } = useParams();
  useEffect(() => {
    async function fetchData() {
      dispatch(fetchPosts({ sub: currentSub, mode: currentMode }));
      dispatch(fetchSubredditInfo({ sub: currentSub }));
    }

    if (!subreddit || !currentSub) {
      setCurrentSub("all");
    }

    if (subreddit) {
      setCurrentSub(subreddit);
    }

    // console.log(currentSub);
    // console.log(subreddit);

    if (currentSub === subreddit || currentSub === "all") {
      fetchData();
    }

    // eslint-disable-next-line
  }, [currentMode, subreddit, currentSub]);

  useEffect(() => {
    if (posts && posts.error) {
      navigate("/r/all");
      setCurrentSub("all");
      return;
    }

    if (subredditInfo && subredditInfo.error) {
      navigate("/r/all");
      setCurrentSub("all");
      return;
    }
    // eslint-disable-next-line
  }, [posts, subredditInfo]);

  if (postsError || subredditInfoError) {
    navigate("/r/all");
    setCurrentSub("all");
    return null;
  }

  const handleLoadMore = () => {
    dispatch(
      fetchMorePosts({
        sub: currentSub,
        mode: currentMode,
        after: posts.data.after,
      })
    );
  };

  return (
    <div className="subreddit-posts-container">
      <SubredditHeader subredditInfo={subredditInfo} currentSub={currentSub} />
      <div className="subreddit-posts-content">
        {/* <div style={{ marginLeft: "6rem" }}> */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PostsList postsData={posts} />
          {posts && posts.data && (
            <button
              className="load-posts-button"
              disabled={posts.data.after ? false : true}
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
        </div>
        {/* </div> */}
        <div>
          {/* <div style={{ marginRight: "6rem" }}> */}
          <SubredditInfo
            subredditInfo={subredditInfo}
            currentSub={currentSub}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Subreddit;
