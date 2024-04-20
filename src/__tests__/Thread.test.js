import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { Router, Route, Routes } from "react-router-dom";
import Thread from "../pages/Thread/Thread";
import { Provider } from "react-redux";
import store from "../app/store";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";

afterEach(() => {
  cleanup();
});

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

const mockSetCurrentSub = jest.fn().mockImplementation(() => {});

describe("Thread page", () => {
  it("renders component without crashing, and attempts to set the current sub to the subreddit in the url if none is specified", async () => {
    const history = createMemoryHistory();
    history.push("/r/react/comments/1/this_is_a_test");

    await act(async () => {
      render(
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            <Routes>
              <Route
                path="/r/:subreddit/comments/:id/:slug"
                element={
                  <Thread currentSub={null} setCurrentSub={mockSetCurrentSub} />
                }
              ></Route>
            </Routes>
          </Router>
        </Provider>
      );
    });

    expect(mockSetCurrentSub).toHaveBeenCalledWith("react");
  });

  it("renders data for a specific subreddit", async () => {
    const history = createMemoryHistory();
    history.push("/r/react/comments/1/this_is_a_test");

    await act(async () => {
      render(
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            <Routes>
              <Route
                path="/r/:subreddit/comments/:id/:slug"
                element={
                  <Thread
                    currentSub={"react"}
                    setCurrentSub={mockSetCurrentSub}
                  />
                }
              ></Route>
            </Routes>
          </Router>
        </Provider>
      );
    });

    await waitFor(async () => {
      expect(
        await screen.findByText("PUBG: BATTLEGROUNDS")
      ).toBeInTheDocument();
    });
  });
});
