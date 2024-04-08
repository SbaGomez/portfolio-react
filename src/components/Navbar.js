import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ onPageChange, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavLinkClick = (pageId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse hacia arriba
    onPageChange(pageId);
    setIsMenuOpen(false); // Cierra el menú cuando se hace clic en un enlace
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid justify-content-end">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`offcanvas offcanvas-end text-bg-dark ${isMenuOpen ? 'show' : ''}`}
            tabIndex="-1"
            style={{ maxWidth: isMenuOpen ? '300px' : 'none' }}
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                menu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={toggleMenu}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body" id="navbarNav">
              <ul className="navbar-nav nav-pills justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <button
                    className={`nav-link ${currentPage === 'inicio' ? 'active' : ''}`}
                    aria-current="page"
                    id="inicio"
                    onClick={() => handleNavLinkClick('inicio')}
                  >
                    <i className="fas fa-home"></i> Home
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${currentPage === 'somos' ? 'active' : ''}`}
                    id="somos"
                    onClick={() => handleNavLinkClick('somos')}
                  >
                    <i className="fas fa-users"></i> Sobre mi
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${currentPage === 'Proyectos' ? 'active' : ''}`}
                    id="Proyectos"
                    onClick={() => handleNavLinkClick('Proyectos')}
                  >
                    <i className="fas fa-gamepad"></i> Proyectos
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${currentPage === 'contacto' ? 'active' : ''}`}
                    id="contacto"
                    onClick={() => handleNavLinkClick('contacto')}
                  >
                    <i className="fas fa-envelope"></i> Contacto
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
