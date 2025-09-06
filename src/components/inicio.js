import './Inicio.css';

function Inicio({ onPageChange, currentPage }) {
    const handleNavLinkClick = (pageId) => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse hacia arriba
        onPageChange(pageId);
    };
    return (
        <section id="home">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Sebastian Gomez Developer</h2>
                        <div className="bg-dark-inicio text-secondary px-4 py-5 text-center">
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

                        {/* Container de Tecnologías - Separado */}
                        <div className="bg-dark-inicio text-secondary px-4 py-5 text-center">
                            <h4 className="tecnologias-title">Tecnologías que manejo</h4>
                            <div className="tecnologias-simple">
                                <div className="tech-item">
                                    <img src="/tecnologias/React.svg" alt="React" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">React</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/JavaScript.svg" alt="JavaScript" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">JavaScript</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/HTML5.svg" alt="HTML5" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">HTML5</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/CSS3.svg" alt="CSS3" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">CSS3</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/Bootstrap.svg" alt="Bootstrap" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">Bootstrap</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/nodejs.png" alt="Node.js" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">Node.js</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/MySQL.svg" alt="MySQL" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">MySQL</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/java.svg" alt="Java" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">Java</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/angular.svg" alt="Angular" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">Angular</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/NETcore.svg" alt=".NET Core" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">.NET Core</span>
                                </div>
                                <div className="tech-item">
                                    <img src="/tecnologias/android.svg" alt="Android" className="tech-logo" style={{ width: '120px', height: '120px', display: 'block' }} />
                                    <span className="tech-name">Android</span>
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