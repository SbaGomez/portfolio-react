import React, { useState } from 'react';
import styles from './Proyectos.module.css';

function Proyectos() {
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
    const [imagenActual, setImagenActual] = useState(0);
    const [imagenAmpliada, setImagenAmpliada] = useState(null);

    const proyectos = [
        {
            id: 1,
            titulo: "Servidor MUOnline",
            descripcion: "Servidor privado de MU Online con web moderna responsiva, sistema de archivos Louis Season 6 y panel de administración completo para gestión de jugadores y eventos.",
            descripcionCompleta: "Servidor privado completo de MU Online desarrollado con tecnologías modernas. Incluye una página web responsiva con diseño atractivo, sistema de registro y login de jugadores, panel de administración para gestión de usuarios, eventos y configuraciones del servidor. Utiliza archivos de Louis Season 6 para una experiencia de juego auténtica. La web cuenta con sistema de ranking, noticias, descarga de cliente y estadísticas en tiempo real.",
            imagen: "/proyectos/bakastamu.png",
            imagenes: [
                "/proyectos/bakastamu.png"
            ],
            tecnologias: ["PHP", "Bootstrap", "MsSQL"],
            linkDemo: "https://bakastamu.net",
            linkGitHub: "#",
            demoHabilitado: true,
            githubHabilitado: false,
            destacado: true,
            caracteristicas: [
                "Web responsiva moderna",
                "Sistema Louis Season 6",
                "Panel de administración",
                "Sistema de ranking",
                "Estadísticas en tiempo real",
                "Descarga de cliente",
                "Gestión de eventos"
            ]
        },
        {
            id: 2,
            titulo: "Calculadora 3D",
            descripcion: "Aplicación web para calcular precios de impresión 3D con interfaz intuitiva y cálculos precisos de materiales y costos.",
            descripcionCompleta: "Aplicación web especializada para el cálculo de precios en impresión 3D. Permite a los usuarios calcular costos basados en material, tiempo de impresión, complejidad del modelo y otros factores.",
            imagen: "/proyectos/calculadora-3d.png",
            imagenes: [
                "/proyectos/calculadora-3d.png"
            ],
            tecnologias: ["JavaScript", "CSS3", "HTML5"],
            linkDemo: "https://sebastiangomez.com.ar/Calculadora3D/",
            linkGitHub: "#",
            demoHabilitado: true,
            githubHabilitado: false,
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
            titulo: "Portfolio Personal",
            descripcion: "Sitio web personal desarrollado con React, mostrando mis habilidades y proyectos. Incluye diseño responsivo y animaciones modernas.",
            descripcionCompleta: "Aplicación web completa desarrollada con React que demuestra habilidades en desarrollo frontend moderno. La aplicación incluye múltiples secciones interactivas, sistema de navegación fluido, galería de proyectos con modales, formulario de contacto funcional y diseño completamente responsivo. Utiliza técnicas avanzadas de CSS como gradientes, animaciones, flexbox y grid para crear una experiencia de usuario excepcional. El proyecto está optimizado para rendimiento y SEO, con carga rápida y estructura semántica.",
            imagen: "/proyectos/portfolio-personal.png",
            imagenes: [
                "/proyectos/portfolio-personal.png",
                "/proyectos/portfolio-contacto.png",
            ],
            tecnologias: ["React", "CSS3", "JavaScript", "HTML5"],
            linkDemo: "https://sebastiangomez.com.ar/",
            linkGitHub: "https://github.com/SbaGomez/portfolio-react",
            demoHabilitado: true,
            githubHabilitado: true,
            destacado: false,
            caracteristicas: [
                "Interfaz moderna y elegante",
                "Diseño completamente responsivo",
                "Animaciones CSS avanzadas",
                "Sistema de navegación fluido",
                "Galería de proyectos interactiva",
                "Formulario de contacto funcional",
                "Optimización de rendimiento",
                "Código limpio y mantenible"
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

    const abrirImagenAmpliada = (imagenSrc) => {
        setImagenAmpliada(imagenSrc);
    };

    const cerrarImagenAmpliada = () => {
        setImagenAmpliada(null);
    };

    return (
        <section className={styles.proyectosSection}>
            <div className="container">
                <h2 className={styles.proyectosTitle}>Proyectos personales</h2>
                <div className={styles.proyectosGrid}>
                    {proyectos.map((proyecto) => (
                        <div
                            key={proyecto.id}
                            className={`${styles.proyectoCard} ${proyecto.destacado ? styles.proyectoCardDestacado : ''}`}
                        >
                            <div className={styles.proyectoImagen}>
                                <img src={proyecto.imagen} alt={proyecto.titulo} />
                            </div>
                            <div className={styles.proyectoContenido}>
                                <h3>{proyecto.titulo}</h3>
                                <p>{proyecto.descripcion}</p>
                                <div className={styles.proyectoTecnologias}>
                                    {proyecto.tecnologias.map((tech, index) => (
                                        <span key={index} className={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                                <button className={styles.btnVerMas} onClick={() => abrirModal(proyecto)}>
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
                <div className={styles.modalOverlay} onClick={cerrarModal}>
                    <div className={styles.modalContenido} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalCerrar} onClick={cerrarModal}>
                            <i className="fas fa-times"></i>
                        </button>

                        <div className={styles.modalHeader}>
                            <h2>{proyectoSeleccionado.titulo}</h2>
                            {proyectoSeleccionado.destacado && <span className={styles.destacadoBadge}>⭐ Destacado</span>}
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.modalSlider}>
                                <div className={styles.sliderContainer}>
                                    <button className={`${styles.sliderBtn} ${styles.sliderPrev}`} onClick={imagenAnterior}>
                                        <i className="fas fa-chevron-left"></i>
                                    </button>

                                    <div className={styles.sliderImagen} onClick={() => abrirImagenAmpliada(proyectoSeleccionado.imagenes[imagenActual])}>
                                        <img
                                            src={proyectoSeleccionado.imagenes[imagenActual]}
                                            alt={`${proyectoSeleccionado.titulo} - Imagen ${imagenActual + 1}`}
                                        />
                                    </div>

                                    <button className={`${styles.sliderBtn} ${styles.sliderNext}`} onClick={siguienteImagen}>
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>

                                <div className={styles.sliderIndicadores}>
                                    {proyectoSeleccionado.imagenes.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.indicador} ${index === imagenActual ? styles.indicadorActivo : ''}`}
                                            onClick={() => setImagenActual(index)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className={styles.modalInfo}>
                                <div className={styles.infoSection}>
                                    <h3>Descripción</h3>
                                    <p>{proyectoSeleccionado.descripcionCompleta}</p>
                                </div>

                                <div className={styles.infoSection}>
                                    <h3>Características</h3>
                                    <ul className={styles.caracteristicasLista}>
                                        {proyectoSeleccionado.caracteristicas.map((caracteristica, index) => (
                                            <li key={index}>
                                                <i className="fas fa-check"></i>
                                                {caracteristica}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.infoSection}>
                                    <h3>Tecnologías</h3>
                                    <div className={styles.modalTecnologias}>
                                        {proyectoSeleccionado.tecnologias.map((tech, index) => (
                                            <span key={index} className={styles.techTagModal}>{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.infoSection}>
                                    <h3>Enlaces</h3>
                                    <div className={styles.modalEnlaces}>
                                        {proyectoSeleccionado.demoHabilitado && (
                                            <a href={proyectoSeleccionado.linkDemo} target="_blank" rel="noopener noreferrer" className={styles.btnModalDemo}>
                                                <i className="fas fa-external-link-alt"></i>
                                                Ver Demo
                                            </a>
                                        )}
                                        {proyectoSeleccionado.githubHabilitado && (
                                            <a href={proyectoSeleccionado.linkGitHub} target="_blank" rel="noopener noreferrer" className={styles.btnModalGithub}>
                                                <i className="fab fa-github"></i>
                                                Ver Código
                                            </a>
                                        )}
                                        {!proyectoSeleccionado.demoHabilitado && !proyectoSeleccionado.githubHabilitado && (
                                            <p className={styles.noEnlaces}>Enlaces no disponibles</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Imagen Ampliada */}
            {imagenAmpliada && (
                <div className={styles.modalImagenOverlay} onClick={cerrarImagenAmpliada}>
                    <div className={styles.modalImagenContenido} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalImagenCerrar} onClick={cerrarImagenAmpliada}>
                            <i className="fas fa-times"></i>
                        </button>
                        <img src={imagenAmpliada} alt="Imagen ampliada" className={styles.imagenAmpliada} />
                    </div>
                </div>
            )}
        </section>
    );
}

export default Proyectos;
