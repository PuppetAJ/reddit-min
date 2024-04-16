import React from "react";
import { Skeleton } from "@mui/material";
import {
  ThickArrowUpIcon,
  ThickArrowDownIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";

function PostSkeleton({ wide }) {
  return (
    <>
      <div className="post-container">
        <div className="post-head">
          <div className="post-stats">
            <div className="head-left">
              <Skeleton
                // sx={{ backgroundColor: "#505a66" }}
                sx={{ marginRight: "0.5rem" }}
                animation="wave"
                variant="circular"
                width={"2.5rem"}
                height={"2.5rem"}
              />
              <div>
                <Skeleton variant="text" width={"6.25rem"} />
                <Skeleton variant="text" width={"12.5rem"} />
              </div>
            </div>
            <div className="head-right">
              <Skeleton variant="text" width={"6.25rem"} height={"1.5rem"} />
            </div>
          </div>
          <Skeleton
            variant="text"
            sx={{ marginTop: "1rem" }}
            width={"18.75rem"}
            height={"1.875rem"}
          />
        </div>
        <div className="post-content-wrapper">
          <Skeleton
            variant="rounded"
            width={wide ? "59.375rem" : "46.875rem"}
            height={"12.5rem"}
          />
        </div>
      </div>
      <div
        className="post-footer-skeleton"
        width={wide ? "53.125rem" : "47.875rem"}
      >
        <div className="post-footer-content">
          <div className="post-footer-stats">
            <div className="footer-wrapper">
              <div className="vote-wrapper">
                <ThickArrowUpIcon
                  className="upvote"
                  width={"1.25rem"}
                  height={"1.25rem"}
                />
              </div>
              <p className="votes">
                <Skeleton variant="text" width={"1.25rem"} />
              </p>
              <div className="vote-wrapper">
                <ThickArrowDownIcon
                  className="downvote"
                  width={"1.25rem"}
                  height={"1.25rem"}
                />
              </div>
            </div>
            <div className="footer-wrapper">
              <ChatBubbleIcon
                className="comments-icon"
                width={"1.25rem"}
                height={"1.25rem"}
              />
              <Skeleton
                sx={{ marginLeft: "0.5rem" }}
                variant="text"
                width={"1.25rem"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostSkeleton;