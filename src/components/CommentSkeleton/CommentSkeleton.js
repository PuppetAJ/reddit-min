import React from "react";
import { Skeleton } from "@mui/material";
import { ThickArrowUpIcon, ThickArrowDownIcon } from "@radix-ui/react-icons";

function CommentSkeleton() {
  return (
    <div style={{ marginBottom: "1rem" }} className="comment-wrapper">
      <div className="comment-content">
        <div className="comment-head">
          <Skeleton
            variant="circular"
            className="reddit-icon"
            sx={{
              border: "none",
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              marginTop: "0.5rem",
            }}
          />
          <Skeleton variant="text" width={"2rem"} height={"1rem"} />
          <span className="comment-head-div">•</span>
          <Skeleton variant="text" width={"2rem"} height={"1rem"} />
        </div>
        <div className="comment-body" style={{ marginBottom: "1rem" }}>
          <Skeleton
            className="upvote"
            variant="rounded"
            width={"100%"}
            height={"8rem"}
          />
        </div>
        <div className="comment-footer">
          <div className="footer-wrapper comment-score">
            <div className="vote-wrapper">
              <ThickArrowUpIcon width={"20px"} height={"20px"} />
            </div>
            <Skeleton variant="text" width={"2rem"} height={"1rem"} />
            <div className="vote-wrapper">
              <ThickArrowDownIcon
                className="downvote"
                width={"20px"}
                height={"20px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSkeleton;
