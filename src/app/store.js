import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";
import subredditsListReducer from "../features/SubredditsList/subredditsListSlice";
import subredditInfoReducer from "../features/SubredditInfo/subredditInfoSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    subredditsList: subredditsListReducer,
    subredditInfo: subredditInfoReducer,
  },
});
