import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import Inicio from './components/inicio';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Inicio />
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
