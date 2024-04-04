import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllPosts = createAsyncThunk("home/fetchAll", async () => {
  const response = await fetch("https://www.reddit.com/r/all/top.json");
  const data = await response.json();
  return data;
});

const initialState = {
  all: {},
  error: null,
  loading: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(fetchAllPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.home.all;

export default homeSlice.reducer;
