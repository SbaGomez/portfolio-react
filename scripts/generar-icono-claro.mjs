// Genera el favicon del tema claro: el "SG" del logo de SG.dev, la S en
// pizarra y la G en durazno sobre la crema de la tarjeta. El del tema oscuro
// es public/favicon.ico. Correr con: pnpm icono-claro
import sharp from "sharp";

// El borde no es decoracion: sin el, en las pestañas claras del navegador el
// cuadrado crema se funde con la barra y solo quedan las letras flotando.
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect x="1" y="1" width="62" height="62" rx="14" fill="#f3eee8" stroke="#8fa5b0" stroke-opacity="0.45" stroke-width="2"/>
  <text x="32" y="45" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="33" letter-spacing="-2.5"><tspan fill="#8fa5b0">S</tspan><tspan fill="#e0a983">G</tspan></text>
</svg>`;

// 96px: alcanza para las pantallas de alta densidad sin pesar de mas.
await sharp(Buffer.from(SVG)).resize(96, 96).png().toFile("public/icono-claro.png");
console.log("Icono claro generado.");
