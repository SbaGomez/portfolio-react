import React, { useState } from 'react';
import styles from './Contacto.module.css';
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
    const [warnings, setWarnings] = useState({});
    const [touched, setTouched] = useState({});

    // Función para validar email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Función para validar un campo específico
    const validateField = (name, value) => {
        let error = '';
        let warning = '';

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
                    warning = 'Por favor, usa un email válido';
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

        return { error, warning };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar el campo en tiempo real
        const { error, warning } = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
        setWarnings(prev => ({
            ...prev,
            [name]: warning
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validar el campo cuando pierde el foco
        const { error, warning } = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
        setWarnings(prev => ({
            ...prev,
            [name]: warning
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
        const newWarnings = {};
        Object.keys(formData).forEach(field => {
            const { error, warning } = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
            if (warning) {
                newWarnings[field] = warning;
            }
        });

        setErrors(newErrors);
        setWarnings(newWarnings);

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
                setErrors({});
                setWarnings({});
                setTouched({});
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
        <section className={styles.contactoSection}>
            <div className="container">
                <h2 className={styles.contactoTitle}>Contacto</h2>

                <div className={styles.contactoContent}>
                    <div className={styles.contactoInfo}>
                        <div className={styles.infoSection}>
                            <h3 className={styles.infoTitle}>¡Hablemos!</h3>
                            <p>
                                ¿Tienes un proyecto en mente? ¿Quieres colaborar?
                                Me encantaría escuchar sobre tu idea y cómo puedo ayudarte a hacerla realidad.
                            </p>
                        </div>

                        <div className={styles.contactDetails}>
                            {contactInfo.map((info, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <div className={styles.contactIcon}>
                                        <i className={info.icon}></i>
                                    </div>
                                    <div className={styles.contactText}>
                                        <h4>{info.title}</h4>
                                        <a href={info.link}>{info.value}</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.socialLinks}>
                            <h4>Sígueme en redes</h4>
                            <div className={styles.socialIcons}>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        style={{ '--social-color': social.color }}
                                        title={social.name}
                                    >
                                        <i className={social.icon}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.contactoForm}>
                        <form onSubmit={handleSubmit} className={styles.formulario}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nombre">NOMBRE:</label>
                                <div className={styles.inputContainer}>
                                    <i className={`fas fa-user ${styles.inputIcon}`}></i>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Escribe tu nombre completo"
                                        className={touched.nombre && errors.nombre ? styles.error : ''}
                                    />
                                </div>
                                {touched.nombre && errors.nombre ? (
                                    <div className={styles.errorText}>
                                        {errors.nombre}
                                    </div>
                                ) : (
                                    <div className={styles.helperText}>
                                        Ingresa tu nombre y apellido
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">EMAIL:</label>
                                <div className={styles.inputContainer}>
                                    <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="tu@email.com"
                                        className={touched.email && errors.email ? styles.error : touched.email && warnings.email ? styles.warning : ''}
                                    />
                                </div>
                                {touched.email && errors.email ? (  
                                    <div className={styles.errorText}>
                                        {errors.email}
                                    </div>
                                ) : touched.email && warnings.email ? (
                                    <div className={styles.warningText}>
                                        {warnings.email}
                                    </div>
                                ) : (
                                    <div className={styles.helperText}>
                                        Por favor, usa un email válido
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="asunto">ASUNTO:</label>
                                <div className={styles.inputContainer}>
                                    <i className={`fas fa-tag ${styles.inputIcon}`}></i>
                                    <input
                                        type="text"
                                        id="asunto"
                                        name="asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="¿De qué quieres hablar?"
                                        className={touched.asunto && errors.asunto ? styles.error : ''}
                                    />
                                </div>
                                {touched.asunto && errors.asunto ? (
                                    <div className={styles.errorText}>
                                        {errors.asunto}
                                    </div>
                                ) : (
                                    <div className={styles.helperText}>
                                        Describe brevemente el tema de tu mensaje
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="mensaje">MENSAJE:</label>
                                <div className={styles.inputContainer}>
                                    <i className={`fas fa-comment ${styles.inputIcon}`}></i>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        rows="5"
                                        placeholder="Cuéntame sobre tu proyecto o idea..."
                                        className={touched.mensaje && errors.mensaje ? styles.error : ''}
                                    ></textarea>
                                </div>
                                {touched.mensaje && errors.mensaje ? (
                                    <div className={styles.errorText}>
                                        {errors.mensaje}
                                    </div>
                                ) : (
                                    <div className={styles.helperText}>
                                        Escribe tu mensaje detallado aquí
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={styles.btnEnviar}
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
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${submitProgress}%` }}
                                    ></div>
                                </div>
                            )}

                            {submitStatus === 'success' && (
                                <div className={`${styles.alert} ${styles.alertSuccess}`}>
                                    <i className="fas fa-check-circle"></i>
                                    ¡Mensaje enviado correctamente! Te responderé pronto.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className={`${styles.alert} ${styles.alertError}`}>
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
