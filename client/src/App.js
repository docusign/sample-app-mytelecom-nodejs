import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import AssumptionLiability from "./pages/AssumptionLiability";
import PurchaseDevice from "./pages/PurchaseDevice";
import ServiceChange from "./pages/ServiceChange";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SubmittedPurchaseDevice from "./pages/SubmittedPurchaseDevice";

function App() {
  return (
    <div>
      <h1>Welcome to MyTelecom</h1>
      <Router>
        <Header />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="assumption-of-liability"
            element={<AssumptionLiability />}
          />
          <Route path="purchase-new-device" element={<PurchaseDevice />}>
            <Route
              path="submitted-purchase-device"
              element={<SubmittedPurchaseDevice />}
            />
          </Route>

          <Route path="service-change" element={<ServiceChange />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
