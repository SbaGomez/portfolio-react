import emailjs from '@emailjs/browser';

// Configuración de EmailJS desde variables de entorno
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export const sendEmail = async (formData) => {
    const { nombre, email, asunto, mensaje } = formData;
    
    // Verificar que las variables estén configuradas
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.error('❌ Variables de entorno de EmailJS no configuradas');
        return { 
            success: false, 
            error: 'Configuración de EmailJS incompleta. Revisa las variables de entorno.' 
        };
    }
    
    // Configurar EmailJS
    emailjs.init(PUBLIC_KEY);
    
    const templateParams = {
        from_name: nombre,
        from_email: email,
        subject: asunto,
        message: mensaje,
        to_email: 'sbagomeznight@gmail.com',
        reply_to: email,
        // Usar el email verificado en EmailJS
        from_name_display: `${nombre} (${email})`,
        // Agregar fecha actual
        fecha: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    try {
        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams
        );
        
        console.log('Email enviado exitosamente:', response);
        return { success: true };
    } catch (error) {
        console.error('Error enviando email:', error);
        return { success: false, error: error.message };
    }
};
