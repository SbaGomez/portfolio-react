import React, { useEffect, useState } from 'react';
import './Footer.css'; // Estilo CSS aquí
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente FontAwesomeIcon
import { faInstagram, faWhatsapp, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Importa los íconos de las redes sociales
import { contactConfig, getCurrentAge } from '../config/contactConfig';

const Footer = ({ onPageChange, currentPage }) => {
    const [footerPosition, setFooterPosition] = useState('relative');
    const [copied, setCopied] = useState(false);

    const age = getCurrentAge();

    const handleNavLinkClick = (pageId) => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse hacia arriba
        onPageChange(pageId);
    };

    // Función para copiar email al portapapeles
    const copyEmailToClipboard = async () => {
        const email = contactConfig.email;
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset después de 2 segundos
        } catch (err) {
            console.error('Error al copiar: ', err);
            // Fallback para navegadores que no soportan clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
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
                        <p>Nombre: {contactConfig.fullName}</p>
                        <p>Edad: {age}</p>
                        <p>Carrera: {contactConfig.career}</p>
                        <p>Tipografia Web: {contactConfig.typography}</p>
                        <div className="colorContainer">
                            <div className="coloresUsados">Colores Utilizados:</div>
                            {contactConfig.colors.map((color, index) => (
                                <div key={index} className={color.class}></div>
                            ))}
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
                                            id="inicio"
                                            onClick={() => handleNavLinkClick('inicio')}
                                        >
                                            <i className="fas fa-home"></i> HOME
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${currentPage === 'somos' ? 'activeFooter' : ''}`}
                                            id="somos"
                                            onClick={() => handleNavLinkClick('somos')}
                                        >
                                            <i className="fas fa-user"></i> SOBRE MI
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
                                            <i className="fas fa-folder-open"></i> PROYECTOS
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${currentPage === 'Contacto' ? 'activeFooter' : ''}`}
                                            id="Contacto"
                                            onClick={() => handleNavLinkClick('Contacto')}
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
                            <input type="text" className="form-control" id="contact" name="contactsteam" value={contactConfig.email} readOnly />
                            <span className="input-group-btn">
                                <button 
                                    className={`btn_footer ${copied ? 'copied' : ''}`} 
                                    type="button"
                                    onClick={copyEmailToClipboard}
                                    title={copied ? '¡Copiado!' : 'Copiar email'}
                                >
                                    {copied ? (
                                        <>
                                            <i className="fas fa-check"></i> Copiado
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-copy"></i> Copiar
                                        </>
                                    )}
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-social">
                        <a href={contactConfig.socialMedia.github.url} target="_blank" rel="noopener noreferrer" title={contactConfig.socialMedia.github.name}>
                            <FontAwesomeIcon icon={faGithub} className="githubFooter" />
                        </a>
                        <a href={contactConfig.socialMedia.instagram.url} target="_blank" rel="noopener noreferrer" title={contactConfig.socialMedia.instagram.name}>
                            <FontAwesomeIcon icon={faInstagram} className="instagramFooter" />
                        </a>    
                        <a href={contactConfig.socialMedia.whatsapp.url} target="_blank" rel="noopener noreferrer" title={contactConfig.socialMedia.whatsapp.name}>
                            <FontAwesomeIcon icon={faWhatsapp} className="whatsappFooter" />
                        </a>
                        <a href={contactConfig.socialMedia.linkedin.url} target="_blank" rel="noopener noreferrer" title={contactConfig.socialMedia.linkedin.name}>
                            <FontAwesomeIcon icon={faLinkedin} className="linkedinFooter" />
                        </a>
                    </div>
                    <p>{contactConfig.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
