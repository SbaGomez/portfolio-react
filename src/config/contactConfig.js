// Configuración general de contacto y redes sociales
export const contactConfig = {
    // Información de contacto principal
    email: 'admin@sebastiangomez.com.ar',
    phone: '2255413090',
    phoneWithCountryCode: '+542255413090',
    location: 'Argentina - Buenos Aires',
    
    // Información personal
    fullName: 'Sergio Sebastian Gomez',
    birthDate: '1995-12-09',
    career: 'Desarrollo de Software',
    typography: 'Roboto Condensed',
    
    // Redes sociales
    socialMedia: {
        instagram: {
            url: 'https://instagram.com/sbagomez',
            icon: 'fab fa-instagram',
            color: '#833ab4',
            name: 'Instagram'
        },
        whatsapp: {
            url: 'https://wa.me/542255413090',
            icon: 'fab fa-whatsapp',
            color: '#25D366',
            name: 'WhatsApp'
        },
        /*github: {
            url: 'https://github.com/',
            icon: 'fab fa-github',
            color: '#6e5494',
            name: 'GitHub'
        },
        linkedin: {
            url: 'https://linkedin.com/in/',
            icon: 'fab fa-linkedin',
            color: '#0077B5',
            name: 'LinkedIn'
        },
        twitter: {
            url: 'https://twitter.com/',
            icon: 'fab fa-twitter',
            color: '#1da1f2',
            name: 'Twitter'
        }*/
    },
    
    // Información de contacto para el formulario
    contactInfo: [
        {
            icon: 'fas fa-envelope',
            title: 'Email',
            value: 'admin@sebastiangomez.com.ar',
            link: 'mailto:admin@sebastiangomez.com.ar'
        },
        {
            icon: 'fab fa-whatsapp',
            title: 'WhatsApp',
            value: '2255413090',
            link: 'https://wa.me/542255413090?text=Hola!%20Me%20interesa%20contactarte%20para%20hablar%20sobre%20un%20proyecto.'
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Ubicación',
            value: 'Argentina - Buenos Aires',
            link: '#'
        }
    ],
    
    // Colores utilizados en el portfolio
    colors: [
        { name: 'Azul Oscuro', class: 'colorAzulOscuro' },
        { name: 'Azul', class: 'colorAzul' },
        { name: 'Rojo', class: 'colorRojo' },
        { name: 'Celeste', class: 'colorCeleste' },
        { name: 'Dorado', class: 'colorDorado' },
        { name: 'Naranja', class: 'colorNaranja' },
        { name: 'Gris', class: 'colorGris' },
        { name: 'Gris Oscuro', class: 'colorGrisOscuro' },
        { name: 'Beige', class: 'colorBeige' }
    ],
    
    // Copyright
    copyright: 'Copyright © 2025 Sebastian Gomez. Todos los derechos reservados.'
};

// Función para calcular la edad
export const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
};

// Función para obtener la edad actual
export const getCurrentAge = () => calculateAge(contactConfig.birthDate);
