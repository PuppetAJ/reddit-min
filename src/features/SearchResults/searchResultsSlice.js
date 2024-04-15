import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk(
  "searchResults/fetchSearchResults",
  async (payload) => {
    // if (payload.sub === "all") return;
    if (!payload.q) return;
    const endpoint = `https://www.reddit.com/search.json?q=${payload.q}&raw_json=1&type=link`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchMoreSearchResults = createAsyncThunk(
  "searchResults/fetchMoreSearchResults",
  async (payload) => {
    if (!payload.after || !payload.q) return;
    const endpoint = `https://www.reddit.com/search.json?q=${payload.q}&raw_json=1&type=link&after=${payload.after}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  searchResults: {},
  error: null,
  loading: false,
  loadingMore: false,
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchMoreSearchResults.fulfilled, (state, action) => {
        state.searchResults.data.children = [
          ...state.searchResults.data.children,
          ...action.payload.data.children,
        ];
        state.searchResults.data.after = action.payload.data.after;
        state.loadingMore = false;
      })
      .addCase(fetchMoreSearchResults.pending, (state, action) => {
        state.loadingMore = true;
      })
      .addCase(fetchMoreSearchResults.rejected, (state, action) => {
        state.error = action.error.message;
        state.loadingMore = false;
      });
  },
});

export const selectSearchResults = (state) => state.searchResults.searchResults;
export const selectSearchResultsLoading = (state) =>
  state.searchResults.loading;
export const selectSearchResultsLoadingMore = (state) =>
  state.searchResults.loadingMore;

export const selectSearchResultsObj = (state) => state.searchResults;

export default searchResultsSlice.reducer;
