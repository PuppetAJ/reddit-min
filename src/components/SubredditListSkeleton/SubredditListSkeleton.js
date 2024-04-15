import React from "react";
import { Skeleton } from "@mui/material";

function SubredditListSkeleton() {
  return (
    <li>
      <div className="subreddit-content" style={{ marginBottom: "0.625rem" }}>
        <Skeleton
          variant="circular"
          className="subreddit-icon"
          sx={{
            border: "none",
            marginRight: "0.5rem",
            // marginBottom: "0.5rem",
            // marginTop: "0.5rem",
          }}
        />
        <Skeleton variant="text" width={"9.25rem"} height={"1.75rem"} />
      </div>
    </li>
  );
}

export default SubredditListSkeleton;
