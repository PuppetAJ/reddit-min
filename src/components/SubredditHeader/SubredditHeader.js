import React from "react";
import { IoLogoReddit } from "react-icons/io5";
import { selectSubredditInfoLoading } from "../../features/SubredditInfo/subredditInfoSlice";
import { useAppSelector } from "../../app/hooks";
import { Skeleton } from "@mui/material";

function SubredditHeader({
  subredditInfo,
  currentSub,
  setShowFeed,
  setShowInfo,
}) {
  const loading = useAppSelector(selectSubredditInfoLoading);

  return (
    <>
      {subredditInfo &&
        subredditInfo.data &&
        subredditInfo.message !== "Not Found" &&
        !loading &&
        currentSub !== "all" && (
          <div className="subreddit-header">
            <div className="subreddit-banner-wrapper">
              {subredditInfo.data.banner_background_image && (
                <img
                  className="subreddit-header-banner"
                  src={subredditInfo.data.banner_background_image}
                  alt={currentSub}
                ></img>
              )}
              {!subredditInfo.data.banner_background_image && (
                <div className="subreddit-header-banner"></div>
              )}
              {subredditInfo.data.community_icon && (
                <div>
                  <img
                    className="subreddit-profile-pic"
                    src={subredditInfo.data.community_icon}
                    alt={currentSub}
                  />
                </div>
              )}
              {subredditInfo.data.icon_img &&
                !subredditInfo.data.community_icon && (
                  <div>
                    <img
                      className="subreddit-profile-pic"
                      src={subredditInfo.data.icon_img}
                      alt={currentSub}
                    />
                  </div>
                )}
              {!subredditInfo.data.community_icon &&
                !subredditInfo.data.icon_img && (
                  <div className="subreddit-profile-pic">
                    <IoLogoReddit
                      style={{
                        width: "5rem",
                        height: "5rem",
                        position: "absolute",
                        top: "1.5rem",
                        left: "1.25rem",
                      }}
                    />
                  </div>
                )}
            </div>
            <h1 className="subreddit-title">
              {subredditInfo.data.display_name_prefixed}
            </h1>
          </div>
        )}
      {currentSub === "all" && !loading && !subredditInfo && (
        <div className="subreddit-header">
          <div className="subreddit-banner-wrapper">
            <div className="subreddit-header-banner"></div>

            <div className="subreddit-profile-pic">
              <IoLogoReddit
                style={{
                  width: "5rem",
                  height: "5rem",
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.25rem",
                }}
              />
            </div>
          </div>
          <h1 className="subreddit-title">r/all</h1>
        </div>
      )}
      {loading && (
        <div className="subreddit-header">
          <div className="subreddit-banner-wrapper">
            <div className="subreddit-header-banner"></div>

            <div className="subreddit-profile-pic"></div>
          </div>
          <Skeleton
            className="subreddit-title"
            variant="rounded"
            width="15rem"
            height="2.5rem"
            style={{ top: "11.5rem" }}
          />
        </div>
      )}
      {/* {!subredditInfo && !loading && currentSub === "all" && (
        <div className="subreddit-header">
          <div className="subreddit-banner-wrapper">
            <div className="subreddit-header-banner"></div>

            <div className="subreddit-profile-pic">
              <IoLogoReddit
                style={{
                  width: "5rem",
                  height: "5rem",
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.25rem",
                }}
              />
            </div>
          </div>
          <h1 className="subreddit-title">r/all</h1>
        </div>
      )} */}
      <div className="mobile-sort">
        <button
          className="mobile-sort-button"
          onClick={() => {
            setShowFeed(true);
            setShowInfo(false);
          }}
        >
          Feed
        </button>
        <button
          className="mobile-sort-button"
          onClick={() => {
            setShowFeed(false);
            setShowInfo(true);
          }}
        >
          About
        </button>
      </div>
    </>
  );
}

export default SubredditHeader;
