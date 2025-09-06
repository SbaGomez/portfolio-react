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
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [retryCount, setRetryCount] = useState(0);

    // Función para validar email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Función para validar un campo específico
    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'nombre':
                if (!value.trim()) {
                    error = 'El nombre es requerido';
                } else if (value.trim().length < 2) {
                    error = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'El email es requerido';
                } else if (!validateEmail(value)) {
                    error = 'Por favor, usa un email válido';
                }
                break;
            case 'asunto':
                if (!value.trim()) {
                    error = 'El asunto es requerido';
                } else if (value.trim().length < 3) {
                    error = 'El asunto debe tener al menos 3 caracteres';
                }
                break;
            case 'mensaje':
                if (!value.trim()) {
                    error = 'El mensaje es requerido';
                } else if (value.trim().length < 10) {
                    error = 'El mensaje debe tener al menos 10 caracteres';
                }
                break;
            default:
                break;
        }
        
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar el campo en tiempo real
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validar el campo cuando pierde el foco
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Marcar todos los campos como tocados
        const allTouched = {
            nombre: true,
            email: true,
            asunto: true,
            mensaje: true
        };
        setTouched(allTouched);

        // Validar todos los campos
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);

        // Si hay errores, enfocar el primer campo con error y no enviar
        if (Object.keys(newErrors).length > 0) {
            const firstErrorField = Object.keys(newErrors)[0];
            const errorElement = document.getElementById(firstErrorField);
            if (errorElement) {
                errorElement.focus();
            }
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitProgress(0);

        // Simular progreso durante el envío (más realista)
        const progressInterval = setInterval(() => {
            setSubmitProgress(prev => {
                if (prev >= 85) return prev; // Parar en 85% hasta recibir respuesta
                return prev + Math.random() * 8 + 2; // Progreso más gradual
            });
        }, 300);

        try {
            // Enviar email usando EmailJS
            const result = await sendEmail(formData);
            
            clearInterval(progressInterval);
            setSubmitProgress(100);
            
            if (result.success) {
                setSubmitStatus('success');
                setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
                setErrors({});
                setTouched({});
                setRetryCount(0); // Resetear contador de reintentos
            } else {
                // Si falla y no hemos reintentado, intentar una vez más
                if (retryCount < 1 && (result.error.includes('Timeout') || result.error.includes('Network'))) {
                    setRetryCount(prev => prev + 1);
                    console.log(`🔄 Reintentando envío (intento ${retryCount + 1}/2)...`);
                    
                    // Esperar 2 segundos antes del reintento
                    setTimeout(() => {
                        handleSubmit(e);
                    }, 2000);
                    return;
                } else {
                    setSubmitStatus('error');
                    console.error('Error al enviar email:', result.error);
                }
            }
        } catch (error) {
            clearInterval(progressInterval);
            
            // Si es un error de red y no hemos reintentado, intentar una vez más
            if (retryCount < 1 && (error.message.includes('Timeout') || error.message.includes('Network'))) {
                setRetryCount(prev => prev + 1);
                console.log(`🔄 Reintentando envío (intento ${retryCount + 1}/2)...`);
                
                // Esperar 2 segundos antes del reintento
                setTimeout(() => {
                    handleSubmit(e);
                }, 2000);
                return;
            } else {
                setSubmitStatus('error');
                console.error('Error al enviar email:', error);
            }
        } finally {
            // Limpiar el intervalo de progreso
            clearInterval(progressInterval);
            
            // Esperar un poco antes de ocultar el estado de envío
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitProgress(0);
            }, 1500);
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
                                        onBlur={handleBlur}
                                        placeholder="Escribe tu nombre completo"
                                        className={touched.nombre && errors.nombre ? 'error' : ''}
                                    />
                                </div>
                                {touched.nombre && errors.nombre ? (
                                    <div className="error-text">
                                        {errors.nombre}
                                    </div>
                                ) : (
                                    <div className="helper-text">
                                        Ingresa tu nombre y apellido
                                    </div>
                                )}
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
                                        onBlur={handleBlur}
                                        placeholder="tu@email.com"
                                        className={touched.email && errors.email ? 'error' : ''}
                                    />
                                </div>
                                {touched.email && errors.email ? (
                                    <div className="error-text">
                                        {errors.email}
                                    </div>
                                ) : (
                                    <div className="helper-text">
                                        Por favor, usa un email válido
                                    </div>
                                )}
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
                                        onBlur={handleBlur}
                                        placeholder="¿De qué quieres hablar?"
                                        className={touched.asunto && errors.asunto ? 'error' : ''}
                                    />
                                </div>
                                {touched.asunto && errors.asunto ? (
                                    <div className="error-text">
                                        {errors.asunto}
                                    </div>
                                ) : (
                                    <div className="helper-text">
                                        Describe brevemente el tema de tu mensaje
                                    </div>
                                )}
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
                                        onBlur={handleBlur}
                                        rows="5"
                                        placeholder="Cuéntame sobre tu proyecto o idea..."
                                        className={touched.mensaje && errors.mensaje ? 'error' : ''}
                                    ></textarea>
                                </div>
                                {touched.mensaje && errors.mensaje ? (
                                    <div className="error-text">
                                        {errors.mensaje}
                                    </div>
                                ) : (
                                    <div className="helper-text">
                                        Escribe tu mensaje detallado aquí
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className="btn-enviar"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        {retryCount > 0 ? `Reintentando... (${retryCount}/2)` : `Enviando... ${Math.round(submitProgress)}%`}
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
