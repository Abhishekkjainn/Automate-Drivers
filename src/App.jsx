// import { useEffect, useState } from 'react';

import './App.css';
import Header from './components/header';
import Page1 from './pages/page1';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page2 from './pages/page2';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/driver" element={<Page2 />} />
      </Routes>
    </Router>
  );
}

export default App;
