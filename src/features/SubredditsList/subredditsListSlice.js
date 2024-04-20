import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubreddits = createAsyncThunk(
  "subredditsList/fetchSubreddits",
  async () => {
    try {
      // console.log("reached");
      const response = await fetch(
        `https://www.reddit.com/subreddits/popular.json`
      );
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      // console.log("reached 2");
      console.log(error);
    }
  }
);

export const fetchMoreSubreddits = createAsyncThunk(
  "subredditsList/fetchMoreSubreddits",
  async (payload) => {
    try {
      const url = `https://www.reddit.com/subreddits/popular.json?${payload.nav}&count=${payload.count}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  subreddits: {},
  error: null,
  loading: false,
  pageCount: 1,
};

export const subredditsListSlice = createSlice({
  name: "subredditsList",
  initialState,
  reducers: {
    incrementPageCount: (state) => {
      state.pageCount += 25;
    },
    decrementPageCount: (state) => {
      state.pageCount -= 25;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.subreddits = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchMoreSubreddits.fulfilled, (state, action) => {
        state.subreddits = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoreSubreddits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreSubreddits.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectAllSubreddits = (state) => state.subredditsList.subreddits;
export const selectPageCount = (state) => state.subredditsList.pageCount;
export const selectSubredditsListLoading = (state) =>
  state.subredditsList.loading;

export const { incrementPageCount, decrementPageCount } =
  subredditsListSlice.actions;

export default subredditsListSlice.reducer;
