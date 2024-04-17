import React, { useState } from "react";
import { IoLogoReddit } from "react-icons/io5";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import shortNumber from "short-number";
import { ThickArrowUpIcon, ThickArrowDownIcon } from "@radix-ui/react-icons";
// import Comments from "../Comments/Comments";

function Comment({ comment }) {
  // Note: it's possible to parse the HTML and slice <a> tags to transform them into images by matching the href attribute with a regex.
  // Since this is a simple project we'll render the links as is.
  const [voted, setVoted] = useState(null);

  const setTime = (postTime) => {
    if (!postTime) return;
    TimeAgo.addLocale(en);
    let timeAgo = new TimeAgo("en-US");
    return timeAgo.format(new Date(postTime * 1000));
  };

  // console.log(comment);

  return (
    <div className="comment-wrapper">
      {comment && comment.data && (
        <div className="comment-content">
          <div className="comment-head">
            <IoLogoReddit className="reddit-icon" />
            <div className="comment-stats">
              <h5>u/{comment.data.author}</h5>
              <span className="comment-head-div">•</span>
              <h6>{setTime(comment.data.created_utc)}</h6>
            </div>
          </div>
          <div
            // style={
            //   comment.data.replies
            //     ? { marginBottom: "2rem" }
            //     : { marginBottom: "0.5rem" }
            // }
            style={{ marginBottom: "0.5rem" }}
            className="comment-body"
          >
            <div
              dangerouslySetInnerHTML={{ __html: comment.data.body_html }}
            ></div>
          </div>
          <div className="comment-footer">
            <div className="footer-wrapper comment-score">
              <div
                className="vote-wrapper"
                onClick={(e) => {
                  if (e.target.classList.contains("upvote")) {
                    if (
                      voted &&
                      voted !== e.target &&
                      voted.classList.contains("voted")
                    ) {
                      voted.classList.toggle("voted");
                    }
                    e.target.classList.toggle("voted");
                    setVoted(e.target);
                  } else {
                    if (
                      voted &&
                      voted !== e.target.parentElement &&
                      voted.classList.contains("voted")
                    ) {
                      voted.classList.toggle("voted");
                    }
                    e.target.parentElement.classList.toggle("voted");
                    setVoted(e.target.parentElement);
                  }
                }}
              >
                <ThickArrowUpIcon
                  width={"1.25rem"}
                  height={"1.25rem"}
                  className="upvote"
                />
              </div>
              <p className="votes">{shortNumber(comment.data.score)}</p>
              <div
                className="vote-wrapper"
                onClick={(e) => {
                  if (e.target.classList.contains("downvote")) {
                    if (
                      voted &&
                      voted !== e.target &&
                      voted.classList.contains("voted")
                    ) {
                      voted.classList.toggle("voted");
                    }
                    e.target.classList.toggle("voted");
                    setVoted(e.target);
                  } else {
                    if (
                      voted &&
                      voted !== e.target.parentElement &&
                      voted.classList.contains("voted")
                    ) {
                      voted.classList.toggle("voted");
                    }
                    e.target.parentElement.classList.toggle("voted");
                    setVoted(e.target.parentElement);
                  }
                }}
              >
                <ThickArrowDownIcon
                  width={"1.25rem"}
                  height={"1.25rem"}
                  className="downvote"
                />
              </div>
            </div>
          </div>
          {comment.data.replies && (
            <ul>
              {comment.data.replies.data.children.map((reply) => {
                if (reply.kind !== "more") {
                  return (
                    <li key={reply.data.id}>
                      <Comment comment={reply} />
                    </li>
                  );
                }

                // if (reply.kind === "more") {
                //   return (
                //     <li className="" key={reply.data.id}>
                //       <h3
                //         onClick={(e) => {
                //           e.target.nextElementSibling.classList.toggle("hidden");
                //           e.target.style.display = "none";
                //         }}
                //       >
                //         Load More
                //       </h3>
                //       <div className="hidden">
                //         <Comment comment={reply} />
                //       </div>
                //     </li>
                //   );
                // }
                return null;
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Comment;
