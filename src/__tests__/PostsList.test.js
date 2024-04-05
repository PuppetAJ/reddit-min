import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import PostsList from "../features/Posts/PostsList";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";

const mockStore = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

const mockPostsData = {
  data: {
    children: [
      {
        data: {
          id: "1",
          title: "Title 1",
        },
      },
      {
        data: {
          id: "2",
          title: "Title 2",
        },
      },
    ],
  },
};

afterEach(() => {
  cleanup();
});

describe("Home container", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={mockStore}>
        <PostsList postsData={mockPostsData} />
      </Provider>
    );
  });

  it("renders posts data properly", () => {
    render(
      <Provider store={mockStore}>
        <PostsList postsData={mockPostsData} />
      </Provider>
    );
    expect(screen.getByText("Title: Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title: Title 2")).toBeInTheDocument();
  });

  it("renders without crashing with no posts", () => {
    render(
      <Provider store={mockStore}>
        <PostsList postsData={{ data: { children: [] } }} />
      </Provider>
    );

    expect(screen.queryByText("Title: Title 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Title: Title 2")).not.toBeInTheDocument();
  });
});
