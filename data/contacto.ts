import type { Contacto } from "./tipos";

export const contacto: Contacto = {
  email: "admin@sebastiangomez.com.ar",
  telefono: "2255413090",
  telefonoConPais: "+542255413090",
  ubicacion: "Argentina - Buenos Aires",
  // Sin el año: lo antepone el Footer como rango, calculado en cada visita.
  copyright: "Sebastian Gomez. Todos los derechos reservados.",
  redes: [
    { nombre: "GitHub", url: "https://github.com/SbaGomez", color: "#6e5494" },
    { nombre: "LinkedIn", url: "https://www.linkedin.com/in/sbagomez/", color: "#0077B5" },
    { nombre: "Instagram", url: "https://instagram.com/sbagomez", color: "#833ab4" },
    { nombre: "WhatsApp", url: "https://wa.me/542255413090", color: "#25D366" },
  ],
  medios: [
    {
      icono: "mail",
      titulo: "Email",
      valor: "admin@sebastiangomez.com.ar",
      link: "mailto:admin@sebastiangomez.com.ar",
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
