import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import App from './App';
import ImageModal from './components/ImageModal'; // Import your ImageModal component
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/canvas" element={<ImageModal />} /> {/* Make sure to use ImageModal */}
    </Routes>
  </Router>
);

reportWebVitals();
