import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Inicio from './components/inicio';
import SobreMi from './components/SobreMi';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';

// Componente para actualizar el título de la página según la ruta
function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      switch (pathname) {
        case '/':
          return 'Inicio';
        case '/sobre-mi':
          return 'Sobre Mi';
        case '/proyectos':
          return 'Proyectos';
        case '/contacto':
          return 'Contacto';
        default:
          return 'Inicio';
      }
    };

    const pageName = getPageTitle(location.pathname);
    document.title = `Mi Portfolio - ${pageName}`;
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <React.StrictMode>
      <Router>
        <PageTitleUpdater />
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </Router>
    </React.StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);
reportWebVitals();
