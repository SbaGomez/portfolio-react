import type { Contacto } from "./tipos";

export const contacto: Contacto = {
  email: "contacto@sebastiangomez.com.ar",
  // El telefono y la ubicacion viven en `medios`, que es lo que se renderiza.
  // Tenerlos ademas como campos sueltos daba dos copias que nadie leia.
  // Sin el año: lo antepone el Footer como rango, calculado en cada visita.
  copyright: "Sebastian Gomez. Todos los derechos reservados.",
  disponibilidad: {
    estado: "Disponible",
    titular: "Tomo proyectos nuevos.",
    detalle: "Suelo responder dentro de las 24 horas.",
  },
  redes: [
    { nombre: "GitHub", url: "https://github.com/SbaGomez", color: "#6e5494", colorClaro: "#a78bfa" },
    { nombre: "LinkedIn", url: "https://www.linkedin.com/in/sbagomez/", color: "#0077B5", colorClaro: "#38bdf8" },
    { nombre: "Instagram", url: "https://instagram.com/sbagomez", color: "#833ab4", colorClaro: "#f472b6" },
    { nombre: "WhatsApp", url: "https://wa.me/542255413090", color: "#25D366", colorClaro: "#4ade80" },
  ],
  medios: [
    {
      icono: "mail",
      titulo: "Email",
      valor: "contacto@sebastiangomez.com.ar",
      link: "mailto:contacto@sebastiangomez.com.ar",
    },
    {
      icono: "whatsapp",
      titulo: "WhatsApp",
      valor: "2255413090",
      link: "https://wa.me/542255413090?text=Hola!%20Me%20interesa%20contactarte%20para%20hablar%20sobre%20un%20proyecto.",
    },
    {
      icono: "map-pin",
      titulo: "Ubicación",
      valor: "Argentina - Buenos Aires",
      link: "",
    },
  ],
};
