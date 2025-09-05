import './Inicio.css';

function Inicio() {
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
                            <div className="pd-5 px-md-4">
                                <a href="#whatsapp"><i className="fab fa-whatsapp fa-lg me-sm-3 whatsapp"></i></a>
                                <a href="#instagram"><i className="fab fa-instagram fa-lg me-sm-3 instagram"></i></a>
                            </div>
                        </div>
                        
                        {/* Container de Tecnologías - Separado */}
                        <div className="bg-dark-inicio text-secondary px-4 py-5 text-center">
                            <h4 className="tecnologias-title">Tecnologías que manejo</h4>
                            <div className="tecnologias-simple">
                                <img src="/tecnologias/React.svg" alt="React" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/JavaScript.svg" alt="JavaScript" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/HTML5.svg" alt="HTML5" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/CSS3.svg" alt="CSS3" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/Bootstrap.svg" alt="Bootstrap" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/nodejs.png" alt="Node.js" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/MySQL.svg" alt="MySQL" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/java.svg" alt="Java" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/angular.svg" alt="Angular" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/NETcore.svg" alt=".NET Core" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                                <img src="/tecnologias/android.svg" alt="Android" className="tech-logo" style={{width: '120px', height: '120px', display: 'block'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Inicio;