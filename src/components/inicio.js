import './Inicio.css';

function Inicio() {
    return (
        <section id="home">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <h2>Sebastian Gomez <img className="verificado" src="/verificado.png" alt="Verificado" /></h2>
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
                                <a href="#linkedin"><i className="fab fa-linkedin fa-lg me-sm-3 linkedin"></i></a>
                                <a href="#gmail"><i className="fas fa-envelope fa-lg me-sm-3 gmail"></i></a>
                                <a href="#whatsapp"><i className="fab fa-whatsapp fa-lg me-sm-3 whatsapp"></i></a>
                                <a href="#github"><i className="fab fa-github fa-lg me-sm-3 github"></i></a>
                                <a href="#pdf"><i className="far fa-file-pdf fa-lg pdf"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-center">
                            <img src="/juegos/warzone.webp" alt="warzone" style={{ maxWidth: '100%', height: 'auto' }} width="300px" height="200px" />
                            <h3>Warzone 2.0</h3>
                            <p>En Call of Duty: Warzone, un popular videojuego de battle royale, los jugadores se sumergen
                                en intensos enfrentamientos en un vasto mapa abierto ambientado en la ficticia ciudad de
                                Verdansk.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Inicio;
