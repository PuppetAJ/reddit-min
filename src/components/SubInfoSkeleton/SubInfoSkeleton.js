import React from "react";
import { Skeleton } from "@mui/material";

function SubInfoSkeleton() {
  return (
    <>
      <div className="subreddit-info" style={{ fontFamily: "Quicksand" }}>
        <div className="subreddit-info-wrapper">
          <div className="subreddit-container">
            <Skeleton
              variant="text"
              sx={{ marginTop: "1rem" }}
              width={"18.75rem"}
              height={"2.75rem"}
            />
            <Skeleton
              variant="rounded"
              sx={{ marginTop: "1rem" }}
              width={"100%"}
              height={"15rem"}
            />
          </div>
          <div className="subreddit-container">
            <Skeleton
              variant="text"
              sx={{ marginTop: "1rem" }}
              width={"18.75rem"}
              height={"2.75rem"}
            />
            <Skeleton
              variant="rounded"
              sx={{ marginTop: "1rem" }}
              width={"100%"}
              height={"15rem"}
            />
            <Skeleton
              variant="rounded"
              sx={{ marginTop: "1rem" }}
              width={"100%"}
              height={"15rem"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SubInfoSkeleton;
