import emailjs from '@emailjs/browser';

// Configuración de EmailJS desde variables de entorno
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Inicializar EmailJS una sola vez
let isEmailJSInitialized = false;

const initializeEmailJS = () => {
    if (!isEmailJSInitialized && PUBLIC_KEY) {
        emailjs.init(PUBLIC_KEY);
        isEmailJSInitialized = true;
    }
};

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
    
    // Inicializar EmailJS solo si no se ha hecho antes
    initializeEmailJS();
    
    const templateParams = {
        from_name: nombre,
        from_email: email,
        subject: asunto,
        message: mensaje,
        to_email: 'sbagomeznight@gmail.com',
        reply_to: email,
        from_name_display: `${nombre} (${email})`,
        fecha: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    try {
        // Crear una promesa con timeout de 15 segundos (más realista)
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout: El envío tardó demasiado')), 15000);
        });

        const emailPromise = emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            {
                publicKey: PUBLIC_KEY,
                // Configuraciones optimizadas para mejor rendimiento
                blockHeadless: false,
                limitRate: {
                    enable: true,
                    id: 'contact-form'
                },
                // Configuraciones adicionales para reducir latencia
                timeout: 10000, // 10 segundos de timeout interno
                retry: 2, // 2 reintentos automáticos
                retryDelay: 1000 // 1 segundo entre reintentos
            }
        );

        // Usar Promise.race con timeout optimizado
        const response = await Promise.race([emailPromise, timeoutPromise]);
        
        console.log('✅ Email enviado exitosamente:', response);
        return { success: true, message: 'Mensaje enviado correctamente' };
    } catch (error) {
        console.error('❌ Error enviando email:', error);
        
        // Proporcionar mensajes de error más específicos
        let errorMessage = 'Error al enviar el mensaje. Inténtalo de nuevo.';
        
        if (error.message.includes('Timeout')) {
            errorMessage = 'El envío tardó demasiado. Verifica tu conexión e inténtalo de nuevo.';
        } else if (error.message.includes('Invalid email')) {
            errorMessage = 'El email ingresado no es válido.';
        } else if (error.message.includes('Template')) {
            errorMessage = 'Error en la configuración del servidor. Inténtalo más tarde.';
        } else if (error.message.includes('Network')) {
            errorMessage = 'Error de conexión. Verifica tu internet e inténtalo de nuevo.';
        } else if (error.message.includes('Rate limit')) {
            errorMessage = 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
        } else if (error.message.includes('Service')) {
            errorMessage = 'Servicio temporalmente no disponible. Inténtalo más tarde.';
        }
        
        return { success: false, error: errorMessage };
    }
};
