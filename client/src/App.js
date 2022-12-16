import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context/appContext';
import { Header } from './components';
import Home from './pages/home';
import AssumptionLiability from './pages/assumptionLiability';
import PurchaseDevice from './pages/purchaseDevice';
import ServiceChange from './pages/serviceChange';
import Footer from './components/footer';
import './assets/scss/main.scss';
import Success from './pages/success';

function App() {
  const [nextPage, setNextPage] = useState('');

  return (
    <Suspense fallback="">
      <AppContext.Provider value={{ nextPage, setNextPage }}>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/assumptionLiability" element={<AssumptionLiability />} />
          <Route path="/purchaseDevice" element={<PurchaseDevice />} />
          <Route path="/serviceChange" element={<ServiceChange />} />
          <Route path="/submitted" element={<Success />} />
        </Routes>

        <Footer />
      </AppContext.Provider>
    </Suspense>
  );
}
export default App;
