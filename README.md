# 💼 Portfolio — Sebastián Gómez

![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Export estático](https://img.shields.io/badge/salida-100%25%20est%C3%A1tica-success?style=for-the-badge)

Portfolio personal compilado a HTML estático y servido por Apache. Sin servidor de
aplicación, sin base de datos y sin backend propio.

**🔗 [Verlo en vivo](https://sebastiangomez.com.ar)**

---

## ✨ Qué tiene

| | Sección | Qué muestra |
|---|---|---|
| 🏠 | **Inicio** | Presentación, métricas, stack y proyectos destacados |
| 👤 | **Sobre mí** | Experiencia, habilidades, formación e idiomas |
| 💻 | **Proyectos** | Fichas con capturas, stack y métricas, en un modal con slider |
| ✉️ | **Contacto** | Formulario con validación en vivo, sin backend |

---

## 🛠️ Stack

| Herramienta | Versión | Para qué |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.3.2 | App Router con `output: "export"` |
| [React](https://react.dev/) | 19.2.8 | Componentes |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipado del contenido y los componentes |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Layout y espaciado |
| [lucide-react](https://lucide.dev/) | 1.33 | Iconografía de interfaz |
| [simple-icons](https://simpleicons.org/) | 16.31 | Logos de tecnologías (precomputados) |
| [EmailJS](https://www.emailjs.com/) | 4.4 | Envío del formulario desde el navegador |
| [Vitest](https://vitest.dev/) | 4.1 | Tests |
| [sharp](https://sharp.pixelplumbing.com/) | 0.34 | Generación de las planchas de fondo |

El sistema visual **no** es Tailwind: son clases propias con prefijo `sg-`, escritas
en CSS plano sobre custom properties, en `app/globals.css`. Tailwind se usa para
layout y spacing.

---

## 🚀 Puesta en marcha

```bash
pnpm install
cp .env.local.example .env.local   # completar las tres credenciales
pnpm dev
```

Queda en [http://localhost:3000](http://localhost:3000).

> [!IMPORTANT]
> Hace falta **Node.js 22.13 o superior**. No es capricho: la versión de pnpm que
> fija `packageManager` usa `node:sqlite`, que en Node 20 no existe y hace fallar
> la instalación.

---

## 📜 Scripts

| Script | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Compila y exporta el sitio estático a `out/` |
| `pnpm test` | Corre los tests con Vitest |
| `pnpm fondo` | Regenera las planchas de fondo en `public/` |
| `pnpm iconos` | Regenera `lib/iconos-generados.ts` con los logos de tecnologías |

> [!NOTE]
> No hay script de lint. `next lint` fue removido en Next 16 y el proyecto no usa
> ESLint: las compuertas reales son `pnpm test` y `pnpm build`, que incluye el
> chequeo de tipos.

---

## 🔑 Variables de entorno

Van en `.env.local`, que no se versiona. `.env.local.example` lista las claves
vacías como plantilla.

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

Las tres son **públicas por diseño**: viajan al bundle del navegador, que es donde
corre EmailJS. En CI se pasan como secrets sólo para no versionarlas, no porque
sean secretas.

---

## 📝 Dónde vive el contenido

Todo el contenido está separado de la presentación, en módulos tipados bajo `data/`.

> [!TIP]
> **Actualizar el CV es editar esos archivos, no los componentes.**

| Archivo | Contenido |
|---|---|
| `data/perfil.ts` | Nombre, inicio profesional y resumen |
| `data/experiencia.ts` | Puestos, períodos y tareas |
| `data/educacion.ts` | Formación académica |
| `data/habilidades.ts` | Habilidades por categoría |
| `data/tecnologias.ts` | Stack mostrado en la home |
| `data/proyectos.ts` | Fichas de proyectos, con capturas y métricas |
| `data/contacto.ts` | Email, redes y otros medios |
| `data/tipos.ts` | Los tipos que gobiernan todo lo anterior |

---

## 📁 Estructura

```
├── app/          Rutas del App Router (/, /sobre-mi, /proyectos, /contacto)
│                 más sitemap, robots y la página 404
├── components/   Componentes por sección, con las primitivas en ui/
├── data/         Contenido tipado
├── lib/          Validación, envío de email, fechas e iconos
├── public/       Imágenes, capturas, .htaccess y la página de error
├── scripts/      Generadores de fondos e iconos
└── tests/        Tests de Vitest
```

---

## 🚢 Despliegue

Automático, por GitHub Actions:

```
master ──merge──> produccion ──push──> Actions ──FTPS──> hosting
```

| Etapa | Qué pasa |
|---|---|
| Pull request contra `produccion` | Sólo verifica: instala, testea y compila |
| Push sobre `produccion` | Verifica **y** sube `out/` por FTPS |

El workflow corta el build si `out/.htaccess` no existe. Sin ese archivo el sitio
seguiría andando, pero las URLs inexistentes dejarían de tener página de error: un
fallo silencioso que conviene que rompa temprano.

---

## ⚠️ Trampas conocidas

Cosas que ya mordieron una vez y están documentadas en el código.

### 🪶 La página 404 tiene que ser liviana

El hosting **no logra entregar cuerpos de error grandes**. Medido contra producción:

| Tamaño del `ErrorDocument` | Resultado |
|---|---|
| 19 KB (el `404.html` que genera Next) | La petición cuelga ~40 s y muere en un 520 de Cloudflare |
| 1.929 bytes (`public/404-min.html`) | Responde en 0,25 s |

Por eso el `.htaccess` apunta a `404-min.html`, que es autocontenido: sin fuentes,
sin imágenes y sin JavaScript. **Si crece, hay que volver a medirlo:**

```bash
curl -s -o /dev/null -w '%{http_code} %{size_download} %{time_total}\n' \
  https://sebastiangomez.com.ar/noexiste
```

### 📦 Los iconos se precomputan

`pnpm iconos` hay que correrlo al agregar una tecnología nueva a un `stack` en
`data/`. Precomputa los logos en `lib/iconos-generados.ts` en vez de importar
`simple-icons` desde un componente: hacerlo desde uno marcado `"use client"`
arrastra los 3460 iconos del paquete al bundle del navegador.

### 🎬 El bloque de `prefers-reduced-motion` va último

En `app/globals.css`, el bloque `@media (prefers-reduced-motion: reduce)` es **lo
último del archivo**. Una media query no aporta especificidad, así que cualquier
regla agregada después lo dejaría sin efecto.

---

## 🎨 Convenciones

- Clases propias con prefijo `sg-`, definidas en `app/globals.css`.
- Tema único oscuro. Los colores salen de las custom properties en `:root` y nunca
  se hardcodean en los componentes.
- El contenido va en `data/`; los componentes no traen texto propio.

---

## 👤 Autor

**Sebastián Gómez** — [sebastiangomez.com.ar](https://sebastiangomez.com.ar)
