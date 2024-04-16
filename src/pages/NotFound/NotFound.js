import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className="subreddit-posts-container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Route not Found!</h1>
      <button className="home-button" onClick={() => navigate("/")}>
        Go home
      </button>
    </div>
  );
}

export default NotFound;
