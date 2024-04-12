import React from "react";
import { useNavigate } from "react-router-dom";
import { IoLogoReddit } from "react-icons/io5";

function SubredditsList({ subredditsData, setCurrentSub }) {
  // console.log(subredditsData);
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

  return (
    <div>
      <ul className="subreddits-list">
        {subredditsArr &&
          subredditsArr.map((subreddit, i) => (
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
      </ul>
    </div>
  );
}

export default SubredditsList;
