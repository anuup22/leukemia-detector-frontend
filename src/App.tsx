import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HowToUsePage from './pages/HowToUsePage';
import UploadPage from './components/UploadPage';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/how-to-use" element={<HowToUsePage />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  </Router>
);

export default App;
