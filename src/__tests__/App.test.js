import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import App from "../app/App";
import { Provider } from "react-redux";
import store from "../app/store";
import { act } from "react-dom/test-utils";

afterEach(() => {
  cleanup();
});

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

describe("App component", () => {
  it("renders component without crashing", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      );
    });

    // wait for all states to update
    await waitFor(async () => {
      expect(await screen.findByText("Home")).toBeInTheDocument();
    });
  });

  it("navigates to Search page without errors", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/search?q=react"]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(
        await screen.findByText("Search results for: react")
      ).toBeInTheDocument();
    });
  });

  it("navigates to Thread page without errors", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/r/testing/comments/1/test"]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(await screen.findByText("Comments")).toBeInTheDocument();
    });
  });

  it("navigates to Subreddit page without errors", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/r/testing"]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(await screen.findByText("About Community")).toBeInTheDocument();
    });
  });

  it("navigates to not found page without errors", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/testing"]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(await screen.findByText("Route not Found!")).toBeInTheDocument();
    });
  });
});

describe("End to end tests", () => {
  it("navigates from a subreddit, to home page, to thread page, and back without errors", async () => {
    let route = "/r/testing";
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(await screen.findByText("About Community")).toBeInTheDocument();
    });

    expect(screen.queryAllByText("r/all")).toHaveLength(0);

    await act(async () => {
      let HomeBtn = await screen.findByText("Home");
      HomeBtn.click();
    });

    await waitFor(async () => {
      expect(await screen.findByText("r/all")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(
        screen.queryAllByText("PUBG: BATTLEGROUNDS")[0]
      ).toBeInTheDocument();
    });

    await act(async () => {
      let postTitle = await screen.findAllByText("PUBG: BATTLEGROUNDS");
      postTitle[0].click();
    });

    expect(screen.queryAllByText("About Community")).toHaveLength(0);

    await act(async () => {
      let backBtn = await screen.findByText("Back");
      backBtn.click();
    });

    expect(screen.queryAllByText("About Community")).toHaveLength(1);

    await act(async () => {
      let input = await screen.findByPlaceholderText("Find community or post");
      input.value = "react";

      let searchBtn = await screen.findByText("Search");
      searchBtn.click();
    });

    await waitFor(async () => {
      expect(
        await screen.findByText("Search results for: react")
      ).toBeInTheDocument();
    });

    await act(async () => {
      expect(await screen.findByText("React is epic")).toBeInTheDocument();
    });

    await act(async () => {
      let backBtn = await screen.findByText("Back");
      backBtn.click();
    });

    await waitFor(async () => {
      expect(await screen.findByText("About Community")).toBeInTheDocument();
    });

    await act(async () => {
      let HomeBtn = await screen.findByText("Home");
      HomeBtn.click();
    });

    await waitFor(async () => {
      expect(await screen.findByText("r/all")).toBeInTheDocument();
    });

    await act(async () => {
      let reactSub = await screen.findByText("r/React");
      reactSub.click();
    });

    // await waitFor(async () => {
    expect(await screen.findAllByText("React is epic")).toBeTruthy();
    // });
  });
});
