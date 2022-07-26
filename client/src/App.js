import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Liability from "./pages/Liability";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <h1>Welcome to MyTelecom</h1>
      <Router>
        <Header />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="assumption-of-liability" element={<Liability />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
