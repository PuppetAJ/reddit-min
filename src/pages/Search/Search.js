import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchSearchResults,
  fetchMoreSearchResults,
  selectSearchResults,
  selectSearchResultsLoading,
  selectSearchResultsLoadingMore,
} from "../../features/SearchResults/searchResultsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ThreadPostCard from "../../features/Posts/ThreadPostCard";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
import { Skeleton } from "@mui/material";

function Search() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectSearchResultsLoading);
  const loadingMore = useAppSelector(selectSearchResultsLoadingMore);
  useEffect(() => {
    dispatch(fetchSearchResults({ q: searchParams.get("q") }));
    // eslint-disable-next-line
  }, [searchParams]);

  let skeletonArr = [];
  for (let i = 0; i < 20; i++) {
    skeletonArr.push(<PostSkeleton wide={true} key={i} />);
  }
  console.log(searchResults);

  let postsArr = null;
  if (searchResults) {
    postsArr = searchResults.data ? searchResults.data.children : null;
  }

  const handleLoadMore = () => {
    dispatch(
      fetchMoreSearchResults({
        q: searchParams.get("q"),
        after: searchResults.data.after,
      })
    );
  };

  return (
    <div className="subreddit-posts-container">
      <div className="search-results-wrapper">
        {loading && (
          <Skeleton
            sx={{ marginTop: "0.5rem" }}
            variant="text"
            width={"18.75rem"}
            height={"3.875rem"}
          />
        )}
        {Object.keys(searchResults).length !== 0 && (
          <>
            {!loading && (
              <h1 style={{ wordBreak: "break-word", textAlign: "center" }}>
                Search results for: {searchParams.get("q")}
              </h1>
            )}
            {!loading && (
              <div className="">
                {searchResults && (
                  <ul className="post-list-list">
                    {postsArr &&
                      postsArr.map((post, i) => (
                        <li className="search-result-li" key={post.data.id}>
                          <ThreadPostCard post={post} i={i} click={true} />
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
        {Object.keys(searchResults).length !== 0 &&
          searchResults.data.children.length === 0 &&
          !loading && <h1>No results found!</h1>}
        {/* {!searchResults && !loading && <h1>No results found</h1>} */}
        {(loading || loadingMore) && (
          <>
            <ul className="post-list-list">
              {skeletonArr.map((skeleton, i) => (
                <li key={i} className="search-result-li">
                  {skeleton}
                </li>
              ))}
            </ul>
          </>
        )}
        {searchResults.data && searchResults.data.after && (
          <button onClick={handleLoadMore} className="load-posts-button">
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
