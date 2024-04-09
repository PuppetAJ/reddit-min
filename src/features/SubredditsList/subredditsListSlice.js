import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubreddits = createAsyncThunk(
  "subredditsList/fetchSubreddits",
  async () => {
    try {
      console.log("reached");
      const response = await fetch(
        `https://www.reddit.com/subreddits/popular.json`
      );
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.log("reached 2");
      console.log(error);
    }
  }
);

const initialState = {
  subreddits: {},
  error: null,
  loading: false,
};

export const subredditsListSlice = createSlice({
  name: "subredditsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAllSubreddits = (state) => state.subredditsList.subreddits;

export default subredditsListSlice.reducer;
