import React, { useEffect, useState } from 'react';
import './Footer.css'; // Estilo CSS aquí
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente FontAwesomeIcon
import { faFacebook, faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Importa los íconos de las redes sociales

const Footer = ({ onPageChange, currentPage }) => {
    const [footerPosition, setFooterPosition] = useState('relative');

    const handleNavLinkClick = (pageId) => {
        onPageChange(pageId);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse hacia arriba
    };

    useEffect(() => {
        const handleResize = () => {
            const body = document.body;
            const html = document.documentElement;

            const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

            if (height < window.innerHeight) {
                setFooterPosition('fixed');
            } else {
                setFooterPosition('relative');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <footer className="footer" style={{ position: footerPosition }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <h3>Informacion</h3>
                        <p>Nombre: Sergio Sebastian Gomez</p>
                        <p>Edad: 28</p>
                        <p>Carrera: Desarrollo de Software</p>
                        <p>Tipografia Web: Roboto Condensed</p>
                        <div className="colorContainer">
                            <div className="coloresUsados">Colores Utilizados:</div>
                            {/* Aquí deberías agregar tus divs de colores utilizados */}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-5">
                        <h3>Secciones</h3>
                        <div className="row">
                            <div className="col">
                                <ul>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${currentPage === 'inicio' ? 'activeFooter' : ''}`}
                                            href="#inicio"
                                            id="inicio"
                                            onClick={() => handleNavLinkClick('inicio')}
                                        >
                                            <i className="fas fa-home"></i> HOME
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${currentPage === 'somos' ? 'activeFooter' : ''}`}
                                            href="#somos"
                                            id="somos"
                                            onClick={() => handleNavLinkClick('somos')}
                                        >
                                            <i className="fas fa-users"></i> SOBRE MI
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${currentPage === 'Proyectos' ? 'activeFooter' : ''}`}
                                            id="Proyectos"
                                            onClick={() => handleNavLinkClick('Proyectos')}
                                        >
                                            <i className="fas fa-gamepad"></i> PROYECTOS
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${currentPage === 'contacto' ? 'activeFooter' : ''}`}
                                            id="contacto"
                                            onClick={() => handleNavLinkClick('contacto')}
                                        >
                                            <i className="fas fa-envelope"></i> CONTACTO
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <h3>Contáctame</h3>
                        <p>¡Estoy disponible para brindarte mis servicios! Ponte en contacto conmigo mediante correo electrónico o LinkedIn para discutir cómo puedo ayudarte.</p>
                        <div className="input-group">
                            <input type="text" className="form-control" id="contact" name="contactsteam" placeholder="sbagomeznight@gmail.com" disabled />
                            <span className="input-group-btn">
                                <a href="mailto:sbagomeznight@gmail.com"><button className="btn_footer" type="button">OK</button></a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-social">
                        <a href="https://facebook.com/" title="Facebook">
                            <FontAwesomeIcon icon={faFacebook} className="facebookFooter" />
                        </a>
                        <a href="https://instagram.com/" title="Instagram">
                            <FontAwesomeIcon icon={faInstagram} className="instagramFooter" />
                        </a>
                        <a href="https://web.whatsapp.com/" title="Whatsapp">
                            <FontAwesomeIcon icon={faWhatsapp} className="whatsappFooter" />
                        </a>
                        <a href="https://twitter.com/" title="Twitter">
                            <FontAwesomeIcon icon={faTwitter} className="twitterFooter" />
                        </a>
                    </div>
                    <p>Copyright © 2024 Sebastian Gomez Portfolio</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
