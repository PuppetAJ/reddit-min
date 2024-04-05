import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("home/fetchAll", async (payload) => {
  const response = await fetch(
    `https://www.reddit.com/r/${payload.sub}/${payload.mode}.json?raw_json=1&limit=20`
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
});

const initialState = {
  posts: {},
  error: null,
  loading: false,
};

export const postsSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
