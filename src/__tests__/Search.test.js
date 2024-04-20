import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter, Router } from "react-router-dom";
import Search from "../pages/Search/Search";
import { Provider } from "react-redux";
import store from "../app/store";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";

afterEach(() => {
  cleanup();
});

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

describe("Search page", () => {
  it("renders component without crashing, and tells user no results found with no search params specified.", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Search />
          </Provider>
        </BrowserRouter>
      );
    });

    // test if this
    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });

  it("displays search results for query", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/search?q=react"]}>
          <Provider store={store}>
            <Search />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(
        await screen.findByText("Search results for: react")
      ).toBeInTheDocument();
    });

    expect(await screen.findByText("React is epic")).toBeInTheDocument();
  });

  it("navigates user to thread route when they click on a search result", async () => {
    const history = createMemoryHistory();
    history.push("/search?q=react");

    const pushSpy = jest.spyOn(history, "push");
    await act(async () => {
      render(
        <Router location={history.location} navigator={history}>
          <Provider store={store}>
            <Search />
          </Provider>
        </Router>
      );
    });

    const searchResult = await screen.findByText("React is epic");
    searchResult.click();

    await waitFor(async () => {
      expect(pushSpy).toHaveBeenCalledWith(
        {
          hash: "",
          pathname: "/r/React/comments/1/test",
          search: "",
        },
        undefined,
        {}
      );
    });
  });

  it("navigates user to subreddit route when they click on a subreddit link", async () => {
    const history = createMemoryHistory();
    history.push("/search?q=react");

    const pushSpy = jest.spyOn(history, "push");
    await act(async () => {
      render(
        <Router location={history.location} navigator={history}>
          <Provider store={store}>
            <Search />
          </Provider>
        </Router>
      );
    });

    const subredditLink = await screen.findByText("r/React");
    subredditLink.click();

    await waitFor(async () => {
      expect(pushSpy).toHaveBeenCalledWith(
        {
          hash: "",
          pathname: "/r/React",
          search: "",
        },
        undefined,
        {}
      );
    });
  });

  it("displays load more button when there are more search results", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/search?q=react"]}>
          <Provider store={store}>
            <Search />
          </Provider>
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("does not display load more button when there are no more search results", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/search?q=nomore"]}>
          <Provider store={store}>
            <Search />
          </Provider>
        </MemoryRouter>
      );
    });

    expect(screen.queryByText("Load More")).toBeNull();
  });

  it("displays skeleton loaders when loading search results", async () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/search?q=react"]}>
          <Provider store={store}>
            <Search />
          </Provider>
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId("search-skeleton")).toBeInTheDocument();
  });

  it("displays skeleton loaders when loading more search results", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/search?q=react"]}>
          <Provider store={store}>
            <Search />
          </Provider>
        </MemoryRouter>
      );
    });

    act(() => {
      const loadMoreButton = screen.getByText("Load More");
      loadMoreButton.click();
    });

    expect(screen.getByTestId("search-skeleton-more")).toBeInTheDocument();
  });
});
