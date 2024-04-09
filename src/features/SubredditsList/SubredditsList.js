import React from "react";

function SubredditsList({ subredditsData, setCurrentSub }) {
  console.log(subredditsData);
  const subredditsArr = subredditsData.data
    ? subredditsData.data.children
    : null;
  return (
    <div>
      <h2>test</h2>
      <ul>
        {subredditsArr &&
          subredditsArr.map((subreddit) => (
            <li key={subreddit.data.id}>
              <div className="subreddit-content">
                <p
                  className={`${subreddit.data.display_name}`}
                  value={subreddit.data.display_name}
                  onClick={(e) => {
                    if (e.target.textContent === undefined) return;
                    // if (e.target.classList[0] === "Home") {
                    //   setCurrentSub("all");
                    //   return;
                    // }
                    setCurrentSub(e.target.classList[0]);
                  }}
                >
                  {subreddit.data.display_name}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SubredditsList;
