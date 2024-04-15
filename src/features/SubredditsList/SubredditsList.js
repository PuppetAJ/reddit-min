import React from "react";
import { useNavigate } from "react-router-dom";
import { IoLogoReddit } from "react-icons/io5";
import { selectSubredditsListLoading } from "./subredditsListSlice";
import { useAppSelector } from "../../app/hooks";
import SubredditListSkeleton from "../../components/SubredditListSkeleton/SubredditListSkeleton";

function SubredditsList({ subredditsData, setCurrentSub }) {
  // console.log(subredditsData)
  const loading = useAppSelector(selectSubredditsListLoading);
  const navigate = useNavigate();
  let subredditsArr;
  if (subredditsData) {
    subredditsArr = subredditsData.data ? subredditsData.data.children : null;
  }

  const handleClick = (e) => {
    if (e.target.textContent === undefined) return;
    setCurrentSub(e.target.classList[0]);
    navigate("/r/" + e.target.classList[0]);
  };

  const subredditListSkeletons = [];

  for (let i = 0; i < 25; i++) {
    subredditListSkeletons.push(<SubredditListSkeleton key={i} />);
  }

  return (
    <div>
      <ul className="subreddits-list">
        {!loading &&
          subredditsArr &&
          subredditsArr.map((subreddit) => (
            <li key={subreddit.data.id}>
              <div className="subreddit-content">
                <IoLogoReddit className="subreddit-icon" />
                <p
                  className={`${subreddit.data.display_name}`}
                  value={subreddit.data.display_name}
                  onClick={handleClick}
                >
                  r/{subreddit.data.display_name}
                </p>
              </div>
            </li>
          ))}
        {loading &&
          subredditListSkeletons &&
          subredditListSkeletons.map((skeleton) => skeleton)}
      </ul>
    </div>
  );
}

export default SubredditsList;
