import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubredditInfo = createAsyncThunk(
  "subredditInfo/fetchSubredditInfo",
  async (payload) => {
    if (payload.sub === "all") return;
    const endpoint = `https://www.reddit.com/r/${payload.sub}/about.json?raw_json=1&limit=20`;
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
  subredditInfo: {},
  error: null,
  loading: false,
};

export const subredditInfoSlice = createSlice({
  name: "subredditInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditInfo.fulfilled, (state, action) => {
        state.subredditInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubredditInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSubredditInfo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectSubredditInfo = (state) => state.subredditInfo.subredditInfo;
export const selectSubredditInfoLoading = (state) =>
  state.subredditInfo.loading;

export default subredditInfoSlice.reducer;
