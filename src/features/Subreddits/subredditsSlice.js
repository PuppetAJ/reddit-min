import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubreddits = createAsyncThunk("home/fetchAll", async () => {
  try {
    const response = await fetch(
      `https://www.reddit.com/subreddits/popular.json`
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  subreddits: {},
  error: null,
  loading: false,
};

export const subredditsSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAllSubreddits = (state) => state.subreddits.subreddits;

export default subredditsSlice.reducer;
