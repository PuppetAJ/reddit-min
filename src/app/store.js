import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/Posts/postsSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
  },
});
