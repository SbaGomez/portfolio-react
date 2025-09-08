import styles from './Inicio.module.css';
import { useNavigation } from '../hooks/useNavigation';

function Inicio() {
    const navigateWithScroll = useNavigation();
    return (
        <section className={styles.homeSection}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.titleContainer}>
                            <h2 className={styles.homeTitle}>Sebastian Gomez</h2>
                            <span className={styles.devBadge}>.Dev</span>
                        </div>
                        <div className={`${styles.bgDarkInicio} text-secondary px-4 py-5 text-center`}>
                            <p className="lead">
                                <strong>Desarrollador web Fullstack</strong> con habilidades en el
                                <strong> frontend</strong> y <strong>backend</strong>.
                            </p>
                            <p className="lead">Mi interés en el <strong>desarrollo web</strong> se centra en crear
                                <strong> soluciones creativas e innovadoras</strong> que mejoren la vida de las
                                personas y hagan crecer los negocios. Me mantengo actualizado en las
                                <strong> últimas tecnologías y tendencias</strong> de la industria para crear
                                aplicaciones eficientes y escalables...
                            </p>
                            <p className="lead">En mi <strong>portfolio</strong> encontrarás algunos de los proyectos en
                                los que
                                he trabajado, desde <strong>aplicaciones web simples</strong> hasta complejos
                                <strong> juegos en línea</strong>. Si buscas un <strong>desarrollador
                                    comprometido</strong>, ¡contáctame!
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

                        {/* Container de Tecnologías - Separado */}
                        <div className={`${styles.bgDarkInicio} text-secondary px-4 py-5 text-center`}>
                            <h4 className={styles.tecnologiasTitle}>Tecnologías que manejo</h4>
                            <div className={styles.tecnologiasSimple}>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/React.svg" alt="React" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>React - React Native</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/JavaScript.svg" alt="JavaScript" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>JavaScript - TypeScript</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/HTML5.svg" alt="HTML5" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>HTML5</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/CSS3.svg" alt="CSS3" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>CSS3</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/Bootstrap.svg" alt="Bootstrap" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>Bootstrap</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/nodejs.png" alt="Node.js" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>Node.js</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/MySQL.svg" alt="MySQL" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>MySQL</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/mongodb.svg" alt="MongoDB" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>MongoDB</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/java.svg" alt="Java" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>Java - Spring Boot</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/angular.svg" alt="Angular" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>Angular - Angular Material</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/NETcore.svg" alt=".NET Core" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>.NET Core</span>
                                </div>
                                <div className={styles.techItem}>
                                    <img src="/tecnologias/android.svg" alt="Android" className={styles.techLogo} style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className={styles.techName}>Kotlin - Android Studio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Inicio;