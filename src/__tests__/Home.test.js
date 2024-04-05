import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "../containers/Home/Home";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";

const mockStore = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

mockStore.dispatch = jest.fn();

const storeSpy = jest.spyOn(mockStore, "dispatch");

afterEach(() => {
  cleanup();
});

describe("Home container", () => {
  beforeEach(() => {
    storeSpy.mockClear();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });
});
