import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
