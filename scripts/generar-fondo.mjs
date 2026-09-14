// Genera la plancha de fondo del sitio. Ruido fBm de cuatro octavas sobre
// halos radiales, en la paleta de tokens. Correr con: pnpm fondo
import sharp from "sharp";
import { mkdirSync } from "node:fs";

/**
 * Variante "Dos polos" de .bg-candidates: azul arriba a la izquierda,
 * violeta abajo a la derecha, como el loader de ragnarok.
 *
 * Los centros e intensidades no son a ojo: salen de muestrear bg-c.png y
 * despejar el factor de mezcla f en `base + (color - base) * f`. Dieron
 * f=0.56 para el azul en (0.22, 0.09) y f=0.37 para el violeta en
 * (0.83, 0.78); los radios se ajustaron contra cuatro puntos de control por
 * polo usando la caida coseno^1.6 que aplica render().
 */
const DOS_POLOS = {
  base: "#0a0e1a",
  seed: 20260913,
  noiseScale: 2.6,
  // La viñeta oscurece hacia abajo, que es justo donde ahora vive el polo
  // violeta: con el 0.25 de la variante anterior se lo comia.
  vignette: 0.08,
  glows: [
    { x: 0.22, y: 0.09, rx: 0.72, ry: 0.65, color: "#3b82f6", intensity: 0.56 },
    { x: 0.83, y: 0.78, rx: 0.58, ry: 0.67, color: "#7c3aed", intensity: 0.37 },
  ],
};

// ---------- Ruido de valor (nubes orgánicas) ----------
function makeNoise(seed) {
  let s = seed >>> 0;
  const rand = () => {
    // xorshift32
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
  const SIZE = 256;
  const lattice = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < lattice.length; i++) lattice[i] = rand();

  const at = (x, y) => lattice[(y & (SIZE - 1)) * SIZE + (x & (SIZE - 1))];
  const smooth = (t) => t * t * (3 - 2 * t);

  const value = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = smooth(x - xi), yf = smooth(y - yi);
    const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };

  // fBm de 4 octavas
  return (x, y) => {
    let sum = 0, amp = 0.5, freq = 1, norm = 0;
    for (let o = 0; o < 4; o++) {
      sum += value(x * freq, y * freq) * amp;
      norm += amp;
      amp *= 0.5;
      freq *= 2.1;
    }
    return sum / norm;
  };
}

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

// ---------- Render ----------
// glows: { x, y (0..1), rx, ry (radio relativo al ancho), color, intensity }
function render(width, height, opts) {
  const { base, glows, seed, grain = 3, noiseScale = 3.2, noiseAmount = 0.75, vignette = 0.25 } = opts;
  const baseRGB = hex(base);
  const noise = makeNoise(seed);
  const out = Buffer.alloc(width * height * 3);
  const prepared = glows.map((g) => ({ ...g, rgb: hex(g.color) }));

  for (let y = 0; y < height; y++) {
    const v = y / height;
    for (let x = 0; x < width; x++) {
      const u = x / width;

      // Ruido, en coordenadas normalizadas por el ancho para que no se estire.
      const n = noise(u * noiseScale * 8, (y / width) * noiseScale * 8);
      const nMod = 1 - noiseAmount + noiseAmount * (0.35 + 1.3 * n);

      let r = baseRGB[0], g = baseRGB[1], b = baseRGB[2];

      for (const glow of prepared) {
        const dx = (u - glow.x) / glow.rx;
        const dy = (v - glow.y) / (glow.ry * (height / width)) * (height / width);
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1) continue;
        // Falloff suave (coseno elevado) para que no se vea el borde del círculo.
        let f = Math.pow(0.5 + 0.5 * Math.cos(Math.PI * d), 1.6);
        f *= glow.intensity * nMod;
        r += (glow.rgb[0] - r) * f;
        g += (glow.rgb[1] - g) * f;
        b += (glow.rgb[2] - b) * f;
      }

      // Viñeta hacia abajo: el sitio disuelve a negro azulado al scrollear.
      const vig = 1 - vignette * Math.pow(v, 1.8);
      r *= vig; g *= vig; b *= vig;

      // Grano: rompe el banding de los degradados grandes.
      const gr = (noise(x * 0.9, y * 0.9) - 0.5) * grain * 2;
      const i = (y * width + x) * 3;
      out[i] = Math.max(0, Math.min(255, Math.round(r + gr)));
      out[i + 1] = Math.max(0, Math.min(255, Math.round(g + gr)));
      out[i + 2] = Math.max(0, Math.min(255, Math.round(b + gr)));
    }
  }
  return out;
}

async function escribir(width, height, salida) {
  const rgb = render(width, height, DOS_POLOS);
  await sharp(rgb, { raw: { width, height, channels: 3 } })
    .webp({ quality: 82 })
    .toFile(salida);
}

mkdirSync("public", { recursive: true });
await escribir(1672, 941, "public/fondo.webp");
await escribir(900, 506, "public/fondo-mobile.webp");
console.log("Fondo generado.");
