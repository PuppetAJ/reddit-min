import React, { useEffect } from "react";
import SubredditsList from "../../features/SubredditsList/SubredditsList";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllSubreddits,
  fetchSubreddits,
} from "../../features/SubredditsList/subredditsListSlice";

function Sidebar({ setCurrentSub }) {
  const subreddits = useAppSelector(selectAllSubreddits);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSubreddits());
    // setTimeout(() => {
    //   console.log(subreddits);
    // }, 1000);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sidebar-container" style={{ fontFamily: "Quicksand" }}>
      <h3 className="sidebar-header">TOP SUBREDDITS</h3>
      <SubredditsList
        subredditsData={subreddits}
        setCurrentSub={setCurrentSub}
      />
      <hr className="sidebar-bottom-div" />
      <button className="sidebar-load-button">Load More</button>
    </div>
  );
}

export default Sidebar;
