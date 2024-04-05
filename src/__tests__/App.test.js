import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import App from "../app/App";
import { Provider } from "react-redux";
import store from "../app/store";

afterEach(() => {
  cleanup();
});

describe("App component", () => {
  it("renders component without crashing", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("navigates to Home component", () => {
    const route = "/";
    render(
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("does not display content on non-existant routes", () => {
    const route = "/test";
    render(
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });
});
