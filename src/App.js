// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TranslatorBox from './components/TranslatorBox';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/translate" element={<TranslatorBox />} />
    </Routes>
  );
}

export default App;
