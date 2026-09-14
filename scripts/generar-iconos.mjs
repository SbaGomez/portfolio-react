/**
 * Precomputa los iconos de tecnologia que usa la interfaz.
 *
 * Por que existe: simple-icons no expone un modulo JS por icono (su export
 * "./icons/*" son archivos .svg crudos), asi que importarlo desde un
 * componente arrastra los 3460 iconos. Como ProyectoCard cae en el grafo de
 * cliente (ListaProyectos es "use client"), eso mandaba un chunk de 5 MB al
 * navegador. Aca se resuelve en build y se emite un literal con solo las
 * tecnologias que realmente aparecen.
 *
 * Correr con: pnpm iconos
 */
import { readFileSync, writeFileSync } from "node:fs";
import * as simpleIcons from "simple-icons";

const FUENTES = [
  "data/proyectos.ts",
  "data/experiencia.ts",
  "data/habilidades.ts",
  "data/tecnologias.ts",
];
const SALIDA = "lib/iconos-generados.ts";

// --color-bg-card: el fondo sobre el que se dibuja el tag.
const FONDO = "#111a2e";
const CONTRASTE_MINIMO = 3.5;

// Solo alias que son la misma marca con otro nombre. NextAuth NO se mapea a
// Auth0: son productos distintos y usar ese logo seria un dato falso.
const ALIAS = {
  "Lua 5.4": "Lua",
  "Steam OpenID": "Steam",
  "Discord OAuth2": "Discord",
  "Google OAuth 2.0": "Google",
  JWT: "JSON Web Tokens",
  "JavaScript (ES Modules)": "JavaScript",
  // React Native no tiene icono propio en simple-icons: usa el de React.
  "React Native": "React",
  // Es un par de tecnologias en una sola etiqueta; se representa con la
  // primera en vez de dejarla sin icono.
  "HTML5 / CSS3": "HTML5",
  "Claude Code": "Claude",
  ".NET Framework": ".NET",
};

// Sin icono en simple-icons y no hay alias posible: C#, Java y Microsoft SQL
// Server fueron removidos del paquete por marca registrada, y Azure DevOps,
// TFS, REST APIs, SQL, PL/SQL y FTP no son marcas con logo propio.

function canales(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminancia(hex) {
  const [r, g, b] = canales(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a, b) {
  const [l1, l2] = [luminancia(a), luminancia(b)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function mezclarConBlanco(hex, t) {
  return (
    "#" +
    canales(hex)
      .map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Muchos colores de marca son casi negros (Next.js, Steam y JWT son #000000)
 * y sobre fondo oscuro no se verian. Se aclara hacia el blanco lo minimo
 * necesario para pasar contraste, conservando el tono de la marca.
 */
function colorLegible(hex) {
  for (let t = 0; t <= 1.001; t += 0.05) {
    const candidato = mezclarConBlanco(hex, t);
    if (contraste(candidato, FONDO) >= CONTRASTE_MINIMO) return candidato;
  }
  return "#ffffff";
}

const porTitulo = new Map();
for (const valor of Object.values(simpleIcons)) {
  if (valor?.title && valor.hex && valor.path) {
    porTitulo.set(valor.title.toLowerCase(), { path: valor.path, hex: valor.hex });
  }
}

// Los nombres salen de los arrays `stack:` (proyectos y experiencia) e
// `items:` (habilidades), mas los campos `nombre:` de tecnologias. Ninguno
// de los otros tres modulos usa `nombre:`, asi que no hay cruce.
const nombres = new Set();
for (const archivo of FUENTES) {
  const texto = readFileSync(archivo, "utf8");
  for (const bloque of texto.matchAll(/(?:stack|items):\s*\[([^\]]*)\]/g)) {
    for (const entrada of bloque[1].matchAll(/"([^"]+)"/g)) nombres.add(entrada[1]);
  }
  for (const entrada of texto.matchAll(/nombre:\s*"([^"]+)"/g)) nombres.add(entrada[1]);
}

if (nombres.size === 0) {
  throw new Error(`No se encontro ningun stack ni items en ${FUENTES.join(", ")}. Cambio el formato?`);
}

const encontrados = {};
const faltantes = [];
for (const nombre of [...nombres].sort()) {
  const candidatos = [
    ALIAS[nombre],
    nombre,
    nombre.replace(/\s+[\d.]+$/, ""),
    nombre.replace(/\s*\(.*\)$/, ""),
  ].filter(Boolean);

  let icono;
  for (const c of candidatos) {
    icono = porTitulo.get(c.toLowerCase());
    if (icono) break;
  }

  if (icono) encontrados[nombre] = { path: icono.path, color: colorLegible("#" + icono.hex) };
  else faltantes.push(nombre);
}

const cuerpo = Object.entries(encontrados)
  .map(([n, i]) => `  ${JSON.stringify(n)}: { path: ${JSON.stringify(i.path)}, color: ${JSON.stringify(i.color)} },`)
  .join("\n");

writeFileSync(
  SALIDA,
  `// GENERADO por scripts/generar-iconos.mjs. No editar a mano.
// Regenerar con: pnpm iconos
export type IconoGenerado = { path: string; color: string };

export const iconos: Record<string, IconoGenerado> = {
${cuerpo}
};
`,
  "utf8",
);

console.log(`${Object.keys(encontrados).length}/${nombres.size} tecnologias con icono -> ${SALIDA}`);
if (faltantes.length) console.log("sin icono:", faltantes.join(", "));
