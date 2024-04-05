import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../containers/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
