import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

function App() {
  const [currentSub, setCurrentSub] = useState("all");
  const [currentMode] = useState("hot");

  return (
    <div className="main-container">
      <Header />
      <div className="main-content">
        <Sidebar setCurrentSub={setCurrentSub} />
        <Routes>
          <Route
            path="/"
            element={<Home currentSub={currentSub} currentMode={currentMode} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
