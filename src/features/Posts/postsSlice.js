import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (payload) => {
    const endpoint = `https://www.reddit.com/r/${payload.sub}/${payload.mode}.json?raw_json=1&limit=20`;
    try {
      const response = await fetch(endpoint);
      // console.log(response);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  posts: {},
  error: null,
  loading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
