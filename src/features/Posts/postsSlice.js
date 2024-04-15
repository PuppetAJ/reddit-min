import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (payload) => {
    const endpoint = `https://www.reddit.com/r/${payload.sub}/${payload.mode}.json?raw_json=1`;
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

export const fetchMorePosts = createAsyncThunk(
  "posts/fetchMorePosts",
  async (payload) => {
    const endpoint = `https://www.reddit.com/r/${payload.sub}/${payload.mode}.json?raw_json=1&after=${payload.after}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPost = createAsyncThunk("posts/fetchPost", async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  posts: {},
  post: {},
  error: null,
  loading: false,
  loadingMore: false,
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
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchPost.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.posts.data.children = [
          ...state.posts.data.children,
          ...action.payload.data.children,
        ];
        state.posts.data.after = action.payload.data.after;
        state.loadingMore = false;
        state.error = false;
      })
      .addCase(fetchMorePosts.pending, (state, action) => {
        state.loadingMore = true;
        state.error = false;
      })
      .addCase(fetchMorePosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loadingMore = false;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPosts = (state) => state.posts;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPost = (state) => state.posts.post;

export default postsSlice.reducer;
