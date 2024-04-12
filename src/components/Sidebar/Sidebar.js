import React, { useEffect } from "react";
import SubredditsList from "../../features/SubredditsList/SubredditsList";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllSubreddits,
  fetchSubreddits,
  fetchMoreSubreddits,
  selectPageCount,
  incrementPageCount,
  decrementPageCount,
} from "../../features/SubredditsList/subredditsListSlice";

function Sidebar({ setCurrentSub }) {
  const subreddits = useAppSelector(selectAllSubreddits);
  const dispatch = useAppDispatch();
  const pageCount = useAppSelector(selectPageCount);

  // console.log(subreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
    // eslint-disable-next-line
  }, []);

  const test = (e) => {
    // console.log("test");
    if (e.target.classList.contains("prev")) {
      // console.log("before Click: " + subreddits.data.before);
      dispatch(decrementPageCount());
      dispatch(
        fetchMoreSubreddits({
          nav: `before=${subreddits.data.before}`,
          count: pageCount,
        })
      );
    } else if (e.target.classList.contains("next")) {
      dispatch(incrementPageCount());
      dispatch(
        fetchMoreSubreddits({
          nav: `after=${subreddits.data.after}`,
          count: pageCount,
        })
      );
    }
  };

  return (
    <div className="sidebar-container" style={{ fontFamily: "Quicksand" }}>
      <h3 className="sidebar-header">TOP SUBREDDITS</h3>
      <SubredditsList
        subredditsData={subreddits}
        setCurrentSub={setCurrentSub}
      />
      <hr className="sidebar-bottom-div" />
      <div className="sub-list-pagination">
        {subreddits && subreddits.data && subreddits.data.before && (
          <button className="sidebar-load-button prev" onClick={test}>
            Prev
          </button>
        )}
        {subreddits && subreddits.data && subreddits.data.after && (
          <button className="sidebar-load-button next" onClick={test}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
