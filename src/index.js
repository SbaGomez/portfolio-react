import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Inicio from './components/Inicio';
import SobreMi from './components/SobreMi';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');

  // Función para cambiar de página cuando se hace clic en el Navbar
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Actualizar el título de la página según currentPage
  useEffect(() => {
    document.title = `Mi Portfolio - ${currentPage}`;
  }, [currentPage]);

  // Renderiza la página actual según el estado currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Inicio onPageChange={handlePageChange} currentPage={currentPage} />;
      case 'somos':
        return <SobreMi onPageChange={handlePageChange} currentPage={currentPage} />;
      case 'Proyectos':
        return <Proyectos onPageChange={handlePageChange} currentPage={currentPage} />;
      case 'Contacto':
        return <Contacto onPageChange={handlePageChange} currentPage={currentPage} />;
      default:
        return <Inicio onPageChange={handlePageChange} currentPage={currentPage} />;
    }
  };

  return (
    <React.StrictMode>
      <Navbar onPageChange={handlePageChange} currentPage={currentPage} />
      {renderPage()}
      <Footer onPageChange={handlePageChange} currentPage={currentPage} />
    </React.StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);
reportWebVitals();
