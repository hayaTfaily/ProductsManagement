import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import { ProductContextProvider } from './context/productContext';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <Router>
      <ProductContextProvider>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </ProductContextProvider>
    </Router>
  );
}

export default App;
