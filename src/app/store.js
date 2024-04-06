import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";
import subredditsReducer from "../features/Subreddits/subredditsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
  },
});
