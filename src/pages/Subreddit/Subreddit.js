import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPosts,
  fetchMorePosts,
  selectAllPosts,
  selectPostsError,
  selectPostsLoading,
} from "../../features/Posts/postsSlice";
import PostsList from "../../features/Posts/PostsList";
import SubredditInfo from "../../features/SubredditInfo/SubredditInfo";
import SubredditHeader from "../../components/SubredditHeader/SubredditHeader";
import {
  selectSubredditInfo,
  fetchSubredditInfo,
  selectSubredditInfoError,
  selectSubredditInfoLoading,
} from "../../features/SubredditInfo/subredditInfoSlice";
import { useParams, useNavigate } from "react-router-dom";

function Subreddit({ currentSub, currentMode, setCurrentSub }) {
  const postsLoading = useAppSelector(selectPostsLoading);
  const subredditInfoLoading = useAppSelector(selectSubredditInfoLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const postsError = useAppSelector(selectPostsError);
  const subredditInfoError = useAppSelector(selectSubredditInfoError);
  const posts = useAppSelector(selectAllPosts);
  const subredditInfo = useAppSelector(selectSubredditInfo);
  const { subreddit } = useParams();
  const [showFeed, setShowFeed] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    // console.log("currentSub: " + currentSub);
    // console.log("subreddit: " + subreddit);
    async function fetchData() {
      // console.log(
      //   "fetching data with sub: " + currentSub + " and mode: " + currentMode
      // );
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

    if (currentSub === subreddit) {
      // console.log(currentSub);
      fetchData();
    }

    if (!subreddit && currentSub === "all") {
      // console.log("subreddit: " + subreddit);
      // console.log("currentSub: " + currentSub);
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

  useEffect(() => {
    // this sucks should reimplement this with a better solution
    if (posts === undefined || subredditInfo === undefined) {
      setTimeout(() => {
        if (
          !postsLoading &&
          !subredditInfoLoading &&
          !posts &&
          !subredditInfo
        ) {
          console.log("redirecting");
          navigate("/r/all");
        }
      }, 500);
    }
  }, [posts, navigate, subredditInfo, postsLoading, subredditInfoLoading]);

  // console.log(postsError);

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

  // console.log(posts);

  return (
    <div className="subreddit-posts-container">
      <SubredditHeader
        subredditInfo={subredditInfo}
        currentSub={currentSub}
        setShowFeed={setShowFeed}
        setShowInfo={setShowInfo}
      />
      {/* Not mobile */}
      <div className="desktop-posts-content subreddit-posts-content">
        {/* <div style={{ marginLeft: "6rem" }}> */}
        <div
          className="post-list-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
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
        <div id="sub-info-default">
          {/* <div style={{ marginRight: "6rem" }}> */}
          <SubredditInfo
            subredditInfo={subredditInfo}
            currentSub={currentSub}
          />
          {/* </div> */}
        </div>
      </div>
      {/* Mobile */}
      <div className="mobile-posts-content subreddit-posts-content">
        {/* <div style={{ marginLeft: "6rem" }}> */}
        {showFeed && (
          <div
            className="post-list-container"
            style={{ display: "flex", flexDirection: "column" }}
          >
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
        )}
        {/* </div> */}
        {showInfo && (
          <div>
            {/* <div style={{ marginRight: "6rem" }}> */}
            <SubredditInfo
              subredditInfo={subredditInfo}
              currentSub={currentSub}
            />
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Subreddit;
