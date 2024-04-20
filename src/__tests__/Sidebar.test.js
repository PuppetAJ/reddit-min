import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Provider } from "react-redux";
import store from "../app/store";
import { act } from "react-dom/test-utils";

afterEach(() => {
  cleanup();
});

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

const mockSetCurrentSub = jest.fn().mockImplementation(() => {});

describe("Sidebar component", () => {
  it("renders component without crashing", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Sidebar setCurrentSub={mockSetCurrentSub} />
          </Provider>
        </BrowserRouter>
      );
    });

    expect(screen.getByText("TOP SUBREDDITS")).toBeInTheDocument();
    expect(await screen.findByText("r/React")).toBeInTheDocument();
  });

  it("attempts to redirect to the subreddit clicked", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Sidebar setCurrentSub={mockSetCurrentSub} />
          </Provider>
        </MemoryRouter>
      );
    });

    await act(async () => {
      const subredditLink = screen.getByText("r/React");
      subredditLink.click();
    });

    expect(mockSetCurrentSub).toHaveBeenCalledWith("React");
  });
});
