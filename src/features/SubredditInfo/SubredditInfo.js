import React, { useState, useEffect } from "react";
import { markdownToHtml } from "../../helpers/markdownParser";
import shortNumber from "short-number";
import { selectSubredditInfoLoading } from "./subredditInfoSlice";
import { useAppSelector } from "../../app/hooks";
import SubInfoSkeleton from "../../components/SubInfoSkeleton/SubInfoSkeleton";

function SubredditInfo({ subredditInfo, currentSub }) {
  const [infoTruthy, setInfoTruthy] = useState(null);
  const loading = useAppSelector(selectSubredditInfoLoading);
  // console.log(loading);

  const [subredditDateFormat, setSubredditDateFormat] = useState(null);
  const [parsedDesc, setParsedDesc] = useState(null);

  useEffect(() => {
    if (subredditInfo && subredditInfo.message !== "Not Found") {
      setInfoTruthy(Object.keys(subredditInfo).length > 0);
    }
  }, [subredditInfo]);

  useEffect(() => {
    if (
      infoTruthy &&
      currentSub !== "all" &&
      subredditInfo &&
      !subredditInfo.error
    ) {
      setSubredditDateFormat(
        new Date(subredditInfo.data.created_utc * 1000)
          .toLocaleString()
          .split(",")[0]
      );
      setParsedDesc(markdownToHtml(subredditInfo.data.description));
    }
  }, [infoTruthy, currentSub, subredditInfo]);

  return (
    <>
      {infoTruthy &&
        subredditInfo &&
        !subredditInfo.error &&
        !loading &&
        currentSub !== "all" && (
          <div className="subreddit-info" style={{ fontFamily: "Quicksand" }}>
            {currentSub !== "all" && subredditInfo && (
              <div className="subreddit-info-wrapper">
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
          </div>
        )}
      {currentSub === "all" && !loading && (
        <div className="subreddit-info" style={{ fontFamily: "Quicksand" }}>
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
            <p>
              <strong>Note:</strong>
            </p>
            <p>
              Wondering where all the subreddit icons are? Due to API rate
              limiting I have decided to simply use a default placeholder icon
              for the time being. A workaround for this can be made by storing
              all icons encountered in local storage, however I don't believe
              that to be best practice.
            </p>
          </div>
        </div>
      )}
      {loading && <SubInfoSkeleton />}
    </>
  );
}

export default SubredditInfo;
