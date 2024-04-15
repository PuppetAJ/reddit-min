import React from "react";
import Comment from "../Comment/Comment";

function Comments({ comments }) {
  console.log(comments);
  return (
    <div>
      <ul className="comments-root">
        {comments &&
          // eslint-disable-next-line
          comments.map(
            (comment) =>
              comment.kind !== "more" && (
                <li key={comment.data.id}>
                  <Comment comment={comment} />
                </li>
              )
          )}
      </ul>
    </div>
  );
}

export default Comments;
