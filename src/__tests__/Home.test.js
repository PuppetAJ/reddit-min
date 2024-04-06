import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "../pages/Home/Home";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";
import renderer from "react-test-renderer";

const mockStore = configureStore({
  reducer: {
    posts: postsReducer,
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

    const component = renderer.create(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(storeSpy).toHaveBeenCalledTimes(1);
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
