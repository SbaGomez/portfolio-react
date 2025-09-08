# 🚀 Portfolio Personal - Sebastian Gomez

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple?style=for-the-badge&logo=bootstrap)
![CSS3](https://img.shields.io/badge/CSS3-Advanced-green?style=for-the-badge&logo=css3)

Un portfolio personal moderno y responsivo desarrollado con React, que muestra mis habilidades como desarrollador web fullstack y presenta mis proyectos más destacados.

## 🌟 Características

- **Diseño Moderno**: Interfaz elegante con animaciones CSS avanzadas
- **Completamente Responsivo**: Optimizado para todos los dispositivos
- **Navegación Fluida**: Sistema de navegación SPA sin recargas
- **Galería de Proyectos**: Presentación interactiva de proyectos con modales
- **Formulario de Contacto**: Sistema de contacto funcional con EmailJS
- **Optimización SEO**: Estructura semántica y meta tags optimizados
- **Rendimiento**: Carga rápida y optimizada

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Framework principal
- **JavaScript ES6+** - Lógica de la aplicación
- **CSS3** - Estilos avanzados con gradientes y animaciones
- **Bootstrap 5.3.3** - Framework CSS responsivo
- **Font Awesome 6.5.2** - Iconografía moderna

### Herramientas y Servicios
- **EmailJS 4.4.1** - Servicio de envío de emails con variables de entorno
- **React Router DOM 6.22.3** - Navegación SPA
- **Web Vitals 2.1.4** - Monitoreo de rendimiento
- **Popper.js 2.11.8** - Posicionamiento de elementos

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Inicio.js              # Página de inicio con presentación
│   ├── SobreMi.js             # Sección sobre mí con habilidades y experiencia
│   ├── Proyectos.js           # Galería de proyectos con modales interactivos
│   ├── Contacto.js            # Formulario de contacto funcional
│   ├── Navbar.js              # Barra de navegación responsiva
│   ├── Footer.js              # Pie de página con enlaces sociales
│   └── *.module.css           # Estilos modulares para cada componente
├── config/
│   ├── contactConfig.js       # Configuración de contacto y redes sociales
│   └── emailjs.js             # Configuración EmailJS con variables de entorno
├── hooks/
│   └── useNavigation.js       # Hook personalizado para navegación
├── index.js                   # Punto de entrada principal
├── index.css                  # Estilos globales y variables CSS
└── reportWebVitals.js         # Monitoreo de rendimiento
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/SbaGomez/portfolio-react.git
   cd portfolio-react
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar EmailJS** (opcional)
   - Crear cuenta en [EmailJS](https://www.emailjs.com/)
   - Configurar las credenciales en `src/config/emailjs.js`
   - Ver [EMAILJS_SETUP.md](EMAILJS_SETUP.md) para instrucciones detalladas

4. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```
   La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack (irreversible)

## 🌐 Despliegue

### Build para Producción
```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `build/` y están listos para ser desplegados en cualquier servidor web estático.

## 📱 Proyectos Destacados

### 1. Servidor MUOnline ⭐
- **Tecnologías**: PHP, Bootstrap, MsSQL
- **Descripción**: Servidor privado completo con web responsiva, sistema Louis Season 6 y panel de administración
- **Características**: Web responsiva moderna, sistema de ranking, estadísticas en tiempo real, gestión de eventos
- **Demo**: [bakastamu.net](https://bakastamu.net)

### 2. Calculadora 3D
- **Tecnologías**: JavaScript, CSS3, HTML5
- **Descripción**: Aplicación web especializada para calcular precios de impresión 3D
- **Características**: Cálculos precisos, base de datos de materiales, interfaz intuitiva, validación en tiempo real
- **Demo**: [Calculadora 3D](https://sebastiangomez.com.ar/Calculadora3D/)

### 3. Portfolio Personal
- **Tecnologías**: React, CSS3, JavaScript, HTML5
- **Descripción**: Aplicación web completa con diseño moderno, animaciones avanzadas y funcionalidades interactivas
- **Características**: Interfaz moderna, diseño responsivo, animaciones CSS, galería interactiva, formulario funcional
- **Demo**: [sebastiangomez.com.ar](https://sebastiangomez.com.ar)
- **Código**: [GitHub](https://github.com/SbaGomez/portfolio-react)

## 🎨 Personalización

### Modificar Información Personal
1. Editar `src/components/Inicio.js` para cambiar la presentación
2. Actualizar `src/components/SobreMi.js` para información personal
3. Modificar `src/components/Proyectos.js` para agregar/quitar proyectos

### Cambiar Estilos
- Los estilos principales están en `src/index.css`
- Cada componente tiene su archivo CSS correspondiente
- Utiliza variables CSS para colores y fuentes principales

## 📞 Contacto

**Sergio Sebastian Gomez** - Desarrollador Web Fullstack

- 🌐 **Portfolio**: [sebastiangomez.com.ar](https://sebastiangomez.com.ar)
- 📧 **Email**: [admin@sebastiangomez.com.ar](mailto:admin@sebastiangomez.com.ar)
- 📱 **WhatsApp**: [+54 2255 413090](https://wa.me/542255413090)
- 💼 **LinkedIn**: [Perfil Profesional](https://www.linkedin.com/in/sbagomez/)
- 🐙 **GitHub**: [@SbaGomez](https://github.com/SbaGomez)
- 📍 **Ubicación**: Argentina - Buenos Aires

---

⭐ **¡No olvides darle una estrella al proyecto si te gusta!**
