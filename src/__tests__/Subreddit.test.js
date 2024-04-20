import { render, screen, cleanup, waitFor } from "@testing-library/react";
import {
  MemoryRouter,
  BrowserRouter,
  Router,
  Route,
  Routes,
} from "react-router-dom";
import Subreddit from "../pages/Subreddit/Subreddit";
import { Provider } from "react-redux";
import store from "../app/store";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";

afterEach(() => {
  cleanup();
});

jest.spyOn(window, "scrollTo").mockImplementation(() => {});
let mockCurrentMode = "hot";
const mockSetCurrentSub = jest.fn().mockImplementation(() => {});

describe("Subreddit page", () => {
  it("renders component without crashing, and attempts to redirect to r/all with no subreddit specified", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Subreddit
              currentMode={mockCurrentMode}
              currentSub={null}
              setCurrentSub={mockSetCurrentSub}
            />
          </Provider>
        </BrowserRouter>
      );
    });

    expect(mockSetCurrentSub).toHaveBeenCalledWith("all");
  });

  it("renders hardcoded data for r/all", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/r/all"]}>
          <Provider store={store}>
            <Subreddit
              currentMode={mockCurrentMode}
              currentSub={"all"}
              setCurrentSub={mockSetCurrentSub}
            />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(await screen.findByText("Note:")).toBeInTheDocument();
    });
  });

  it("renders appropriate data for a subreddit if the route is correct", async () => {
    // const [mockCurrentSub, setMockCurrentSub] = useState("all");

    const history = createMemoryHistory();
    history.push("/r/react");

    await act(async () => {
      render(
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            <Routes>
              <Route
                path="/r/:subreddit"
                element={
                  <Subreddit
                    currentMode={mockCurrentMode}
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

    // using all by text due to mobile and desktop view
    expect(await screen.findAllByText("r/React")).toBeTruthy();
    expect(await screen.findAllByText("React is epic")).toBeTruthy();
  });

  it("renders load more button and fetches more posts when clicked", async () => {
    const history = createMemoryHistory();
    history.push("/r/react");

    await act(async () => {
      render(
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            <Routes>
              <Route
                path="/r/:subreddit"
                element={
                  <Subreddit
                    currentMode={mockCurrentMode}
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

    expect(await screen.findAllByText("Load more")).toBeTruthy();
    await act(async () => {
      const loadMoreButton = await screen.findAllByText("Load more");
      loadMoreButton[0].click();
    });

    // await waitFor(async () => {
    expect(await screen.findAllByText("React is epic 2")).toBeTruthy();
    // });
  });
});
