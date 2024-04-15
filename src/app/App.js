import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Subreddit from "../pages/Subreddit/Subreddit";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import Search from "../pages/Search/Search";
import Thread from "../pages/Thread/Thread";

function App() {
  const [currentSub, setCurrentSub] = useState("all");
  const [currentMode, setCurrentMode] = useState("hot");

  return (
    <div className="main-container">
      <Header currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <div className="main-content">
        <Sidebar setCurrentSub={setCurrentSub} />
        <Routes>
          <Route
            path="/"
            element={
              <Subreddit
                setCurrentSub={setCurrentSub}
                currentSub={currentSub}
                currentMode={currentMode}
              />
            }
          />
          <Route
            path="/r/:subreddit"
            element={
              <Subreddit
                setCurrentSub={setCurrentSub}
                currentSub={currentSub}
                currentMode={currentMode}
              />
            }
          />
          <Route path="/search" element={<Search />} />
          <Route
            path="/r/:subreddit/comments/:id/:slug"
            element={
              <Thread currentSub={currentSub} setCurrentSub={setCurrentSub} />
            }
          />
          <Route
            path="*"
            element={
              <div>
                <h1>Not Found</h1>
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
