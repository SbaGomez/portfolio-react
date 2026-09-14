# Rediseño del portfolio — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar el portfolio de Create React App a Next.js con export estático, aplicando el sistema visual de `ragnarok-web` y repoblando el contenido desde el CV real y seis proyectos verificados.

**Architecture:** Next.js App Router compilado a HTML estático (`output: 'export'`) y servido por el Apache actual. El sistema visual se porta como CSS plano sobre custom properties en `:root` — Tailwind solo resuelve layout y spacing, igual que en la referencia. Todo el contenido vive en módulos tipados bajo `data/`, separado de la presentación.

**Tech Stack:** Next.js 16.3.2, React 19.2.8, TypeScript 5, Tailwind CSS v4, lucide-react, @emailjs/browser, Vitest, pnpm.

**Spec:** `docs/superpowers/specs/2026-09-13-rediseno-portfolio-design.md`

## Global Constraints

Estas reglas aplican a **todas** las tareas. Los valores están copiados literalmente del spec.

- **Prefijo CSS:** `sg-`. Toda clase propia lleva ese prefijo. Al portar desde la referencia, `rw-` → `sg-`.
- **Tokens de color** — declarados una sola vez en `:root`, nunca hardcodeados en componentes:
  ```css
  --color-bg: #0a0e1a;
  --color-bg-card: #111a2e;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-accent-light: #93c5fd;
  --color-text: #e8edf7;
  --color-text-muted: #8b96ad;
  --color-border: rgba(59, 130, 246, 0.18);
  --gradient-accent: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
  ```
- **Semánticos** (solo formulario y estados): `#4ade80` éxito, `#f59e0b` advertencia, `#ef4444` error.
- **Tema único oscuro.** No hay modo claro, ni `prefers-color-scheme`, ni clase `.dark`.
- **Tipografía:** `system-ui, -apple-system, sans-serif`. Sin webfonts.
- **Elevación por borde y color de fondo, no por sombra.** Las únicas sombras permitidas van en botón principal y modal.
- **Radios:** 8px · 10px · 12px · 14px · 16px · 20px · 999px. Ningún otro valor.
- **Breakpoint único:** `@media (min-width: 640px)`. La referencia usa solo ese en su CSS propio.
- **Reveal:** 2200ms. Stagger de 50–120ms según sección.
- **`prefers-reduced-motion: reduce`** desactiva reveals, stagger y lift. Obligatorio en toda tarea que agregue movimiento.
- **Un solo bloque de reduced-motion, al final de `app/globals.css`.** Toda
  contraparte va **dentro** de ese bloque, y la regla base del selector debe
  quedar **antes** de él. No crear bloques nuevos junto a cada regla.

  El motivo se aprendió rompiéndolo en la Task 4: un `@media` **no aporta
  especificidad**, sólo condiciona la inclusión de sus reglas. Si el bloque
  queda antes de la regla base, a igual especificidad gana la regla posterior
  y el override es código muerto — aunque la media query matchee. No hay lint
  que lo detecte, y leyendo el archivo fuente parece correcto.

  Por eso la verificación de reduced-motion se hace **contra el CSS compilado
  que sirve el navegador**, no contra el archivo fuente, y comprobando el
  estilo computado del elemento.
- **Idioma:** `lang="es"` en el documento. Todo el texto de interfaz en español rioplatense.
- **Confidencialidad:** los empleadores se nombran (Synerbit, Arvent Group). Los sistemas de clientes NO se nombran ni se describe su arquitectura interna. Ver §2.1 y §7 del spec.
- **Versiones exactas:** `next@16.3.2`, `react@19.2.8`, `react-dom@19.2.8`, `tailwindcss@^4`, `@tailwindcss/postcss@^4`. Node 20+ (el entorno tiene 24.12.0), pnpm 11.21.0.
- **Nunca imprimir secretos.** Al migrar variables de entorno se copian valores entre archivos sin volcarlos a la consola ni al historial de git.

---

### Task 1: Rama aislada y scaffold de Next.js

Deja el proyecto compilando a estático con una página vacía. `master` queda intacto y desplegable.

**Files:**
- Create: `package.json` (reemplaza el actual)
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Modify: `.gitignore`
- Delete: `build/` (artefacto viejo de CRA presente en disco)

**Interfaces:**
- Consumes: nada.
- Produces: el proyecto compila con `pnpm build` y emite `out/`. El alias `@/*` resuelve a la raíz del repo.

- [ ] **Step 1: Crear la rama y el worktree**

```bash
cd /c/Users/sebag/Downloads/Proyectos/portfolio-react
git worktree add -b redesign .claude/worktrees/redesign
cd .claude/worktrees/redesign
```

Todo el trabajo restante ocurre dentro de ese worktree. `master` sigue checkouteado en el directorio original.

- [ ] **Step 2: Commitear el spec y el plan**

```bash
git add docs/superpowers/specs/2026-09-13-rediseno-portfolio-design.md docs/superpowers/plans/2026-09-13-rediseno-portfolio.md
git commit -m "docs: spec y plan del rediseño del portfolio"
```

- [ ] **Step 3: Escribir el nuevo `package.json`**

Reemplaza el archivo completo. Las dependencias de CRA (react-scripts, bootstrap, fontawesome, react-router-dom) desaparecen acá.

```json
{
  "name": "portfolio",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "fondo": "node scripts/generar-fondo.mjs"
  },
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "lucide-react": "^1.33.0",
    "next": "16.3.2",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "sharp": "^0.34.0",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.1.11"
  }
}
```

- [ ] **Step 4: Escribir `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El hosting es Apache sirviendo archivos: no hay Node corriendo.
  output: "export",
  // next/image necesita un servidor para optimizar; en export no existe.
  images: { unoptimized: true },
  // Emite cada ruta como <ruta>/index.html, que es lo que Apache sirve
  // de forma natural sin reglas de reescritura.
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 5: Escribir `tsconfig.json`, `postcss.config.mjs` y `vitest.config.ts`**

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

`postcss.config.mjs`:

```js
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
```

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
```

- [ ] **Step 6: Escribir el layout y una home mínima**

`app/globals.css`:

```css
@import "tailwindcss";
```

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sebastián Gómez",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:

```tsx
export default function Home() {
  return <main>scaffold</main>;
}
```

- [ ] **Step 7: Agregar entradas a `.gitignore`**

Añadir al final del archivo existente:

```
/.next/
/out/
next-env.d.ts
.bg-candidates/
```

- [ ] **Step 8: Instalar y verificar que compila**

```bash
rm -rf build node_modules package-lock.json src public/index.html
pnpm install
pnpm build
```

Esperado: build exitoso y `out/index.html` existe.

> `src/` y `public/index.html` se borran acá porque el `package.json` nuevo ya no tiene react-scripts y dejarlos rompe el type-check. El contenido que hay que preservar de esos archivos ya está transcripto en las tareas 2, 9 y 10 de este plan.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "build: migrar de CRA a Next.js con export estatico"
```

---

### Task 2: Capa de datos tipada

Todo el contenido del sitio, separado de la presentación. Es la tarea que hace que el próximo cambio de CV sea editar un `.ts` y no JSX.

**Files:**
- Create: `data/tipos.ts`, `data/perfil.ts`, `data/contacto.ts`, `data/experiencia.ts`, `data/educacion.ts`, `data/habilidades.ts`, `data/tecnologias.ts`, `data/proyectos.ts`
- Create: `lib/fechas.ts`
- Test: `tests/fechas.test.ts`, `tests/data.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `calcularEdad(fechaNacimiento: string, hoy?: Date): number`
  - `aniosDesde(fechaInicio: string, hoy?: Date): number`
  - `perfil: Perfil`, `contacto: Contacto`, `experiencias: Experiencia[]`, `educacion: Educacion[]`, `habilidades: GrupoHabilidades[]`, `tecnologias: Tecnologia[]`, `proyectos: Proyecto[]`
  - Tipos exportados desde `data/tipos.ts`: `Perfil`, `Contacto`, `RedSocial`, `Experiencia`, `Educacion`, `GrupoHabilidades`, `Tecnologia`, `Proyecto`, `MetricasProyecto`

- [ ] **Step 1: Escribir los tests que fallan**

`tests/fechas.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { calcularEdad, aniosDesde } from "@/lib/fechas";

describe("calcularEdad", () => {
  it("cuenta los años cumplidos", () => {
    expect(calcularEdad("1995-12-09", new Date("2026-12-10"))).toBe(31);
  });

  it("no cuenta el año si todavía no llegó el cumpleaños", () => {
    expect(calcularEdad("1995-12-09", new Date("2026-12-08"))).toBe(30);
  });

  it("cuenta el año el mismo día del cumpleaños", () => {
    expect(calcularEdad("1995-12-09", new Date("2026-12-09"))).toBe(31);
  });
});

describe("aniosDesde", () => {
  it("redondea hacia abajo los años completos", () => {
    expect(aniosDesde("2022-07-01", new Date("2026-09-13"))).toBe(4);
  });

  it("devuelve 0 antes del primer año", () => {
    expect(aniosDesde("2026-01-01", new Date("2026-09-13"))).toBe(0);
  });
});
```

`tests/data.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { proyectos } from "@/data/proyectos";
import { tecnologias } from "@/data/tecnologias";
import { experiencias } from "@/data/experiencia";

describe("proyectos", () => {
  it("tiene seis fichas", () => {
    expect(proyectos).toHaveLength(6);
  });

  it("no repite slugs", () => {
    const slugs = proyectos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cada ficha tiene resumen, stack y al menos un destacado", () => {
    for (const p of proyectos) {
      expect(p.resumen.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.destacados.length).toBeGreaterThan(0);
    }
  });

  it("las fichas anónimas no nombran al cliente ni al proveedor", () => {
    const prohibidos = ["synerbit", "tattile", "whatsapp"];
    for (const p of proyectos.filter((x) => x.anonimo)) {
      const texto = [p.titulo, p.resumen, ...p.descripcion, ...p.destacados, ...p.stack]
        .join(" ")
        .toLowerCase();
      for (const palabra of prohibidos) {
        expect(texto).not.toContain(palabra);
      }
    }
  });
});

describe("tecnologias", () => {
  it("cada tecnología con logo apunta a un archivo bajo /tecnologias", () => {
    for (const t of tecnologias.filter((x) => x.logo)) {
      expect(t.logo).toMatch(/^\/tecnologias\/.+\.svg$/);
    }
  });
});

describe("experiencias", () => {
  it("están ordenadas de más reciente a más antigua", () => {
    const desdes = experiencias.map((e) => e.desde);
    expect([...desdes].sort().reverse()).toEqual(desdes);
  });
});
```

- [ ] **Step 2: Correr los tests y verificar que fallan**

Run: `pnpm test`
Esperado: FAIL — no existen `@/lib/fechas` ni los módulos de `data/`.

- [ ] **Step 3: Escribir `data/tipos.ts`**

```ts
export type RedSocial = {
  nombre: string;
  url: string;
  color: string;
};

export type Perfil = {
  nombre: string;
  nombreCompleto: string;
  titulo: string;
  fechaNacimiento: string;
  inicioProfesional: string;
  ubicacion: string;
  resumen: string;
  disponible: boolean;
};

export type Contacto = {
  email: string;
  telefono: string;
  telefonoConPais: string;
  ubicacion: string;
  copyright: string;
  redes: RedSocial[];
  medios: { icono: string; titulo: string; valor: string; link: string }[];
};

export type Experiencia = {
  puesto: string;
  empresa: string;
  desde: string;
  hasta: string | null;
  periodo: string;
  tareas: string[];
  stack: string[];
};

export type Educacion = {
  titulo: string;
  institucion: string;
  periodo: string;
};

export type GrupoHabilidades = {
  categoria: string;
  items: string[];
};

export type Tecnologia = {
  nombre: string;
  logo: string | null;
};

export type MetricasProyecto = {
  lineas: number;
  commits: number;
  periodo: string;
};

export type Proyecto = {
  slug: string;
  titulo: string;
  anio: string;
  resumen: string;
  descripcion: string[];
  stack: string[];
  metricas: MetricasProyecto;
  destacados: string[];
  links: { demo?: string; repo?: string };
  imagenes: string[];
  anonimo: boolean;
  destacado: boolean;
};
```

- [ ] **Step 4: Escribir `lib/fechas.ts`**

```ts
export function calcularEdad(fechaNacimiento: string, hoy: Date = new Date()): number {
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export function aniosDesde(fechaInicio: string, hoy: Date = new Date()): number {
  return Math.max(0, calcularEdad(fechaInicio, hoy));
}
```

- [ ] **Step 5: Escribir `data/perfil.ts` y `data/contacto.ts`**

`data/perfil.ts` — el resumen sale del perfil profesional del CV:

```ts
import type { Perfil } from "./tipos";

export const perfil: Perfil = {
  nombre: "Sebastián Gómez",
  nombreCompleto: "Sergio Sebastián Gómez",
  titulo: "Full Stack Developer",
  fechaNacimiento: "1995-12-09",
  inicioProfesional: "2022-07-01",
  ubicacion: "Buenos Aires, Argentina",
  resumen:
    "Desarrollador de Software Full Stack con experiencia en el ciclo completo de aplicaciones web, backend, mobile y de escritorio, con ecosistemas como .NET, Java / Spring Boot, Node.js, Angular, React Native y Electron. Especializado en el diseño de APIs REST, integración con bases de datos relacionales y NoSQL, y despliegue en entornos Linux.",
  disponible: true,
};
```

`data/contacto.ts` — se conserva todo lo de `src/config/contactConfig.js` salvo `colors` y `typography`, que documentaban el diseño viejo:

```ts
import type { Contacto } from "./tipos";

export const contacto: Contacto = {
  email: "admin@sebastiangomez.com.ar",
  telefono: "2255413090",
  telefonoConPais: "+542255413090",
  ubicacion: "Argentina - Buenos Aires",
  copyright: "Copyright © 2026 Sebastián Gómez. Todos los derechos reservados.",
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
      icono: "message-circle",
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
```

> El filtro actual de `Contacto.js:186` busca `'Twitter'`, red que no existe en la config, y por eso WhatsApp queda fuera de los iconos sociales. Acá las cuatro redes se listan explícitamente y ese bug desaparece.

- [ ] **Step 6: Escribir `data/experiencia.ts` y `data/educacion.ts`**

Contenido literal del CV. Las cinco experiencias, de más reciente a más antigua.

```ts
import type { Experiencia } from "./tipos";

export const experiencias: Experiencia[] = [
  {
    puesto: "Software Developer",
    empresa: "Synerbit",
    desde: "2024-05",
    hasta: null,
    periodo: "May 2024 – Presente",
    tareas: [
      "Diseño, desarrollo y mantenimiento de soluciones de software empresariales escalables de alta disponibilidad.",
      "Colaboración activa en equipos multidisciplinarios bajo metodologías ágiles para mejorar la arquitectura y calidad general del software.",
      "Desarrollo integral de punta a punta implementando interfaces dinámicas y servicios backend robustos.",
      "Diagnóstico detallado de fallas, optimización de consultas complejas y refactorización para mejorar la eficiencia del sistema.",
      "Uso avanzado de control de versiones y entornos de integración y despliegue continuo (CI/CD).",
    ],
    stack: ["Java", "Spring Boot", "Node.js", "Express", "Angular", "TypeScript", "MySQL", "MongoDB", "Redis", "Azure DevOps"],
  },
  {
    puesto: ".NET Developer",
    empresa: "Arvent Group",
    desde: "2022-07",
    hasta: "2024-04",
    periodo: "Jul 2022 – Abr 2024",
    tareas: [
      "Desarrollo y mantenimiento de aplicaciones y sistemas empresariales, colaborando con el equipo para resolver problemas y mejorar la calidad del software.",
      "Escritura, depuración y mantenimiento de código en entornos .NET, con foco en la estabilidad y rendimiento de las soluciones.",
      "Participación en el ciclo completo de desarrollo: relevamiento de requerimientos, implementación, pruebas y entrega.",
      "Trabajo con bases de datos relacionales, optimización de consultas y mantenimiento de esquemas en entornos productivos.",
    ],
    stack: [".NET", ".NET Framework", "TypeScript", "Angular", "MSSQL", "PL/SQL", "MySQL", "Azure DevOps"],
  },
  {
    puesto: "Medio Oficial – Redes y Mantenimiento de Línea",
    empresa: "Cooperativa Eléctrica de Cevige",
    desde: "2016-01",
    hasta: "2023-12",
    periodo: "2016 – 2023",
    tareas: [
      "Mantenimiento preventivo y correctivo de redes de distribución eléctrica en la localidad de Villa Gesell.",
      "Inspección, reparación y tendido de líneas aéreas y subterráneas, garantizando la continuidad del servicio.",
      "Trabajo en equipo bajo condiciones exigentes, cumplimiento de normas de seguridad eléctrica y gestión de emergencias en campo.",
    ],
    stack: [],
  },
  {
    puesto: "Empleado",
    empresa: "Estación de Servicio",
    desde: "2013-01",
    hasta: "2013-03",
    periodo: "Verano 2013",
    tareas: [
      "Atención al cliente en el shop, manejo de caja, producción de alimentos y limpieza general del establecimiento.",
    ],
    stack: [],
  },
  {
    puesto: "Encargado de Barras",
    empresa: "Pueblo Límite",
    desde: "2012-01",
    hasta: "2012-12",
    periodo: "2012",
    tareas: [
      "Supervisión y coordinación del personal de barras, gestión de stock de bebidas, cierre de cajas y control de ingresos.",
    ],
    stack: [],
  },
];
```

`data/educacion.ts`:

```ts
import type { Educacion } from "./tipos";

export const educacion: Educacion[] = [
  {
    titulo: "Técnico en Desarrollo de Software",
    institucion: "UADE – Universidad Argentina de la Empresa",
    periodo: "2016 – 2024",
  },
];
```

> El portfolio actual declara la carrera como "2022 - Presente" (en curso). El CV dice 2016–2024, terminada. Manda el CV.

- [ ] **Step 7: Escribir `data/habilidades.ts` y `data/tecnologias.ts`**

Los cinco grupos del CV. **Sin porcentajes**: las barras de progreso del portfolio actual tienen valores inventados que subvenden (marcan Java en 65% cuando es stack profesional diario).

```ts
import type { GrupoHabilidades } from "./tipos";

export const habilidades: GrupoHabilidades[] = [
  { categoria: "Lenguajes", items: ["C#", "Java", "TypeScript", "JavaScript", "SQL", "PHP"] },
  {
    categoria: "Frameworks & Web",
    items: [".NET", ".NET Framework", "Spring Boot", "Node.js", "Express", "Angular", "React Native", "Expo", "Electron", "HTML5 / CSS3"],
  },
  {
    categoria: "Bases de Datos",
    items: ["Microsoft SQL Server", "MySQL", "MongoDB", "Firebase (Firestore)", "Redis", "PL/SQL"],
  },
  {
    categoria: "Herramientas",
    items: ["Git", "Azure DevOps", "TFS", "REST APIs", "Linux (VPS)", "FTP/SFTP"],
  },
  {
    categoria: "IA & Productividad",
    items: ["Cursor", "Claude Code", "GitHub Copilot"],
  },
];
```

`data/tecnologias.ts` — hay SVG para doce; el resto van sin logo. **Un solo tratamiento para todas**: chip con borde, y el logo aparece dentro del chip solo si existe.

```ts
import type { Tecnologia } from "./tipos";

export const tecnologias: Tecnologia[] = [
  { nombre: "React / React Native", logo: "/tecnologias/React.svg" },
  { nombre: "JavaScript", logo: "/tecnologias/JavaScript.svg" },
  { nombre: "Angular", logo: "/tecnologias/angular.svg" },
  { nombre: "Java / Spring Boot", logo: "/tecnologias/java.svg" },
  { nombre: "Node.js", logo: "/tecnologias/nodejs.svg" },
  { nombre: ".NET", logo: "/tecnologias/NETcore.svg" },
  { nombre: "MySQL", logo: "/tecnologias/MySQL.svg" },
  { nombre: "MongoDB", logo: "/tecnologias/mongodb.svg" },
  { nombre: "HTML5", logo: "/tecnologias/HTML5.svg" },
  { nombre: "CSS3", logo: "/tecnologias/CSS3.svg" },
  { nombre: "Bootstrap", logo: "/tecnologias/Bootstrap.svg" },
  { nombre: "Android", logo: "/tecnologias/android.svg" },
  { nombre: "C#", logo: null },
  { nombre: "TypeScript", logo: null },
  { nombre: "Electron", logo: null },
  { nombre: "PostgreSQL", logo: null },
  { nombre: "Redis", logo: null },
  { nombre: "Firebase", logo: null },
  { nombre: "Git", logo: null },
  { nombre: "Linux (VPS)", logo: null },
];
```

> Se usa `nodejs.svg`, no el `.png` que referencia `inicio.js:68`. El `.png` duplicado se borra en la tarea 11.

- [ ] **Step 8: Escribir `data/proyectos.ts`**

Las seis fichas del §7 del spec, con las métricas verificadas contra cada repo.

```ts
import type { Proyecto } from "./tipos";

export const proyectos: Proyecto[] = [
  {
    slug: "ecosistema-roleplay",
    titulo: "Ecosistema de servidor de roleplay",
    anio: "2026",
    resumen:
      "Servidor de rol para GTA V con su web y su launcher de escritorio, unidos por una identidad de Steam que atraviesa las tres piezas.",
    descripcion: [
      "Un sistema de tres componentes que se despliegan y evolucionan juntos: el servidor de juego con sus recursos propios, la web pública con su panel privado de jugador, y un launcher de escritorio que reemplaza el flujo manual de conexión.",
      "La decisión de arquitectura central es que la web nunca escribe sobre las tablas del juego. Encola pedidos en tablas propias que un recurso del servidor consume y ejecuta con la lógica real del framework, de modo que el usuario de base de datos de la web tiene permisos de solo lectura sobre el estado de los jugadores.",
    ],
    stack: ["Lua 5.4", "Next.js", "React", "TypeScript", "Electron", "MySQL", "Tailwind CSS", "Steam OpenID", "Discord OAuth2"],
    metricas: { lineas: 58328, commits: 955, periodo: "ago 2026 – sep 2026" },
    destacados: [
      "Cola asíncrona entre la web y el juego: la web encola, el servidor ejecuta, el usuario de base de datos solo puede leer.",
      "Anti-fraude de pagos por doble criterio: referencia firmada con HMAC, revalidación contra la API del proveedor, e id de pago único contra doble acreditación por reintento de webhook.",
      "CSP con nonce por request y strict-dynamic; sanitización server-side del HTML de administración con allowlist explícita.",
      "Launcher portable que difiere su auto-actualización al próximo arranque, porque el ejecutable sigue vivo mientras descarga.",
      "Resolución de identificadores de Steam de 64 bits aprovechando los enteros nativos de Lua 5.4, evitando la pérdida de precisión de los números de JavaScript.",
      "Whitelist por roles con política fail-open deliberada: si el proveedor de identidad cae, entra el jugador en vez de rechazar a todos.",
    ],
    links: { demo: "https://farmeandoaura.net" },
    imagenes: [],
    anonimo: false,
    destacado: true,
  },
  {
    slug: "gestion-propiedades",
    titulo: "Plataforma de gestión de propiedades",
    anio: "2026",
    resumen:
      "Gestión de propiedades en alquiler y membresías: publicación con circuito de aprobación, búsqueda en mapa y panel administrativo.",
    descripcion: [
      "Plataforma full-stack donde los socios publican propiedades que pasan por un circuito de aprobación, los consumidores las buscan sobre un mapa y marcan favoritas, y un módulo de servicios gestiona solicitudes y asignaciones a operarios.",
      "El backend está organizado en tres capas estrictas con el SQL confinado a los repositories, lo que mantiene la lógica de negocio independiente del motor de base de datos.",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MySQL", "Google OAuth 2.0", "JWT", "Leaflet", "Recharts", "Nodemailer"],
    metricas: { lineas: 36920, commits: 139, periodo: "feb 2026 – may 2026" },
    destacados: [
      "Backend en tres capas estrictas: 15 controllers, 13 services y 14 repositories, con el SQL confinado a la capa de datos.",
      "Control de acceso por cuatro roles, aplicado tanto en el backend como en el enrutado del frontend.",
      "Tarea programada diaria que pausa las propiedades de membresías vencidas y notifica al usuario.",
      "Compresión de imágenes en el navegador antes de subirlas, para no transferir originales de cámara.",
      "Cinco plantillas de email transaccional propias para verificación y recuperación de cuenta.",
    ],
    links: { demo: "https://clubdepropietarios.com.ar" },
    imagenes: [],
    anonimo: false,
    destacado: true,
  },
  {
    slug: "gestion-cobros",
    titulo: "Sistema de gestión de cobros",
    anio: "2026",
    resumen:
      "Punto de venta y control de caja: cobros con descuento automático de stock y cierre con arqueo por método de pago.",
    descripcion: [
      "Sistema operativo de mostrador pensado para correr on-premise en la red local del comercio: registra cobros con productos asociados, descuenta stock validando disponibilidad, y maneja apertura y cierre de caja con arqueo desagregado.",
      "El foco del diseño está en la velocidad de carga en mostrador y en que los datos cuadren al cierre del día.",
    ],
    stack: ["React", "Vite", "Express", "MySQL", "JWT", "bcrypt", "SheetJS", "PM2"],
    metricas: { lineas: 20730, commits: 104, periodo: "dic 2025 – ene 2026" },
    destacados: [
      "Arqueo de caja con totales desagregados por método de pago y cálculo automático de diferencia.",
      "Anulación de cobro que restaura el stock; devoluciones modeladas como cantidades negativas.",
      "Vouchers virtuales de saldo a favor que se recalculan solos al cambiar los productos del cobro.",
      "Exportación a Excel con estilos y formato de moneda local.",
      "Atajos de teclado para carga rápida en mostrador, con listeners en fase de captura.",
      "Umbral de stock bajo configurable en caliente desde la interfaz.",
    ],
    links: {},
    imagenes: [],
    anonimo: false,
    destacado: true,
  },
  {
    slug: "visor-infracciones",
    titulo: "Visor de infracciones de tránsito",
    anio: "2026",
    resumen:
      "Aplicación de escritorio para revisar y despachar infracciones de estacionamiento captadas por dispositivos viales.",
    descripcion: [
      "El operador navega las capturas agrupadas por fecha, revisa la imagen junto a los metadatos del acta, y aprueba o rechaza con atajos de teclado. Al cerrar una fecha, solo las aprobadas se despachan.",
      "No usa base de datos: el estado de revisión vive como archivo plano dentro de cada carpeta, así que sobrevive reinicios y se puede inspeccionar desde el explorador de archivos.",
    ],
    stack: ["Electron", "JavaScript (ES Modules)", "FTP"],
    metricas: { lineas: 2420, commits: 14, periodo: "abr 2026 – may 2026" },
    destacados: [
      "Estado de revisión persistido como archivo plano por carpeta, sin base de datos e inspeccionable a mano.",
      "Despacho selectivo: solo salen de la máquina los archivos cifrados, la imagen en claro nunca se transfiere.",
      "Errores de transferencia crudos traducidos a mensajes accionables para el operador.",
      "Zoom y paneo de imagen, con navegación completa por teclado.",
      "Módulos del renderer sin dependencias circulares, resueltas con importación dinámica.",
    ],
    links: {},
    imagenes: [],
    anonimo: true,
    destacado: false,
  },
  {
    slug: "validador-contactos",
    titulo: "Validador de bases de contactos",
    anio: "2026",
    resumen:
      "Herramienta de escritorio que verifica en lote qué teléfonos de una base tienen cuenta activa, y devuelve el resultado como planilla.",
    descripcion: [
      "Toma una planilla de contactos, consulta cada número contra la plataforma de mensajería y devuelve un Excel con el resultado por fila, que además envía por email al terminar.",
      "Proyecto deliberadamente acotado: resuelve un flujo operativo puntual sin arrastrar infraestructura.",
    ],
    stack: ["Electron", "TypeScript", "SheetJS", "Nodemailer"],
    metricas: { lineas: 1033, commits: 4, periodo: "ene 2026" },
    destacados: [
      "Verificación real contra la plataforma, no heurística sobre el formato del número.",
      "Sesión persistente: se vincula una sola vez y sobrevive reinicios de la aplicación.",
      "Delay aleatorio entre consultas para reducir el riesgo de bloqueo por volumen.",
      "Cancelación en caliente que emite una planilla parcial marcando lo no procesado, con timeout de guardado.",
      "Ventana endurecida: aislamiento de contexto activo y sin integración de Node en el renderer.",
    ],
    links: {},
    imagenes: [],
    anonimo: true,
    destacado: false,
  },
  {
    slug: "gymapp",
    titulo: "GymApp",
    anio: "2026",
    resumen:
      "Cimiento de arquitectura para un SaaS multi-tenant de gimnasios: modelo de datos, autenticación y aislamiento por tenant, verificados por tests.",
    descripcion: [
      "Base de una plataforma donde cada gimnasio administra sus alumnos de forma aislada. El trabajo hecho es la capa que más caro sale corregir después: el modelo multi-tenant, los roles y las garantías de aislamiento.",
      "Se presenta como lo que es: la interfaz de usuario está pendiente. Lo que está terminado y testeado es la arquitectura.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Vitest"],
    metricas: { lineas: 652, commits: 20, periodo: "ago 2026" },
    destacados: [
      "Multi-tenancy de esquema compartido donde el identificador de tenant nunca viene del cliente: se deriva siempre de la sesión.",
      "Tipo branded que hace que el compilador impida pasar un identificador fuera de scope a una consulta.",
      "Control de acceso por tres roles con guards explícitos.",
      "Login federado restringido a usuarios dados de alta previamente, evitando autoasignación de cuentas.",
      "Mitigación de timing side-channel en el login por credenciales.",
    ],
    links: {},
    imagenes: [],
    anonimo: false,
    destacado: false,
  },
];
```

- [ ] **Step 9: Correr los tests y verificar que pasan**

Run: `pnpm test`
Esperado: PASS en los 11 tests (5 en `fechas.test.ts`, 6 en `data.test.ts`).

- [ ] **Step 10: Commit**

```bash
git add data lib tests vitest.config.ts
git commit -m "feat: capa de datos tipada con contenido del CV y seis proyectos"
```

---

### Task 3: Fondo generado y capas de página

Genera la plancha "Aurora" en WebP y monta las dos capas fijas del fondo.

**Files:**
- Create: `scripts/generar-fondo.mjs`
- Create: `public/fondo.webp`, `public/fondo-mobile.webp`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Delete: `public/SG.jpg` (no se usa; el wordmark se hace en CSS — ver Task 4)

**Interfaces:**
- Consumes: nada.
- Produces: clases `sg-page-bg` y `sg-hero-grid` disponibles para el layout. Assets en `/fondo.webp` (1672×941) y `/fondo-mobile.webp` (900×506).

- [ ] **Step 1: Portar el generador a `scripts/generar-fondo.mjs`**

Tomar el generador que ya existe en `C:\Users\sebag\AppData\Local\Temp\bg-gen\gen.js`, quedarse **solo con la variante `a`** (la aprobada), y cambiar la salida de PNG a WebP con sharp. El encoder PNG artesanal ya no hace falta: sharp recibe el buffer RGB crudo.

```js
// Genera la plancha de fondo del sitio. Ruido fBm de cuatro octavas sobre
// halos radiales, en la paleta de tokens. Correr con: pnpm fondo
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const AURORA = {
  base: "#0a0e1a",
  seed: 20260913,
  noiseScale: 2.6,
  glows: [
    { x: 0.5, y: -0.05, rx: 0.85, ry: 0.75, color: "#3b82f6", intensity: 0.55 },
    { x: 0.12, y: 0.62, rx: 0.55, ry: 0.6, color: "#1e3a8a", intensity: 0.45 },
    { x: 0.88, y: 0.3, rx: 0.5, ry: 0.55, color: "#93c5fd", intensity: 0.2 },
    { x: 0.68, y: 0.85, rx: 0.45, ry: 0.5, color: "#a78bfa", intensity: 0.16 },
  ],
};
```

El resto (`makeNoise`, `hex`, `render`) se copia literal del generador temporal. `render` devuelve un `Buffer` RGB de `width * height * 3`, que sharp consume así:

```js
async function escribir(width, height, salida) {
  const rgb = render(width, height, AURORA);
  await sharp(rgb, { raw: { width, height, channels: 3 } })
    .webp({ quality: 82 })
    .toFile(salida);
}

mkdirSync("public", { recursive: true });
await escribir(1672, 941, "public/fondo.webp");
await escribir(900, 506, "public/fondo-mobile.webp");
console.log("Fondo generado.");
```

- [ ] **Step 2: Generar los assets y verificar el peso**

```bash
pnpm fondo
ls -la public/fondo.webp public/fondo-mobile.webp
```

Esperado: ambos existen. El de escritorio debe pesar menos de 150 KB — la referencia logra 83,6 KB para las mismas dimensiones. Si se pasa, bajar `quality` a 75 y volver a correr.

- [ ] **Step 3: Agregar las capas de fondo a `app/globals.css`**

Portado de `C:\ServerGTA\ragnarok-web\app\globals.css` líneas 213–258, con el prefijo cambiado y apuntando a los assets nuevos.

```css
:root {
  --color-bg: #0a0e1a;
  --color-bg-card: #111a2e;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-accent-light: #93c5fd;
  --color-text: #e8edf7;
  --color-text-muted: #8b96ad;
  --color-border: rgba(59, 130, 246, 0.18);
  --gradient-accent: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
  color-scheme: dark;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, sans-serif;
}

.sg-page-bg {
  position: fixed;
  inset: 0;
  z-index: -2;
  /* Mobile-first: la plancha grande solo se pide a partir de 640px. */
  background-image: url("/fondo-mobile.webp");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}

@media (min-width: 640px) {
  .sg-page-bg {
    background-image: url("/fondo.webp");
  }
}

.sg-page-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59, 130, 246, 0.15), transparent),
    linear-gradient(
      to bottom,
      rgba(10, 14, 26, 0.08) 0%,
      rgba(10, 14, 26, 0.4) 45%,
      var(--color-bg) 90%
    );
}

.sg-hero-grid {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: linear-gradient(to bottom, black, transparent 1400px);
  mask-image: linear-gradient(to bottom, black, transparent 1400px);
  pointer-events: none;
}

.sg-section {
  max-width: 72rem;
  /* margin-inline y no el shorthand: "margin: 0 auto" fija margin-top a 0
     de forma explícita y, como esta regla vive fuera de @layer, le gana a
     cualquier utility de Tailwind — rompiendo los -mt-* de la barra de
     stats que tiene que cabalgar el hero. */
  margin-inline: auto;
  padding: 4rem 1.5rem;
}
```

- [ ] **Step 4: Montar las capas en `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sebastián Gómez",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="sg-page-bg" />
        <div className="sg-hero-grid" />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verificar visualmente**

```bash
pnpm dev
```

Abrir `http://localhost:3000`. Esperado: fondo azul oscuro con halo arriba, retícula de 48px visible en la parte superior que se desvanece hacia abajo, sin scroll horizontal.

- [ ] **Step 6: Commit**

```bash
git rm public/SG.jpg
git add scripts public/fondo.webp public/fondo-mobile.webp app/globals.css app/layout.tsx
git commit -m "feat: plancha de fondo generada y capas fijas de pagina"
```

---

### Task 4: Primitivas de interfaz

Los bloques reutilizables del sistema visual. Ninguna página los usa todavía; esta tarea los deja disponibles y verificables.

**Files:**
- Create: `components/ui/Wordmark.tsx`, `components/ui/BadgePill.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/GlassCard.tsx`, `components/ui/Reveal.tsx`, `components/ui/ScrollToTop.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: tokens de `app/globals.css` (Task 3).
- Produces:
  - `<Wordmark />` — sin props
  - `<BadgePill children dot?: boolean />`
  - `<SectionHeading titulo: string subtitulo?: string />`
  - `<GlassCard className?: string children />`
  - `<Reveal children className?: string delay?: number />`
  - `<ScrollToTop />`
  - Clases: `sg-button`, `sg-button-outline`, `sg-button-outline-sm`, `sg-card`, `sg-step-card`, `sg-step-number-bg`, `sg-step-icon`, `sg-badge-pill`, `sg-glass-card`, `sg-reveal`, `sg-scroll-top`

- [ ] **Step 1: Portar las clases de componente a `app/globals.css`**

Copiar desde `C:\ServerGTA\ragnarok-web\app\globals.css` los bloques de estas líneas, cambiando `rw-` por `sg-`:

| Bloque | Líneas en la referencia |
|---|---|
| `.rw-card` | 19–24 |
| `.rw-badge-pill` y variantes | 96–117 |
| `.rw-button-pill`, `-outline`, `-outline-sm` | 119–166 |
| `.rw-button-connect` (→ `sg-button`) | 172–197 |
| `.rw-step-card`, `-number-bg`, `-icon` | 328–374 |
| `.rw-section-heading` y sus partes | 376–404 |
| `.rw-glass-card` y sus dos capas | 537–571 |
| `.rw-reveal` + su bloque reduced-motion | 651–668 |
| `.rw-scroll-top` y partes | 1139–1175 |

Tres cambios deliberados respecto del original:

1. En `.sg-glass-card-bg`, las URLs apuntan a `/fondo-mobile.webp` y `/fondo.webp`.
2. Agregar el fallback de iOS Safari, donde `background-attachment: fixed` tiene un bug de repintado:

```css
@media (max-width: 639px) {
  .sg-glass-card-bg {
    background-attachment: scroll;
  }
}
```

3. Agregar foco visible, que la referencia no tiene — comunica el foco solo con color de borde:

```css
:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Escribir `components/ui/Wordmark.tsx`**

`SG.dev` como texto con gradiente. No usa imagen: `public/SG.jpg` es un logo sobre fondo crema que no se puede recortar limpio.

```tsx
export default function Wordmark() {
  return (
    <span className="sg-wordmark">
      SG<span className="sg-wordmark-dev">.dev</span>
    </span>
  );
}
```

Con este CSS en `globals.css`:

```css
.sg-wordmark {
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
}

.sg-wordmark-dev {
  background: linear-gradient(100deg, #93c5fd, #3b82f6 55%, #a78bfa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] **Step 3: Escribir `BadgePill`, `SectionHeading` y `GlassCard`**

```tsx
// components/ui/BadgePill.tsx
export default function BadgePill({
  children,
  dot = false,
}: {
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <span className="sg-badge-pill">
      {dot && <span className="sg-badge-pill-dot" aria-hidden="true">●</span>}
      {children}
    </span>
  );
}
```

```tsx
// components/ui/SectionHeading.tsx
export default function SectionHeading({
  titulo,
  subtitulo,
}: {
  titulo: string;
  subtitulo?: string;
}) {
  return (
    <div className="sg-section-heading">
      <span className="sg-section-heading-line" aria-hidden="true">
        <span className="sg-section-heading-dot" />
      </span>
      <h2 className="text-3xl font-bold">{titulo}</h2>
      {subtitulo && (
        <p className="max-w-xl text-center text-sm text-[var(--color-text-muted)]">{subtitulo}</p>
      )}
    </div>
  );
}
```

```tsx
// components/ui/GlassCard.tsx
export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`sg-glass-card ${className}`}>
      <div className="sg-glass-card-bg" aria-hidden="true" />
      <div className="sg-glass-card-glow" aria-hidden="true" />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
```

- [ ] **Step 4: Escribir `Reveal` y `ScrollToTop`**

`components/ui/Reveal.tsx` — portado de `C:\ServerGTA\ragnarok-web\components\ui\Reveal.tsx`, con `rw-` cambiado a `sg-`. Se conserva la decisión de **no** llamar `unobserve`: la animación se repite si el elemento sale y vuelve a entrar.

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // threshold bajo a propósito: con elementos muy altos, un valor como
    // 0.15 pide que el 15% de TODA la altura esté visible, lo que al tope
    // de la página no se cumple nunca.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sg-reveal ${visible ? "sg-reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
```

`components/ui/ScrollToTop.tsx` — portado de `C:\ServerGTA\ragnarok-web\components\ui\ScrollToTop.tsx` sin cambios funcionales: botón de 52px que aparece pasados 400px y dibuja un anillo SVG de progreso de lectura. Cambiar `rw-` por `sg-` y el id del gradiente a `sg-scroll-top-gradient`.

- [ ] **Step 5: Verificar visualmente**

Crear temporalmente en `app/page.tsx` un render de cada primitiva, correr `pnpm dev`, y confirmar: el wordmark muestra el gradiente, el badge tiene punto verde, la glass card deja ver el fondo desenfocado, el botón levanta 1px en hover, y el scroll-to-top aparece al bajar. Revertir `app/page.tsx` al terminar.

- [ ] **Step 6: Verificar reduced-motion**

En DevTools, Rendering → «Emulate CSS prefers-reduced-motion: reduce». Esperado: el contenido con `Reveal` se ve inmediatamente, sin desplazamiento ni fundido.

- [ ] **Step 7: Commit**

```bash
git add components/ui app/globals.css
git commit -m "feat: primitivas de interfaz del sistema visual"
```

---

### Task 5: Nav y Footer

El marco compartido por las cuatro rutas.

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `components/ui/BrandIcons.tsx`
- Modify: `app/layout.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: `Wordmark` (Task 4), `contacto` y `perfil` de `data/` (Task 2).
- Produces: `<Nav />` y `<Footer />` montados en el layout raíz.

- [ ] **Step 1: Portar las clases de nav y footer**

Desde la referencia: `.rw-nav` (26–56), `.rw-nav-pill` (260–278), `.rw-footer` y sus partes (406–535). Prefijo `sg-`.

En `.sg-footer-bg`, apuntar a `/fondo-mobile.webp` y `/fondo.webp`, y agregar el mismo fallback de `background-attachment: scroll` por debajo de 640px.

- [ ] **Step 2: Escribir `components/layout/Nav.tsx`**

Pill flotante que arranca **transparente con borde transparente** y solo al pasar `scrollY > 8` gana fondo, blur y borde. En mobile los links muestran solo el icono.

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, User, FolderGit2, Mail } from "lucide-react";
import Wordmark from "@/components/ui/Wordmark";

const LINKS = [
  { href: "/", label: "Inicio", Icon: Home },
  { href: "/sobre-mi", label: "Sobre mí", Icon: User },
  { href: "/proyectos", label: "Proyectos", Icon: FolderGit2 },
  { href: "/contacto", label: "Contacto", Icon: Mail },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sg-nav ${scrolled ? "sg-nav-scrolled" : ""}`}>
      <Link href="/" aria-label="Sebastián Gómez" className="shrink-0">
        <Wordmark />
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-1">
        {LINKS.map(({ href, label, Icon }) => {
          const activo = pathname === href || pathname === `${href}/`;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={activo ? "page" : undefined}
              className={`sg-nav-pill text-sm ${
                activo ? "sg-nav-pill-active" : "text-[var(--color-text-muted)]"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

> `pathname === \`${href}/\`` es necesario porque `trailingSlash: true` hace que las rutas lleguen con barra final.

- [ ] **Step 3: Escribir `components/layout/Footer.tsx`**

Tres columnas con las mismas dos capas de glass del original. **No** lleva el bloque "Colores Utilizados" ni "Tipografia Web" del footer actual: documentaban el diseño que se está reemplazando.

Columnas: identidad (wordmark + resumen corto + redes), secciones (los cuatro links), y contacto (email con botón de copiar, conservando el patrón de feedback de 2 segundos del footer actual).

Primero `components/ui/BrandIcons.tsx`. **lucide-react ya no trae iconos de
marca** — los removió por cuestiones de marca registrada, y la versión instalada
(1.45.0) no exporta `Github`, `Linkedin` ni `Instagram`. La referencia resuelve
lo mismo con SVG inline para Steam y Discord, así que este es el patrón fiel al
sistema, no un parche:

```tsx
// Iconos de marca en SVG inline: lucide-react no los provee.
// Todos en viewBox 24x24 y `fill="currentColor"`, para que hereden color
// como cualquier icono de lucide.
type Props = { size?: number; className?: string };

function Brand({ size = 16, className, children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function GithubIcon(props: Props) {
  return (
    <Brand {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </Brand>
  );
}

export function LinkedinIcon(props: Props) {
  return (
    <Brand {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </Brand>
  );
}

export function InstagramIcon(props: Props) {
  return (
    <Brand {...props}>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
    </Brand>
  );
}
```

Y con eso, el footer:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import Wordmark from "@/components/ui/Wordmark";
import { contacto } from "@/data/contacto";

const ICONOS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  WhatsApp: MessageCircle,
};

export default function Footer() {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    await navigator.clipboard.writeText(contacto.email);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <footer className="sg-footer">
      <div className="sg-footer-bg" aria-hidden="true" />
      <div className="sg-footer-glow" aria-hidden="true" />
      <div className="relative z-[2] mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Wordmark />
          <p className="text-sm text-[var(--color-text-muted)]">
            Desarrollador Full Stack en Buenos Aires, Argentina.
          </p>
          <ul className="flex gap-2">
            {contacto.redes.map((red) => {
              const Icon = ICONOS[red.nombre as keyof typeof ICONOS];
              return (
                <li key={red.nombre}>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={red.nombre}
                    className="sg-social-icon"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Secciones">
          <h2 className="sg-footer-heading">Secciones</h2>
          {SECCIONES.map((s) => (
            <Link key={s.href} href={s.href} className="sg-footer-link">
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <h2 className="sg-footer-heading">Contacto</h2>
          <button type="button" onClick={copiar} className="sg-footer-connect">
            <span className="truncate text-sm">{contacto.email}</span>
            {copiado ? (
              <Check size={16} className="shrink-0 text-[#4ade80]" aria-hidden="true" />
            ) : (
              <Copy size={16} className="shrink-0" aria-hidden="true" />
            )}
            <span className="sr-only">{copiado ? "Email copiado" : "Copiar email"}</span>
          </button>
          <p aria-live="polite" className="h-4 text-xs text-[#4ade80]">
            {copiado ? "Copiado" : ""}
          </p>
        </div>
      </div>
      <p className="relative z-[2] border-t border-[var(--color-border)] px-6 py-5 text-center text-xs text-[var(--color-text-muted)]">
        {contacto.copyright}
      </p>
    </footer>
  );
}
```

Con la lista de secciones declarada arriba del componente:

```tsx
const SECCIONES = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];
```

Y el icono social, que tiñe con el color de marca solo en hover para no romper el monocromo:

```css
.sg-social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: color 150ms, border-color 150ms;
}

.sg-social-icon:hover {
  color: var(--color-text);
  border-color: var(--color-accent);
}
```

> El `aria-live="polite"` del "Copiado" es lo que hace que un lector de pantalla anuncie el resultado. El footer actual cambia el texto del botón sin anunciarlo.

- [ ] **Step 4: Montar ambos en `app/layout.tsx`**

```tsx
<body>
  <div className="sg-page-bg" />
  <div className="sg-hero-grid" />
  <a href="#contenido" className="sg-skip-link">Saltar al contenido</a>
  <Nav />
  {children}
  <Footer />
  <ScrollToTop />
</body>
```

Con el skip link, que el original no tiene:

```css
.sg-skip-link {
  position: absolute;
  left: -9999px;
  z-index: 100;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-accent);
}

.sg-skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

- [ ] **Step 5: Verificar**

`pnpm dev`. Confirmar: la nav es transparente al tope y gana fondo al scrollear; el link activo se marca; a 400px de ancho solo se ven iconos; el botón de copiar cambia a tilde por 2 segundos; Tab desde el tope revela el skip link.

- [ ] **Step 6: Commit**

```bash
git add components/layout app/layout.tsx app/globals.css
git commit -m "feat: nav flotante y footer con glass"
```

---

### Task 6: Home larga

**Files:**
- Create: `components/home/Hero.tsx`, `components/home/StatsBar.tsx`, `components/home/StackGrid.tsx`, `components/home/ProyectosDestacados.tsx`, `components/home/CtaBand.tsx`
- Create: `components/proyectos/ProyectoCard.tsx`
- Modify: `app/page.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: `perfil`, `proyectos`, `tecnologias` (Task 2); `BadgePill`, `Reveal`, `SectionHeading` (Task 4).
- Produces: `<ProyectoCard proyecto: Proyecto />`, reutilizada por `/proyectos` en la Task 8.

- [ ] **Step 1: Escribir `Hero.tsx`**

Badge, nombre, `FULL STACK` en gradiente, resumen del CV, dos botones.

```tsx
import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import BadgePill from "@/components/ui/BadgePill";
import { perfil } from "@/data/perfil";
import { contacto } from "@/data/contacto";

export default function Hero() {
  const github = contacto.redes.find((r) => r.nombre === "GitHub")!;

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-32 text-center">
      {perfil.disponible && <BadgePill dot>Disponible para trabajar</BadgePill>}
      <h1 className="text-6xl font-extrabold tracking-tight text-balance sm:text-7xl lg:text-8xl">
        {perfil.nombre}
        <span className="sg-hero-gradient block">FULL STACK</span>
      </h1>
      <p className="max-w-xl text-lg text-[var(--color-text-muted)]">{perfil.resumen}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/contacto" className="sg-button">
          <Mail size={18} aria-hidden="true" />
          Contactame
        </Link>
        <a href={github.url} target="_blank" rel="noopener noreferrer" className="sg-button-outline">
          <GithubIcon size={18} />
          GitHub
        </a>
      </div>
    </section>
  );
}
```

```css
.sg-hero-gradient {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] **Step 2: Escribir `StatsBar.tsx`**

Cuatro celdas con valores derivados, no hardcodeados, para que no envejezcan.

```tsx
import { CalendarDays, FolderGit2, Code2, Building2 } from "lucide-react";
import { perfil } from "@/data/perfil";
import { proyectos } from "@/data/proyectos";
import { habilidades } from "@/data/habilidades";
import { experiencias } from "@/data/experiencia";
import { aniosDesde } from "@/lib/fechas";

export default function StatsBar() {
  const lenguajes = habilidades.find((g) => g.categoria === "Lenguajes")!.items.length;
  const celdas = [
    { Icon: CalendarDays, valor: `${aniosDesde(perfil.inicioProfesional)}+`, label: "Años" },
    { Icon: FolderGit2, valor: String(proyectos.length), label: "Proyectos" },
    { Icon: Code2, valor: String(lenguajes), label: "Lenguajes" },
    { Icon: Building2, valor: experiencias[0].empresa, label: "Actualmente" },
  ];

  return (
    <div className="sg-section relative z-10 -mt-24 sm:-mt-32">
      <div className="sg-stats-container grid grid-cols-2 sm:grid-cols-4">
        {celdas.map(({ Icon, valor, label }) => (
          <div key={label} className="flex items-center gap-3 p-5">
            <span className="sg-step-icon !h-9 !w-9 !rounded-lg">
              <Icon size={16} aria-hidden="true" />
            </span>
            <span>
              <b className="block text-base font-bold tabular-nums">{valor}</b>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                {label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Portar `.rw-stats-container` (referencia, 319–326) como `.sg-stats-container`. Las celdas se tocan sin gap, separadas por borde.

- [ ] **Step 3: Escribir `StackGrid.tsx`**

Un solo tratamiento para todas las tecnologías: chip con borde, y el logo dentro solo si existe.

```tsx
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { tecnologias } from "@/data/tecnologias";

export default function StackGrid() {
  return (
    <section className="sg-section">
      <SectionHeading titulo="Stack" subtitulo="Tecnologías con las que trabajo a diario." />
      <div className="flex flex-wrap justify-center gap-3">
        {tecnologias.map((t, i) => (
          <Reveal key={t.nombre} delay={i * 50}>
            <span className="sg-tech-chip">
              {t.logo && (
                <img src={t.logo} alt="" aria-hidden="true" width={20} height={20} />
              )}
              {t.nombre}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

```css
.sg-tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  font-weight: 600;
  transition: border-color 150ms, transform 150ms;
}

.sg-tech-chip:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .sg-tech-chip:hover {
    transform: none;
  }
}
```

- [ ] **Step 4: Escribir `ProyectoCard.tsx`**

La card **no depende de imágenes**. Icono, título, resumen, tags, métricas, y el año gigante de fondo al 8% que sube al 22% en hover.

```tsx
import { ExternalLink } from "lucide-react";
import type { Proyecto } from "@/data/tipos";

export default function ProyectoCard({
  proyecto,
  onAbrir,
}: {
  proyecto: Proyecto;
  onAbrir?: () => void;
}) {
  return (
    <article className="sg-step-card">
      <span className="sg-step-number-bg" aria-hidden="true">{proyecto.anio}</span>
      <h3 className="text-lg font-bold">{proyecto.titulo}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{proyecto.resumen}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
        {proyecto.stack.map((t) => (
          <li key={t} className="sg-tag">{t}</li>
        ))}
      </ul>
      <dl className="mt-auto flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-3 text-xs">
        <div>
          <dt className="uppercase tracking-wide text-[var(--color-text-muted)]">Líneas</dt>
          <dd className="font-bold tabular-nums">{proyecto.metricas.lineas.toLocaleString("es-AR")}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-[var(--color-text-muted)]">Commits</dt>
          <dd className="font-bold tabular-nums">{proyecto.metricas.commits}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-[var(--color-text-muted)]">Período</dt>
          <dd className="font-bold">{proyecto.metricas.periodo}</dd>
        </div>
      </dl>
      <div className="flex gap-2">
        {onAbrir && (
          <button type="button" onClick={onAbrir} className="sg-button-outline-sm">
            Ver detalle
          </button>
        )}
        {proyecto.links.demo && (
          <a
            href={proyecto.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="sg-button-outline-sm"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Ver online
          </a>
        )}
      </div>
    </article>
  );
}
```

```css
.sg-tag {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid var(--color-border);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-accent-light);
}
```

> El `.sg-step-number-bg` portado usa `font-size: 5rem`. Con un año de cuatro dígitos en vez de un número de un dígito hay que bajarlo a `3rem` y correr `right` a `0.75rem` para que no desborde.

- [ ] **Step 5: Escribir `ProyectosDestacados.tsx` y `CtaBand.tsx`**

```tsx
// components/home/ProyectosDestacados.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProyectoCard from "@/components/proyectos/ProyectoCard";
import { proyectos } from "@/data/proyectos";

export default function ProyectosDestacados() {
  const destacados = proyectos.filter((p) => p.destacado);

  return (
    <section className="sg-section">
      <SectionHeading
        titulo="Proyectos"
        subtitulo="Una selección del trabajo más reciente."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destacados.map((p, i) => (
          <Reveal key={p.slug} delay={i * 100}>
            <ProyectoCard proyecto={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/proyectos" className="sg-button-outline">
          Ver todos los proyectos
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
```

```tsx
// components/home/CtaBand.tsx
import Link from "next/link";
import { Mail } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="sg-section">
      <div className="sg-cta-band">
        <h2 className="text-2xl font-bold text-balance">¿Tenés un proyecto en mente?</h2>
        <p className="mx-auto max-w-md text-sm text-[var(--color-text-muted)]">
          Contame en qué estás trabajando y vemos cómo puedo ayudarte.
        </p>
        <Link href="/contacto" className="sg-button">
          <Mail size={18} aria-hidden="true" />
          Escribime
        </Link>
      </div>
    </section>
  );
}
```

Portar `.rw-cta-band` (referencia, 1053–1064) como `.sg-cta-band`, agregando el `flex` que la referencia resuelve por fuera:

```css
.sg-cta-band {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.05);
  background:
    radial-gradient(ellipse 80% 120% at 50% 0%, rgba(109, 91, 208, 0.28), transparent 70%),
    rgba(17, 26, 46, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  text-align: center;
}
```

> Es el único lugar del sitio donde el violeta domina sobre el azul. Está tomado tal cual de la referencia y es deliberado: marca el cierre de la página.

Nota: en la home las cards **no** abren modal — `ProyectoCard` se usa sin `onAbrir`, así que el botón "Ver detalle" no se renderiza y queda solo "Ver online" cuando hay demo. El detalle completo vive en `/proyectos`.

- [ ] **Step 6: Componer `app/page.tsx`**

```tsx
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import StackGrid from "@/components/home/StackGrid";
import ProyectosDestacados from "@/components/home/ProyectosDestacados";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <StatsBar />
      <StackGrid />
      <ProyectosDestacados />
      <CtaBand />
    </main>
  );
}
```

- [ ] **Step 7: Verificar**

`pnpm dev`. Confirmar: la barra de stats **cabalga el hero** (si queda separada, el `margin-inline` de `.sg-section` está mal y volvió a ser shorthand); el año gigante de la card se enciende en hover; nada desborda a 400px.

- [ ] **Step 8: Commit**

```bash
git add components/home components/proyectos app/page.tsx app/globals.css
git commit -m "feat: home larga con hero, stats, stack y destacados"
```

---

### Task 7: Página Sobre mí

**Files:**
- Create: `app/sobre-mi/page.tsx`
- Create: `components/sobre-mi/Timeline.tsx`, `components/sobre-mi/HabilidadesGrid.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `perfil`, `experiencias`, `educacion`, `habilidades` (Task 2); `SectionHeading`, `Reveal`, `GlassCard` (Task 4).
- Produces: ruta `/sobre-mi`.

- [ ] **Step 1: Escribir `Timeline.tsx`**

Recibe los ítems ya normalizados para servir a experiencia y a educación con el mismo componente.

```tsx
import Reveal from "@/components/ui/Reveal";

export type ItemTimeline = {
  titulo: string;
  subtitulo: string;
  periodo: string;
  detalles: string[];
  tags: string[];
};

export default function Timeline({ items }: { items: ItemTimeline[] }) {
  return (
    <ol className="sg-timeline">
      {items.map((item, i) => (
        <li key={`${item.titulo}-${item.periodo}`} className="sg-timeline-item">
          <Reveal delay={i * 80}>
            <div className="sg-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{item.titulo}</h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {item.periodo}
                </span>
              </div>
              <p className="text-sm font-semibold text-[var(--color-accent-light)]">{item.subtitulo}</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-[var(--color-text-muted)]">
                {item.detalles.map((d) => (
                  <li key={d} className="sg-bullet">{d}</li>
                ))}
              </ul>
              {item.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <li key={t} className="sg-tag">{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
```

Con este CSS:

```css
.sg-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0 0 0 1.75rem;
}

/* Línea vertical continua detrás de los puntos. */
.sg-timeline::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 1px;
  background: var(--color-border);
}

.sg-timeline-item {
  position: relative;
}

.sg-timeline-item::before {
  content: "";
  position: absolute;
  left: -1.75rem;
  top: 1.35rem;
  width: 11px;
  height: 11px;
  border-radius: 999px;
  background: var(--color-bg);
  border: 2px solid var(--color-accent);
}

/* Viñeta propia: un guion de acento en vez del bullet del navegador. */
.sg-bullet {
  position: relative;
  padding-left: 0.9rem;
}

.sg-bullet::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 5px;
  height: 1px;
  background: var(--color-accent);
}
```

> El punto se posiciona en `top: 1.35rem` para alinearse con la primera línea del título dentro de la card, no con el borde superior de la card.

- [ ] **Step 2: Escribir `HabilidadesGrid.tsx`**

Los cinco grupos del CV como tarjetas, cada una con su lista de tags. **Sin barras de progreso ni porcentajes.**

```tsx
import Reveal from "@/components/ui/Reveal";
import { habilidades } from "@/data/habilidades";

export default function HabilidadesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {habilidades.map((grupo, i) => (
        <Reveal key={grupo.categoria} delay={i * 80}>
          <div className="sg-card h-full">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
              {grupo.categoria}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {grupo.items.map((item) => (
                <li key={item} className="sg-tag">{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Componer `app/sobre-mi/page.tsx`**

Secciones en orden: perfil profesional (en `GlassCard`), experiencia (Timeline con las 5 del CV), habilidades, educación (Timeline), e idiomas y competencias.

Mapeo de experiencias a `ItemTimeline`:

```tsx
const itemsExperiencia = experiencias.map((e) => ({
  titulo: e.puesto,
  subtitulo: e.empresa,
  periodo: e.periodo,
  detalles: e.tareas,
  tags: e.stack,
}));
```

Idiomas y competencias, del CV: Español nativo, Inglés intermedio, y la línea de competencias ("Fuerte adaptabilidad, pensamiento lógico estructurado, proactividad y sólida orientación al trabajo colaborativo en células ágiles.").

Metadata de la ruta:

```tsx
export const metadata = {
  title: "Sobre mí — Sebastián Gómez",
  description: "Experiencia, habilidades técnicas y formación.",
};
```

**No** se incluye foto de perfil ni su placeholder: no hay retrato disponible y un recuadro vacío con un icono de usuario es peor que no tener nada.

- [ ] **Step 4: Verificar**

`pnpm dev`, ir a `/sobre-mi`. Confirmar: las cinco experiencias en orden decreciente, la línea de la timeline alineada con los puntos, sin barras de porcentaje, y que a 400px las tarjetas bajan a una columna.

- [ ] **Step 5: Commit**

```bash
git add app/sobre-mi components/sobre-mi app/globals.css
git commit -m "feat: pagina sobre mi con el contenido del CV"
```

---

### Task 8: Página Proyectos

**Files:**
- Create: `app/proyectos/page.tsx`, `components/proyectos/ListaProyectos.tsx`, `components/proyectos/ProyectoModal.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `proyectos` (Task 2); `ProyectoCard` (Task 6); `SectionHeading`, `Reveal` (Task 4).
- Produces: ruta `/proyectos`.

- [ ] **Step 1: Escribir `ProyectoModal.tsx`**

Modal accesible: cierra con Escape y con click en el overlay, atrapa el foco, y bloquea el scroll del body mientras está abierto.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Proyecto } from "@/data/tipos";

export default function ProyectoModal({
  proyecto,
  onCerrar,
}: {
  proyecto: Proyecto;
  onCerrar: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar();
    }
    document.addEventListener("keydown", onKey);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previo;
    };
  }, [onCerrar]);

  return (
    <div className="sg-modal-overlay" onClick={onCerrar}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        tabIndex={-1}
        className="sg-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onCerrar} aria-label="Cerrar" className="sg-modal-cerrar">
          <X size={18} />
        </button>
        <h2 id="modal-titulo" className="text-2xl font-bold">{proyecto.titulo}</h2>
        {proyecto.descripcion.map((p) => (
          <p key={p} className="text-sm text-[var(--color-text-muted)]">{p}</p>
        ))}
        <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
          Destacados
        </h3>
        <ul className="flex flex-col gap-1.5 text-sm text-[var(--color-text-muted)]">
          {proyecto.destacados.map((d) => (
            <li key={d} className="sg-bullet">{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

El overlay usa `rgba(255,255,255,0.1)` con `backdrop-filter: blur(12px)`, como el modal de la referencia. El `.sg-modal` es la única superficie del sitio, junto al botón principal, autorizada a llevar sombra: `0 24px 80px -24px rgba(0,0,0,0.7)`.

- [ ] **Step 2: Escribir `ListaProyectos.tsx`**

Componente cliente que mantiene el estado del modal y renderiza la grilla.

```tsx
"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import ProyectoCard from "@/components/proyectos/ProyectoCard";
import ProyectoModal from "@/components/proyectos/ProyectoModal";
import { proyectos } from "@/data/proyectos";
import type { Proyecto } from "@/data/tipos";

export default function ListaProyectos() {
  const [abierto, setAbierto] = useState<Proyecto | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((p, i) => (
          <Reveal key={p.slug} delay={i * 70}>
            <ProyectoCard proyecto={p} onAbrir={() => setAbierto(p)} />
          </Reveal>
        ))}
      </div>
      {abierto && <ProyectoModal proyecto={abierto} onCerrar={() => setAbierto(null)} />}
    </>
  );
}
```

- [ ] **Step 3: Componer `app/proyectos/page.tsx`**

Encabezado de sección, una línea que explique que varios repos son privados, y `<ListaProyectos />`.

```tsx
export const metadata = {
  title: "Proyectos — Sebastián Gómez",
  description: "Seis proyectos de desarrollo full stack, web, escritorio y servidores.",
};
```

La nota sobre repos privados evita que la ausencia de links a GitHub se lea como un descuido: "Varios de estos proyectos son privados o pertenecen a clientes, así que no todos tienen código público."

- [ ] **Step 4: Verificar accesibilidad del modal**

`pnpm dev`, ir a `/proyectos`. Confirmar con teclado: Enter en "Ver detalle" abre, el foco entra al diálogo, Escape cierra, y el scroll del fondo no se mueve con el modal abierto.

- [ ] **Step 5: Commit**

```bash
git add app/proyectos components/proyectos app/globals.css
git commit -m "feat: pagina de proyectos con fichas tecnicas y modal"
```

---

### Task 9: Página Contacto

Porta el formulario con su validación de tres niveles, que funciona y no tiene librería detrás.

**Files:**
- Create: `app/contacto/page.tsx`, `components/contacto/ContactoForm.tsx`, `components/contacto/ContactoInfo.tsx`
- Create: `lib/emailjs.ts`, `lib/validacion.ts`
- Create: `.env.local.example`
- Test: `tests/validacion.test.ts`
- Modify: `app/globals.css`, `.env.local`

**Interfaces:**
- Consumes: `contacto` (Task 2); `GlassCard` (Task 4).
- Produces:
  - `validarCampo(nombre: CampoFormulario, valor: string): { error: string; warning: string }`
  - `enviarEmail(datos: DatosFormulario): Promise<{ success: boolean; error?: string }>`
  - Tipos `CampoFormulario = "nombre" | "email" | "asunto" | "mensaje"` y `DatosFormulario = Record<CampoFormulario, string>`

- [ ] **Step 1: Escribir el test que falla**

`tests/validacion.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { validarCampo } from "@/lib/validacion";

describe("validarCampo", () => {
  it("exige el nombre", () => {
    expect(validarCampo("nombre", "  ").error).toBe("El nombre es requerido");
  });

  it("pide al menos dos caracteres en el nombre", () => {
    expect(validarCampo("nombre", "a").error).toBe("El nombre debe tener al menos 2 caracteres");
  });

  it("acepta un nombre válido", () => {
    expect(validarCampo("nombre", "Sebastián")).toEqual({ error: "", warning: "" });
  });

  it("exige el email como error, pero un formato inválido es solo advertencia", () => {
    expect(validarCampo("email", "").error).toBe("El email es requerido");
    expect(validarCampo("email", "no-es-un-mail").warning).toBe("Por favor, usa un email válido");
    expect(validarCampo("email", "no-es-un-mail").error).toBe("");
  });

  it("acepta un email válido", () => {
    expect(validarCampo("email", "hola@ejemplo.com")).toEqual({ error: "", warning: "" });
  });

  it("pide al menos tres caracteres en el asunto", () => {
    expect(validarCampo("asunto", "ab").error).toBe("El asunto debe tener al menos 3 caracteres");
  });

  it("pide al menos diez caracteres en el mensaje", () => {
    expect(validarCampo("mensaje", "corto").error).toBe("El mensaje debe tener al menos 10 caracteres");
  });
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `pnpm test`
Esperado: FAIL — no existe `@/lib/validacion`.

- [ ] **Step 3: Escribir `lib/validacion.ts`**

Mismas reglas y mismos textos que `src/components/Contacto.js:27-65`. La distinción error/warning se conserva: un email vacío es error, uno mal formado es solo advertencia.

```ts
export type CampoFormulario = "nombre" | "email" | "asunto" | "mensaje";
export type DatosFormulario = Record<CampoFormulario, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarCampo(
  nombre: CampoFormulario,
  valor: string,
): { error: string; warning: string } {
  const v = valor.trim();

  switch (nombre) {
    case "nombre":
      if (!v) return { error: "El nombre es requerido", warning: "" };
      if (v.length < 2) return { error: "El nombre debe tener al menos 2 caracteres", warning: "" };
      return { error: "", warning: "" };
    case "email":
      if (!v) return { error: "El email es requerido", warning: "" };
      if (!EMAIL.test(valor)) return { error: "", warning: "Por favor, usa un email válido" };
      return { error: "", warning: "" };
    case "asunto":
      if (!v) return { error: "El asunto es requerido", warning: "" };
      if (v.length < 3) return { error: "El asunto debe tener al menos 3 caracteres", warning: "" };
      return { error: "", warning: "" };
    case "mensaje":
      if (!v) return { error: "El mensaje es requerido", warning: "" };
      if (v.length < 10) return { error: "El mensaje debe tener al menos 10 caracteres", warning: "" };
      return { error: "", warning: "" };
  }
}
```

- [ ] **Step 4: Correr y verificar que pasa**

Run: `pnpm test`
Esperado: PASS.

- [ ] **Step 5: Portar `lib/emailjs.ts`**

Copiar `src/config/emailjs.js` cambiando el prefijo de las variables y agregando tipos. Se conservan el init único, el timeout de 30 s con `Promise.race` y el mapeo de errores a mensajes en español. **Se quitan los `console.log` de éxito**, que imprimen la respuesta del servicio en la consola del visitante.

```ts
import emailjs from "@emailjs/browser";
import type { DatosFormulario } from "./validacion";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

let inicializado = false;

export async function enviarEmail(
  datos: DatosFormulario,
): Promise<{ success: boolean; error?: string }> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return { success: false, error: "Configuración de EmailJS incompleta." };
  }
  if (!inicializado) {
    emailjs.init(PUBLIC_KEY);
    inicializado = true;
  }

  const params = {
    from_name: datos.nombre,
    from_email: datos.email,
    subject: datos.asunto,
    message: datos.mensaje,
    to_email: "sbagomeznight@gmail.com",
    reply_to: datos.email,
    from_name_display: `${datos.nombre} (${datos.email})`,
    fecha: new Date().toLocaleString("es-AR", {
      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
    }),
  };

  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000),
    );
    await Promise.race([
      emailjs.send(SERVICE_ID, TEMPLATE_ID, params, {
        publicKey: PUBLIC_KEY,
        limitRate: { throttle: 0, id: "contact-form" },
      }),
      timeout,
    ]);
    return { success: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    if (msg.includes("Timeout")) {
      return { success: false, error: "El envío tardó demasiado. Verificá tu conexión e intentá de nuevo." };
    }
    if (msg.includes("Template")) {
      return { success: false, error: "Error en la configuración del servidor. Intentá más tarde." };
    }
    return { success: false, error: "Error al enviar el mensaje. Intentá de nuevo." };
  }
}
```

- [ ] **Step 6: Migrar las variables de entorno**

Leer los valores actuales de `.env` y `.env.local` y escribirlos en `.env.local` con los nombres nuevos. **No imprimir los valores en la consola.**

```bash
# Copiar a mano los tres valores de .env a .env.local con el prefijo nuevo:
#   REACT_APP_EMAILJS_SERVICE_ID  -> NEXT_PUBLIC_EMAILJS_SERVICE_ID
#   REACT_APP_EMAILJS_TEMPLATE_ID -> NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
#   REACT_APP_EMAILJS_PUBLIC_KEY  -> NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

Crear `.env.local.example` con las tres claves vacías, y confirmar que `.env*` sigue en `.gitignore` salvo el `.example`.

- [ ] **Step 7: Escribir `ContactoForm.tsx`**

Replica el comportamiento de `src/components/Contacto.js:67-182`. Los textos de ayuda se conservan literales de `Contacto.js:261, 291, 317, 343`.

```tsx
"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { validarCampo, type CampoFormulario, type DatosFormulario } from "@/lib/validacion";
import { enviarEmail } from "@/lib/emailjs";

const CAMPOS: {
  id: CampoFormulario;
  etiqueta: string;
  placeholder: string;
  ayuda: string;
  multilinea?: boolean;
}[] = [
  { id: "nombre", etiqueta: "Nombre", placeholder: "Escribí tu nombre completo", ayuda: "Ingresá tu nombre y apellido" },
  { id: "email", etiqueta: "Email", placeholder: "tu@email.com", ayuda: "Por favor, usá un email válido" },
  { id: "asunto", etiqueta: "Asunto", placeholder: "¿De qué querés hablar?", ayuda: "Describí brevemente el tema de tu mensaje" },
  { id: "mensaje", etiqueta: "Mensaje", placeholder: "Contame sobre tu proyecto o idea...", ayuda: "Escribí tu mensaje detallado acá", multilinea: true },
];

const VACIO: DatosFormulario = { nombre: "", email: "", asunto: "", mensaje: "" };

export default function ContactoForm() {
  const [datos, setDatos] = useState<DatosFormulario>(VACIO);
  const [errores, setErrores] = useState<Partial<DatosFormulario>>({});
  const [avisos, setAvisos] = useState<Partial<DatosFormulario>>({});
  const [tocados, setTocados] = useState<Partial<Record<CampoFormulario, boolean>>>({});
  const [enviando, setEnviando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [resultado, setResultado] = useState<"ok" | "error" | null>(null);

  function revalidar(id: CampoFormulario, valor: string) {
    const { error, warning } = validarCampo(id, valor);
    setErrores((p) => ({ ...p, [id]: error }));
    setAvisos((p) => ({ ...p, [id]: warning }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTocados({ nombre: true, email: true, asunto: true, mensaje: true });

    const nuevosErrores: Partial<DatosFormulario> = {};
    const nuevosAvisos: Partial<DatosFormulario> = {};
    for (const campo of CAMPOS) {
      const { error, warning } = validarCampo(campo.id, datos[campo.id]);
      if (error) nuevosErrores[campo.id] = error;
      if (warning) nuevosAvisos[campo.id] = warning;
    }
    setErrores(nuevosErrores);
    setAvisos(nuevosAvisos);

    const primerError = CAMPOS.find((c) => nuevosErrores[c.id]);
    if (primerError) {
      document.getElementById(primerError.id)?.focus();
      return;
    }

    setEnviando(true);
    setResultado(null);
    setProgreso(0);
    // Progreso simulado: EmailJS no expone avance real del envío.
    const tick = setInterval(() => {
      setProgreso((p) => (p >= 90 ? p : p + Math.random() * 15));
    }, 200);

    const r = await enviarEmail(datos);

    clearInterval(tick);
    setProgreso(100);
    if (r.success) {
      setResultado("ok");
      setDatos(VACIO);
      setErrores({});
      setAvisos({});
      setTocados({});
    } else {
      setResultado("error");
    }
    setTimeout(() => {
      setEnviando(false);
      setProgreso(0);
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {CAMPOS.map(({ id, etiqueta, placeholder, ayuda, multilinea }) => {
        const error = tocados[id] ? errores[id] : "";
        const aviso = tocados[id] && !error ? avisos[id] : "";
        const props = {
          id,
          name: id,
          value: datos[id],
          placeholder,
          "aria-invalid": Boolean(error),
          "aria-describedby": `${id}-msg`,
          className: `sg-input ${error ? "sg-input-error" : aviso ? "sg-input-warning" : ""}`,
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setDatos((p) => ({ ...p, [id]: e.target.value }));
            revalidar(id, e.target.value);
          },
          onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setTocados((p) => ({ ...p, [id]: true }));
            revalidar(id, e.target.value);
          },
        };

        return (
          <div key={id} className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide">
              {etiqueta}
            </label>
            {multilinea ? <textarea rows={5} {...props} /> : <input type="text" {...props} />}
            <p
              id={`${id}-msg`}
              className={`text-xs ${
                error ? "text-[#ef4444]" : aviso ? "text-[#f59e0b]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {error || aviso || ayuda}
            </p>
          </div>
        );
      })}

      <button type="submit" className="sg-button justify-center" disabled={enviando}>
        {enviando ? (
          <>
            <Loader2 size={18} className="sg-spin" aria-hidden="true" />
            Enviando… {Math.round(progreso)}%
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Enviar mensaje
          </>
        )}
      </button>

      {enviando && (
        <div className="sg-progress-track">
          <div className="sg-progress-fill" style={{ width: `${progreso}%` }} />
        </div>
      )}

      <div aria-live="polite">
        {resultado === "ok" && (
          <p className="sg-alert sg-alert-ok">
            <CheckCircle2 size={16} aria-hidden="true" />
            ¡Mensaje enviado! Te respondo a la brevedad.
          </p>
        )}
        {resultado === "error" && (
          <p className="sg-alert sg-alert-error">
            <AlertCircle size={16} aria-hidden="true" />
            Hubo un error al enviar el mensaje. Intentá de nuevo.
          </p>
        )}
      </div>
    </form>
  );
}
```

CSS de apoyo — el input sale de `.rw-footer-input` de la referencia (495–518), sin el padding izquierdo que ahí deja lugar a un icono:

```css
.sg-input {
  width: 100%;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  font: inherit;
  font-size: 0.875rem;
  color: var(--color-text);
  outline: none;
  transition: border-color 150ms;
}

.sg-input:focus { border-color: var(--color-accent); }
.sg-input-error { border-color: #ef4444; }
.sg-input-warning { border-color: #f59e0b; }

.sg-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  border: 1px solid;
}

.sg-alert-ok { color: #4ade80; border-color: rgba(74, 222, 128, 0.35); background: rgba(74, 222, 128, 0.1); }
.sg-alert-error { color: #f87171; border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.1); }

.sg-spin { animation: sg-spin 1s linear infinite; }

@keyframes sg-spin {
  to { transform: rotate(360deg); }
}
```

**La contraparte de reduced-motion NO va acá.** Va dentro del único bloque
`@media (prefers-reduced-motion: reduce)` que vive al final de
`app/globals.css`, agregando esta regla:

```css
  .sg-spin { animation: none; }
```

Escribir un bloque `@media` suelto junto a la regla base reintroduce el bug de
cascada que el proyecto ya sufrió dos veces: un `@media` no aporta
especificidad, así que si queda antes de la regla base pierde a igual
especificidad y el override es código muerto que ningún lint detecta. Las
reglas base de esta tarea van **antes** del bloque; el bloque sigue siendo lo
último del archivo.

Portar además `.rw-progress-track` y `.rw-progress-fill` (referencia, 301–317) como `.sg-progress-*`.

Tres mejoras sobre el formulario actual, que no las tiene: `aria-invalid` y `aria-describedby` en cada control, `aria-live="polite"` sobre las alertas para que un lector de pantalla anuncie el resultado, y `noValidate` en el `<form>` para que la validación propia no compita con la del navegador.

- [ ] **Step 8: Escribir `ContactoInfo.tsx` y componer la página**

`ContactoInfo` renderiza los tres medios de `contacto.medios` en `GlassCard`, mapeando el campo `icono` a lucide (`mail`, `message-circle`, `map-pin`), más las cuatro redes. El medio "Ubicación" tiene `link` vacío y se renderiza como texto, no como enlace — hoy apunta a `#`.

`app/contacto/page.tsx` los pone en `grid gap-8 lg:grid-cols-2` con metadata propia.

- [ ] **Step 9: Verificar con un envío real**

`pnpm dev`, ir a `/contacto`, completar el formulario y enviarlo. Confirmar la recepción del email. Probar también: enviar vacío enfoca el campo "nombre", y un email mal formado muestra advertencia ámbar pero **no** bloquea el envío.

- [ ] **Step 10: Commit**

```bash
git add app/contacto components/contacto lib tests .env.local.example app/globals.css
git commit -m "feat: pagina de contacto con validacion portada"
```

---

### Task 10: Metadata, SEO y archivos de sitio

**Files:**
- Create: `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/icon.ico`
- Modify: `app/layout.tsx`, `.htaccess`
- Delete: `public/manifest.json`, `public/sitemap.xml`, `public/robots.txt`, `public/favicon.ico`

**Interfaces:**
- Consumes: `perfil`, `contacto` (Task 2).
- Produces: rutas `/sitemap.xml`, `/robots.txt` y página 404.

- [ ] **Step 1: Metadata completa en `app/layout.tsx`**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://sebastiangomez.com.ar"),
  title: {
    default: "Sebastián Gómez — Full Stack Developer",
    template: "%s — Sebastián Gómez",
  },
  description:
    "Desarrollador Full Stack. .NET, Java / Spring Boot, Node.js, Angular, React Native y Electron.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://sebastiangomez.com.ar",
    siteName: "Sebastián Gómez",
    title: "Sebastián Gómez — Full Stack Developer",
    description: "Desarrollador Full Stack con experiencia en web, backend, mobile y escritorio.",
  },
};

export const viewport = {
  themeColor: "#0a0e1a",
  colorScheme: "dark" as const,
};
```

> El `manifest.json` viejo declara `background_color: #ffffff` sobre una interfaz completamente oscura, e íconos con `type: image/png` que apuntan a un `.jpg`. Se elimina en vez de arrastrarlo: una PWA no aporta nada a un portfolio estático.

- [ ] **Step 2: Escribir `app/not-found.tsx`**

El sitio actual no tiene ruta 404: cualquier URL inexistente cae en blanco.

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenido" className="sg-section flex flex-col items-center gap-4 text-center">
      <p className="text-6xl font-extrabold text-[var(--color-accent-light)]">404</p>
      <h1 className="text-2xl font-bold">Esta página no existe</h1>
      <p className="text-sm text-[var(--color-text-muted)]">
        Puede que el enlace esté roto o que la página haya cambiado de lugar.
      </p>
      <Link href="/" className="sg-button">Volver al inicio</Link>
    </main>
  );
}
```

- [ ] **Step 3: Escribir `app/sitemap.ts` y `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sebastiangomez.com.ar";
  return ["", "/sobre-mi", "/proyectos", "/contacto"].map((ruta) => ({
    url: `${base}${ruta}/`,
    lastModified: new Date(),
  }));
}
```

> El `sitemap.xml` actual lista anclas con hash (`#inicio`, `#somos`) de una versión anterior del sitio que ya no existe.

- [ ] **Step 4: Simplificar el `.htaccess`**

Con `trailingSlash: true` cada ruta es una carpeta con su `index.html`, así que la reescritura a `index.html` que necesitaba la SPA desaparece. Reemplazar el contenido por:

```apache
ErrorDocument 404 /404.html
```

- [ ] **Step 5: Mover el favicon a la convención del App Router**

```bash
git mv public/favicon.ico app/icon.ico
```

Next toma cualquier `app/icon.*` y emite el `<link rel="icon">` solo, sin que haya que declararlo en el layout.

- [ ] **Step 6: Verificar el build estático**

```bash
pnpm build
ls out/ out/sobre-mi/ out/proyectos/ out/contacto/
```

Esperado: `out/index.html`, `out/sobre-mi/index.html`, `out/proyectos/index.html`, `out/contacto/index.html`, `out/404.html`, `out/sitemap.xml`, `out/robots.txt`.

- [ ] **Step 7: Commit**

El favicon no se borra: el Step 5 ya lo movió a `app/icon.ico` con `git mv`.

```bash
git add app .htaccess
git rm public/manifest.json public/sitemap.xml public/robots.txt
git commit -m "feat: metadata, sitemap, 404 y htaccess simplificado"
```

---

### Task 11: Limpieza y verificación final

**Files:**
- Delete: `src/`, `public/index.html`, `public/tecnologias/nodejs.png`, `public/proyectos/`, `.bg-candidates/`, `EMAILJS_SETUP.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: repo sin restos de CRA y verificación completa registrada.

- [ ] **Step 1: Borrar lo que quedó huérfano**

```bash
rm -rf src public/index.html .bg-candidates public/proyectos
rm -f public/tecnologias/nodejs.png EMAILJS_SETUP.md
```

`public/proyectos/` contiene capturas de los tres proyectos viejos que ya no se muestran, incluida `bakastamu.png` de 812 KB sin optimizar, y `juego-botones.png` que ya estaba huérfana. `nodejs.png` es el duplicado pesado del `.svg`.

Además, **eliminar el script `lint` de `package.json`**. `next lint` fue removido
en Next 16: el comando ya no existe, así que Next interpreta `lint` como un
directorio de proyecto y falla con «Invalid project directory provided». El
scaffold además nunca instaló `eslint` ni `eslint-config-next`, y no hay config
de ESLint en el repo. Es un script muerto que invoca un comando inexistente
apoyándose en paquetes ausentes. Las compuertas reales del proyecto son
`tsc --noEmit`, `pnpm test` y `pnpm build`; montar ESLint ahora sería alcance
que el spec no pide.

Quitar esta línea de `package.json`:

```json
    "lint": "next lint",
```

**Y dejar de trackear `.env`.** Está versionado desde `43a2b34` con las tres
claves de EmailJS, porque el `.gitignore` de CRA ignora `.env.local` pero no
`.env`. Sacarlo del índice no lo borra del historial ya empujado —la
remediación real es rotar las credenciales, y eso es del dueño del repo— pero
evita arrastrar la exposición a la rama nueva:

```bash
printf '\n.env\n' >> .gitignore
git rm --cached .env
```

El archivo sigue en disco y la aplicación lo sigue leyendo; sólo deja de
versionarse.

- [ ] **Step 2: Confirmar que no quedaron referencias**

```bash
grep -rn "REACT_APP_\|bootstrap\|fontawesome\|contactConfig\|useNavigation" --include="*.ts" --include="*.tsx" --include="*.json" . | grep -v node_modules
```

Esperado: sin resultados. Si aparece alguno, es una referencia viva a código borrado.

- [ ] **Step 3: Reescribir el `README.md`**

Reemplazar las instrucciones de CRA por las de Next.js: requisitos (Node 20+, pnpm), `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm fondo`, las tres variables de entorno por nombre, y cómo desplegar (subir el contenido de `out/` al hosting). Documentar que el contenido vive en `data/` y que actualizar el CV es editar esos archivos.

- [ ] **Step 4: Verificación completa**

Correr los cinco chequeos del §9 del spec y **anotar la salida real de cada uno**. No se declara nada terminado sin haberlos visto pasar.

```bash
pnpm test
pnpm build
npx serve out
```

1. `pnpm build` sin errores ni warnings de TypeScript.
2. Navegar las cuatro rutas en `out/` servido estáticamente, **incluyendo entrada directa por URL a cada una**, no solo desde la home.
3. Envío real del formulario con recepción confirmada.
4. DevTools a 400px de ancho: sin scroll horizontal en ninguna de las cuatro páginas.
5. `pnpm test` en verde.
6. Contraste AA, medido con el panel de accesibilidad de DevTools sobre texto real:
   `--color-text-muted` sobre `--color-bg` debe dar **6.5:1** (pasa AA para texto
   normal, no llega a AAA), y `--color-accent-light` sobre `--color-bg-card` en
   los tags debe superar 4.5:1. Si alguno queda por debajo, aclarar el token en
   `:root` en vez de parchear el componente.

- [ ] **Step 5: Commit y merge**

```bash
git add -A
git commit -m "chore: limpieza de restos de CRA y README actualizado"
git checkout master
git merge redesign
```

- [ ] **Step 6: Cerrar el worktree**

```bash
cd /c/Users/sebag/Downloads/Proyectos/portfolio-react
git worktree remove .claude/worktrees/redesign
```

---

## Notas fuera de alcance

Registradas en el §10 del spec y **no** parte de este plan. Las de seguridad conviene atenderlas aparte y pronto, porque hay secretos que requieren rotación:

- `SistemaGestion`: `.env` versionado con un JWT secret real desde el primer commit, el mismo secret hardcodeado como fallback, y comparación de contraseña en texto plano.
- `validador-whatsapp`: `.env.example` versionado con datos reales, y la configuración de build que copia el `.env` real dentro del ejecutable entregado al cliente.
- `Club de Propietarios` y `server`: IP real del VPS en documentación versionada.
