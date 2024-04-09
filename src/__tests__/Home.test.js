import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "../pages/Home/Home";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";
import subredditsReducer from "../features/Subreddits/subredditsSlice";

const mockStore = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
  },
});

afterEach(() => {
  cleanup();
});

describe("Home container", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders without crashing", () => {
    const storeSpy = jest.spyOn(mockStore, "dispatch");

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(storeSpy).toHaveBeenCalledTimes(2);
    expect(storeSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it("dispatches fetchPosts action", async () => {
    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );
    await waitFor(async () => {
      expect(await screen.findByText("0")).toBeInTheDocument();
      expect(
        await screen.findByText("Title: PUBG: BATTLEGROUNDS")
      ).toBeInTheDocument();
      expect(await screen.findByText("Home")).toBeInTheDocument();
    });
  });
});
