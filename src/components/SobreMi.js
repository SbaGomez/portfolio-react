import React from 'react';
import './SobreMi.css';

function SobreMi({ onPageChange, currentPage }) {
    const handleNavLinkClick = (pageId) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onPageChange(pageId);
    };

    const habilidades = [
        { nombre: "Desarrollo Frontend", nivel: 90, icono: "fas fa-code" },
        { nombre: "React & JavaScript", nivel: 85, icono: "fab fa-react" },
        { nombre: "HTML5 & CSS3", nivel: 95, icono: "fab fa-html5" },
        { nombre: "Bootstrap", nivel: 80, icono: "fab fa-bootstrap" },
        { nombre: "Node.js", nivel: 75, icono: "fab fa-node-js" },
        { nombre: "Base de Datos", nivel: 70, icono: "fas fa-database" },
        { nombre: "Java", nivel: 65, icono: "fab fa-java" },
        { nombre: "Angular", nivel: 60, icono: "fab fa-angular" }
    ];

    const experiencias = [
        {
            titulo: "Desarrollador Fullstack",
            empresa: "Proyectos Personales",
            periodo: "2022 - Presente",
            descripcion: "Desarrollo de aplicaciones web completas, desde el frontend hasta el backend, utilizando tecnologías modernas como React, Node.js y bases de datos SQL."
        },
        {
            titulo: "Desarrollador Frontend",
            empresa: "Freelance",
            periodo: "2021 - 2022",
            descripcion: "Creación de interfaces de usuario responsivas y modernas, optimización de rendimiento y experiencia de usuario."
        }
    ];

    const educacion = [
        {
            titulo: "Técnico en Desarrollo de Software",
            institucion: "Universidad Argentina de la Empresa (UADE)",
            periodo: "2022 - Presente",
            descripcion: "Carrera técnica especializada en desarrollo de software, abarcando programación, bases de datos, ingeniería de software y metodologías ágiles."
        },
        {
            titulo: "Desarrollo Web Fullstack",
            institucion: "Autodidacta",
            periodo: "2020 - Presente",
            descripcion: "Aprendizaje continuo de tecnologías web modernas a través de cursos online, documentación oficial y proyectos prácticos."
        },
        {
            titulo: "Programación Orientada a Objetos",
            institucion: "Cursos Online",
            periodo: "2019 - 2020",
            descripcion: "Fundamentos de programación con Java, estructuras de datos y algoritmos."
        }
    ];

    return (
        <section id="sobre-mi">
            <div className="container">
                <div className="sobre-mi-header">
                    <h2>Sobre Mí</h2>
                    <p className="sobre-mi-subtitle">Conoce más sobre mi experiencia y habilidades</p>
                </div>

                {/* Información Personal */}
                <div className="sobre-mi-content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="info-personal">
                                <h3>Mi Historia</h3>
                                <p>
                                    Soy un <strong>desarrollador web apasionado</strong> con más de 5 años de experiencia 
                                    creando soluciones digitales innovadoras. Mi viaje en el desarrollo comenzó con la 
                                    curiosidad por entender cómo funcionan las aplicaciones web que uso diariamente.
                                </p>
                                <p>
                                    Me especializo en <strong>desarrollo fullstack</strong>, con un enfoque particular 
                                    en crear experiencias de usuario excepcionales. Creo firmemente que la tecnología 
                                    debe ser accesible y útil para todos.
                                </p>
                                <p>
                                    Cuando no estoy programando, me gusta explorar nuevas tecnologías, contribuir a 
                                    proyectos de código abierto y mantenerme actualizado con las últimas tendencias 
                                    del desarrollo web.
                                </p>
                                
                                <div className="contact-link-container">
                                    <button
                                        className={`contact-link ${currentPage === 'Contacto' ? 'active' : ''}`}
                                        id="Contacto"
                                        onClick={() => handleNavLinkClick('Contacto')}
                                    >
                                        <span className="contact-icon">✉</span>
                                        <span className="contact-text">Contáctame</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <div className="foto-perfil">
                                <div className="foto-container">
                                    <div className="foto-placeholder">
                                        <i className="fas fa-user"></i>
                                        <p>Foto de perfil</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Habilidades */}
                <div className="habilidades-section">
                    <h3>Mis Habilidades</h3>
                    <div className="habilidades-grid">
                        {habilidades.map((habilidad, index) => (
                            <div key={index} className="habilidad-item">
                                <div className="habilidad-header">
                                    <i className={habilidad.icono}></i>
                                    <span className="habilidad-nombre">{habilidad.nombre}</span>
                                    <span className="habilidad-porcentaje">{habilidad.nivel}%</span>
                                </div>
                                <div className="habilidad-bar">
                                    <div 
                                        className="habilidad-progress" 
                                        style={{ width: `${habilidad.nivel}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experiencia */}
                <div className="experiencia-section">
                    <h3>Experiencia Profesional</h3>
                    <div className="timeline">
                        {experiencias.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>{exp.titulo}</h4>
                                    <h5>{exp.empresa}</h5>
                                    <span className="timeline-periodo">{exp.periodo}</span>
                                    <p>{exp.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educación */}
                <div className="educacion-section">
                    <h3>Educación</h3>
                    <div className="timeline">
                        {educacion.map((edu, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>{edu.titulo}</h4>
                                    <h5>{edu.institucion}</h5>
                                    <span className="timeline-periodo">{edu.periodo}</span>
                                    <p>{edu.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tecnologías */}
                <div className="tecnologias-section">
                    <h3>Tecnologías que Manejo</h3>
                    <div className="tecnologias-grid">
                        <div className="tech-category">
                            <h4>Frontend</h4>
                            <div className="tech-items">
                                <span className="tech-tag">React</span>
                                <span className="tech-tag">JavaScript</span>
                                <span className="tech-tag">HTML5</span>
                                <span className="tech-tag">CSS3</span>
                                <span className="tech-tag">Bootstrap</span>
                                <span className="tech-tag">Angular</span>
                            </div>
                        </div>
                        <div className="tech-category">
                            <h4>Backend</h4>
                            <div className="tech-items">
                                <span className="tech-tag">Node.js</span>
                                <span className="tech-tag">Java</span>
                                <span className="tech-tag">.NET Core</span>
                                <span className="tech-tag">PHP</span>
                            </div>
                        </div>
                        <div className="tech-category">
                            <h4>Base de Datos</h4>
                            <div className="tech-items">
                                <span className="tech-tag">MySQL</span>
                                <span className="tech-tag">MsSQL</span>
                                <span className="tech-tag">MongoDB</span>
                            </div>
                        </div>
                        <div className="tech-category">
                            <h4>Herramientas</h4>
                            <div className="tech-items">
                                <span className="tech-tag">Git</span>
                                <span className="tech-tag">GitHub</span>
                                <span className="tech-tag">VS Code</span>
                                <span className="tech-tag">Android Studio</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SobreMi;
