import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import StarsBox from "./components/pages/StarsBox";
import Home from "./components/pages/Home";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <StarsBox />
        <Routes>
          <Route exact path="/:bnsDomain" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
