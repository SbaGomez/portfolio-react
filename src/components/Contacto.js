import React, { useState } from 'react';
import './Inicio.css';
import './Contacto.css';
import { sendEmail } from '../config/emailjs';
import { contactConfig } from '../config/contactConfig';

function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitProgress, setSubmitProgress] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitProgress(0);

        // Simular progreso durante el envío
        const progressInterval = setInterval(() => {
            setSubmitProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 15;
            });
        }, 200);

        try {
            // Enviar email usando EmailJS
            const result = await sendEmail(formData);
            
            clearInterval(progressInterval);
            setSubmitProgress(100);
            
            if (result.success) {
                setSubmitStatus('success');
                setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
            } else {
                setSubmitStatus('error');
                console.error('Error al enviar email:', result.error);
            }
        } catch (error) {
            clearInterval(progressInterval);
            setSubmitStatus('error');
            console.error('Error al enviar email:', error);
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitProgress(0);
            }, 1000);
        }
    };

    const contactInfo = contactConfig.contactInfo;
    const socialLinks = Object.values(contactConfig.socialMedia).filter(social => 
        social.name === 'Instagram' || social.name === 'GitHub' || social.name === 'LinkedIn' || social.name === 'Twitter'
    );

    return (
        <section id="contacto">
            <div className="container">
                <h2>Contacto</h2>
                
                <div className="contacto-content">
                    <div className="contacto-info">
                        <div className="info-section">
                            <h3>¡Hablemos!</h3>
                            <p>
                                ¿Tienes un proyecto en mente? ¿Quieres colaborar? 
                                Me encantaría escuchar sobre tu idea y cómo puedo ayudarte a hacerla realidad.
                            </p>
                        </div>

                        <div className="contact-details">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="contact-item">
                                    <div className="contact-icon">
                                        <i className={info.icon}></i>
                                    </div>
                                    <div className="contact-text">
                                        <h4>{info.title}</h4>
                                        <a href={info.link}>{info.value}</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="social-links">
                            <h4>Sígueme en redes</h4>
                            <div className="social-icons">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        style={{ '--social-color': social.color }}
                                        title={social.name}
                                    >
                                        <i className={social.icon}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="contacto-form">
                        <form onSubmit={handleSubmit} className="formulario">
                            <div className="form-group">
                                <label htmlFor="nombre">NOMBRE:</label>
                                <div className="input-container">
                                    <i className="fas fa-user input-icon"></i>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                        placeholder="Escribe tu nombre completo"
                                    />
                                </div>
                                <div className="helper-text">
                                    Ingresa tu nombre y apellido
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">EMAIL:</label>
                                <div className="input-container">
                                    <i className="fas fa-envelope input-icon"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <div className="helper-text">
                                    Por favor, usa un email válido
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="asunto">ASUNTO:</label>
                                <div className="input-container">
                                    <i className="fas fa-tag input-icon"></i>
                                    <input
                                        type="text"
                                        id="asunto"
                                        name="asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        required
                                        placeholder="¿De qué quieres hablar?"
                                    />
                                </div>
                                <div className="helper-text">
                                    Describe brevemente el tema de tu mensaje
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="mensaje">MENSAJE:</label>
                                <div className="input-container">
                                    <i className="fas fa-comment input-icon"></i>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder="Cuéntame sobre tu proyecto o idea..."
                                    ></textarea>
                                </div>
                                <div className="helper-text">
                                    Escribe tu mensaje detallado aquí
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-enviar"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Enviando... {Math.round(submitProgress)}%
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i>
                                        Enviar Mensaje
                                    </>
                                )}
                            </button>

                            {isSubmitting && (
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill" 
                                        style={{ width: `${submitProgress}%` }}
                                    ></div>
                                </div>
                            )}

                            {submitStatus === 'success' && (
                                <div className="alert alert-success">
                                    <i className="fas fa-check-circle"></i>
                                    ¡Mensaje enviado correctamente! Te responderé pronto.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="alert alert-error">
                                    <i className="fas fa-exclamation-circle"></i>
                                    Hubo un error al enviar el mensaje. Inténtalo de nuevo.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacto;
