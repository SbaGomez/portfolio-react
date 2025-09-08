import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import styles from './SobreMi.module.css';

function SobreMi() {
    const navigateWithScroll = useNavigation();

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
        <section id="sobre-mi" className={styles.sobreMiSection}>
            <div className="container">
                <div className={styles.sobreMiHeader}>
                    <h2>Sobre Mí</h2>
                    <p className={styles.sobreMiSubtitle}>Conoce más sobre mi experiencia y habilidades</p>
                </div>

                {/* Información Personal */}
                <div className={styles.sobreMiContent}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={styles.infoPersonal}>
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
                                
                                <div className={styles.contactLinkContainer}>
                                    <button
                                        className={styles.contactLink}
                                        onClick={() => navigateWithScroll('/contacto')}
                                    >
                                        <span className={styles.contactIcon}>✉</span>
                                        <span className={styles.contactText}>Contáctame</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <div className={styles.fotoPerfil}>
                                <div className={styles.fotoContainer}>
                                    <div className={styles.fotoPlaceholder}>
                                        <i className="fas fa-user"></i>
                                        <p>Foto de perfil</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Habilidades */}
                <div className={styles.habilidadesSection}>
                    <h3>Mis Habilidades</h3>
                    <div className={styles.habilidadesGrid}>
                        {habilidades.map((habilidad, index) => (
                            <div key={index} className={styles.habilidadItem}>
                                <div className={styles.habilidadHeader}>
                                    <i className={habilidad.icono}></i>
                                    <span className={styles.habilidadNombre}>{habilidad.nombre}</span>
                                    <span className={styles.habilidadPorcentaje}>{habilidad.nivel}%</span>
                                </div>
                                <div className={styles.habilidadBar}>
                                    <div 
                                        className={styles.habilidadProgress} 
                                        style={{ width: `${habilidad.nivel}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experiencia */}
                <div className={styles.experienciaSection}>
                    <h3>Experiencia Profesional</h3>
                    <div className={styles.timeline}>
                        {experiencias.map((exp, index) => (
                            <div key={index} className={styles.timelineItem}>
                                <div className={styles.timelineMarker}></div>
                                <div className={styles.timelineContent}>
                                    <h4>{exp.titulo}</h4>
                                    <h5>{exp.empresa}</h5>
                                    <span className={styles.timelinePeriodo}>{exp.periodo}</span>
                                    <p>{exp.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educación */}
                <div className={styles.educacionSection}>
                    <h3>Educación</h3>
                    <div className={styles.timeline}>
                        {educacion.map((edu, index) => (
                            <div key={index} className={styles.timelineItem}>
                                <div className={styles.timelineMarker}></div>
                                <div className={styles.timelineContent}>
                                    <h4>{edu.titulo}</h4>
                                    <h5>{edu.institucion}</h5>
                                    <span className={styles.timelinePeriodo}>{edu.periodo}</span>
                                    <p>{edu.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tecnologías */}
                <div className={styles.tecnologiasSection}>
                    <h3>Tecnologías que Manejo</h3>
                    <div className={styles.tecnologiasGrid}>
                        <div className={styles.techCategory}>
                            <h4>Frontend</h4>
                            <div className={styles.techItems}>
                                <span className={`${styles.techTag} ${styles.techTagLightBlue}`}>React</span>
                                <span className={`${styles.techTag} ${styles.techTagDarkBlue}`}>JavaScript</span>
                                <span className={`${styles.techTag} ${styles.techTagYellow}`}>HTML5</span>
                                <span className={`${styles.techTag} ${styles.techTagOrange}`}>CSS3</span>
                                <span className={`${styles.techTag} ${styles.techTagMediumBlue}`}>Bootstrap</span>
                                <span className={`${styles.techTag} ${styles.techTagPurple}`}>Angular</span>
                            </div>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Backend</h4>
                            <div className={styles.techItems}>
                                <span className={`${styles.techTag} ${styles.techTagLightBlue}`}>Node.js</span>
                                <span className={`${styles.techTag} ${styles.techTagMediumBlue}`}>Java</span>
                                <span className={`${styles.techTag} ${styles.techTagYellow}`}>.NET Core</span>
                                <span className={`${styles.techTag} ${styles.techTagOrange}`}>PHP</span>
                            </div>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Base de Datos</h4>
                            <div className={styles.techItems}>
                                <span className={`${styles.techTag} ${styles.techTagLightBlue}`}>MySQL</span>
                                <span className={`${styles.techTag} ${styles.techTagMediumBlue}`}>MsSQL</span>
                                <span className={`${styles.techTag} ${styles.techTagYellow}`}>MongoDB</span>
                            </div>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Herramientas</h4>
                            <div className={styles.techItems}>
                                <span className={`${styles.techTag} ${styles.techTagLightBlue}`}>Git</span>
                                <span className={`${styles.techTag} ${styles.techTagMediumBlue}`}>GitHub</span>
                                <span className={`${styles.techTag} ${styles.techTagYellow}`}>VS Code</span>
                                <span className={`${styles.techTag} ${styles.techTagOrange}`}>Android Studio</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SobreMi;
