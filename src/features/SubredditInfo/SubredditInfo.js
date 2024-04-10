import React from "react";
import { markdownToHtml } from "../../helpers/markdownParser";
import shortNumber from "short-number";

function SubredditInfo({ subredditInfo, currentSub }) {
  console.log(currentSub);
  console.log(subredditInfo);
  let subredditDate, subredditDateFormat, parsedDesc;
  if (subredditInfo && currentSub !== "all") {
    subredditDate = subredditInfo
      ? new Date(subredditInfo.data.created_utc * 1000).toLocaleString()
      : null;
    subredditDateFormat = subredditDate.split(",")[0];
    parsedDesc = subredditInfo
      ? markdownToHtml(subredditInfo.data.description)
      : null;
  }
  return (
    <div className="subreddit-info" style={{ fontFamily: "Quicksand" }}>
      {currentSub !== "all" && subredditInfo && (
        <div>
          <div className="subreddit-container">
            <h2>About Community</h2>
            <p>{subredditInfo.data.public_description}</p>
            <div>
              <p>
                <strong>Subscribers:</strong>{" "}
                {shortNumber(subredditInfo.data.subscribers)}
              </p>
              <p>
                <strong>Active Users:</strong>{" "}
                {shortNumber(subredditInfo.data.accounts_active)}
              </p>
              <p>
                <strong>Community Created:</strong> {subredditDateFormat}
              </p>
            </div>
          </div>
          <div className="subreddit-container">
            <h2>Description</h2>
            <div
              className="subreddit-description"
              dangerouslySetInnerHTML={{ __html: parsedDesc }}
            ></div>
          </div>
        </div>
      )}
      {currentSub === "all" && (
        <>
          <div className="subreddit-container">
            <h2>Welcome to Reddit Minimal!</h2>
            <p>
              This reddit client was made by PuppetAJ, feel free to look at the
              source code on his github{" "}
              <a
                href="https://github.com/PuppetAJ/reddit-min"
                target="_blank"
                rel="noreferrer"
              >
                here:
              </a>
            </p>
          </div>
          <div className="subreddit-container">
            <h2>About Community</h2>
            <p>
              Right now you're viewing r/all! This is a place where you can see
              all the posts from all the subreddits on Reddit. This subreddit
              doesn't have an about section, so I created this one for you.
              Enjoy!
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default SubredditInfo;
