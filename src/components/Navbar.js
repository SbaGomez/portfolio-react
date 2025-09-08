import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar el menú cuando se hace clic fuera del navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header ref={navbarRef}>
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
            style={{ maxWidth: isMenuOpen ? '400px' : 'none' }}
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
                  <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/sobre-mi"
                    className={`nav-link ${location.pathname === '/sobre-mi' ? 'active' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <i className="fas fa-user"></i> Sobre mi
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/proyectos"
                    className={`nav-link ${location.pathname === '/proyectos' ? 'active' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <i className="fas fa-folder-open"></i> Proyectos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contacto"
                    className={`nav-link ${location.pathname === '/contacto' ? 'active' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <i className="fas fa-envelope"></i> Contacto
                  </Link>
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
