import React, { useState } from 'react';
import './Inicio.css';
import './Proyectos.css';

function Proyectos() {
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
    const [imagenActual, setImagenActual] = useState(0);

    const proyectos = [
        {
            id: 1,
            titulo: "Portfolio Personal",
            descripcion: "Sitio web personal desarrollado con React, mostrando mis habilidades y proyectos. Incluye diseño responsivo y animaciones modernas.",
            descripcionCompleta: "Este portfolio personal fue desarrollado completamente en React con un diseño moderno y responsivo. Incluye secciones de presentación, proyectos, habilidades técnicas y contacto. Utiliza animaciones CSS avanzadas, gradientes modernos y un sistema de navegación fluido. El proyecto demuestra habilidades en desarrollo frontend, diseño UX/UI y optimización de rendimiento.",
            imagen: "/tecnologias/React.svg",
            imagenes: [
                "/tecnologias/React.svg",
                "/tecnologias/JavaScript.svg",
                "/tecnologias/CSS3.svg",
                "/tecnologias/HTML5.svg"
            ],
            tecnologias: ["React", "CSS3", "JavaScript", "HTML5"],
            linkDemo: "https://tu-portfolio.com",
            linkGitHub: "https://github.com/tu-usuario/portfolio",
            destacado: true,
            caracteristicas: [
                "Diseño responsivo",
                "Animaciones CSS",
                "Optimización SEO",
                "Carga rápida",
                "Navegación intuitiva"
            ]
        },
        {
            id: 2,
            titulo: "Calculadora 3D",
            descripcion: "Aplicación web para calcular precios de impresión 3D con interfaz intuitiva y cálculos precisos de materiales y costos.",
            descripcionCompleta: "Aplicación web especializada para el cálculo de precios en impresión 3D. Permite a los usuarios calcular costos basados en material, tiempo de impresión, complejidad del modelo y otros factores. Incluye base de datos de materiales, calculadora de volumen y estimador de tiempo. Interfaz intuitiva con validación en tiempo real.",
            imagen: "/tecnologias/JavaScript.svg",
            imagenes: [
                "/tecnologias/JavaScript.svg",
                "/tecnologias/CSS3.svg",
                "/tecnologias/HTML5.svg"
            ],
            tecnologias: ["JavaScript", "CSS3", "HTML5"],
            linkDemo: "https://calculadora-3d.com",
            linkGitHub: "https://github.com/tu-usuario/calculadora-3d",
            destacado: false,
            caracteristicas: [
                "Cálculos precisos",
                "Base de datos de materiales",
                "Interfaz intuitiva",
                "Validación en tiempo real",
                "Exportación de resultados"
            ]
        },
        {
            id: 3,
            titulo: "Sistema de Gestión",
            descripcion: "Aplicación full-stack para gestión de inventario con base de datos MySQL y panel de administración completo.",
            descripcionCompleta: "Sistema completo de gestión empresarial desarrollado con React y Node.js. Incluye módulos de inventario, usuarios, reportes y administración. Base de datos MySQL con relaciones complejas, autenticación JWT, panel de administración con gráficos en tiempo real y sistema de notificaciones. API RESTful con documentación completa.",
            imagen: "/tecnologias/MySQL.svg",
            imagenes: [
                "/tecnologias/MySQL.svg",
                "/tecnologias/React.svg",
                "/tecnologias/nodejs.svg",
                "/tecnologias/Bootstrap.svg"
            ],
            tecnologias: ["React", "Node.js", "MySQL", "Bootstrap"],
            linkDemo: "https://sistema-gestion.com",
            linkGitHub: "https://github.com/tu-usuario/sistema-gestion",
            destacado: true,
            caracteristicas: [
                "Panel de administración",
                "Base de datos relacional",
                "Autenticación JWT",
                "Reportes en tiempo real",
                "API RESTful"
            ]
        },
        {
            id: 4,
            titulo: "E-commerce Moderno",
            descripcion: "Tienda online completa con carrito de compras, pagos integrados y panel de administración para productos.",
            descripcionCompleta: "Plataforma de comercio electrónico completa desarrollada con React y Node.js. Incluye catálogo de productos, carrito de compras, sistema de pagos con Stripe, gestión de usuarios, panel de administración y sistema de reviews. Base de datos MongoDB para escalabilidad, autenticación segura y diseño mobile-first.",
            imagen: "/tecnologias/Bootstrap.svg",
            imagenes: [
                "/tecnologias/Bootstrap.svg",
                "/tecnologias/React.svg",
                "/tecnologias/nodejs.svg",
                "/tecnologias/JavaScript.svg"
            ],
            tecnologias: ["React", "Bootstrap", "Node.js", "MongoDB"],
            linkDemo: "https://ecommerce-demo.com",
            linkGitHub: "https://github.com/tu-usuario/ecommerce",
            destacado: false,
            caracteristicas: [
                "Carrito de compras",
                "Pagos integrados",
                "Panel de administración",
                "Sistema de reviews",
                "Diseño mobile-first"
            ]
        }
    ];

    const abrirModal = (proyecto) => {
        setProyectoSeleccionado(proyecto);
        setImagenActual(0);
    };

    const cerrarModal = () => {
        setProyectoSeleccionado(null);
        setImagenActual(0);
    };

    const siguienteImagen = () => {
        if (proyectoSeleccionado) {
            setImagenActual((prev) => 
                prev === proyectoSeleccionado.imagenes.length - 1 ? 0 : prev + 1
            );
        }
    };

    const imagenAnterior = () => {
        if (proyectoSeleccionado) {
            setImagenActual((prev) => 
                prev === 0 ? proyectoSeleccionado.imagenes.length - 1 : prev - 1
            );
        }
    };

    return (
        <section id="proyectos">
            <div className="container">
                <h2>Proyectos</h2>
                <div className="proyectos-grid">
                    {proyectos.map((proyecto) => (
                        <div 
                            key={proyecto.id} 
                            className={`proyecto-card ${proyecto.destacado ? 'destacado' : ''}`}
                        >
                            <div className="proyecto-imagen">
                                <img src={proyecto.imagen} alt={proyecto.titulo} />
                            </div>
                            <div className="proyecto-contenido">
                                <h3>{proyecto.titulo}</h3>
                                <p>{proyecto.descripcion}</p>
                                <div className="proyecto-tecnologias">
                                    {proyecto.tecnologias.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <button className="btn-ver-mas" onClick={() => abrirModal(proyecto)}>
                                    <i className="fas fa-eye"></i>
                                    Ver más detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Proyecto */}
            {proyectoSeleccionado && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-cerrar" onClick={cerrarModal}>
                            <i className="fas fa-times"></i>
                        </button>
                        
                        <div className="modal-header">
                            <h2>{proyectoSeleccionado.titulo}</h2>
                            {proyectoSeleccionado.destacado && <span className="destacado-badge">⭐ Destacado</span>}
                        </div>

                        <div className="modal-body">
                            <div className="modal-slider">
                                <div className="slider-container">
                                    <button className="slider-btn slider-prev" onClick={imagenAnterior}>
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    
                                    <div className="slider-imagen">
                                        <img 
                                            src={proyectoSeleccionado.imagenes[imagenActual]} 
                                            alt={`${proyectoSeleccionado.titulo} - Imagen ${imagenActual + 1}`}
                                        />
                                    </div>
                                    
                                    <button className="slider-btn slider-next" onClick={siguienteImagen}>
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                
                                <div className="slider-indicadores">
                                    {proyectoSeleccionado.imagenes.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`indicador ${index === imagenActual ? 'activo' : ''}`}
                                            onClick={() => setImagenActual(index)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="modal-info">
                                <div className="info-section">
                                    <h3>Descripción</h3>
                                    <p>{proyectoSeleccionado.descripcionCompleta}</p>
                                </div>

                                <div className="info-section">
                                    <h3>Características</h3>
                                    <ul className="caracteristicas-lista">
                                        {proyectoSeleccionado.caracteristicas.map((caracteristica, index) => (
                                            <li key={index}>
                                                <i className="fas fa-check"></i>
                                                {caracteristica}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="info-section">
                                    <h3>Tecnologías</h3>
                                    <div className="modal-tecnologias">
                                        {proyectoSeleccionado.tecnologias.map((tech, index) => (
                                            <span key={index} className="tech-tag-modal">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h3>Enlaces</h3>
                                    <div className="modal-enlaces">
                                        <a href={proyectoSeleccionado.linkDemo} target="_blank" rel="noopener noreferrer" className="btn-modal-demo">
                                            <i className="fas fa-external-link-alt"></i>
                                            Ver Demo
                                        </a>
                                        <a href={proyectoSeleccionado.linkGitHub} target="_blank" rel="noopener noreferrer" className="btn-modal-github">
                                            <i className="fab fa-github"></i>
                                            Ver Código
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Proyectos;
