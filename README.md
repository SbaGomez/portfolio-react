# Portfolio — Sebastian Gomez

Portfolio personal en Next.js compilado a HTML estático y servido por Apache.

**En producción:** [sebastiangomez.com.ar](https://sebastiangomez.com.ar)

## Stack

- **Next.js 16** (App Router, `output: "export"`)
- **React 19** y **TypeScript**
- **Tailwind CSS v4** para layout y spacing; el sistema visual propio es CSS plano
  sobre custom properties en `app/globals.css`
- **lucide-react** para iconografía
- **EmailJS** para el formulario de contacto (sin backend)
- **Vitest** para los tests

## Requisitos

- Node.js 22.13 o superior (lo exige la versión de pnpm que fija `packageManager`)
- pnpm

## Puesta en marcha

```bash
pnpm install
cp .env.local.example .env.local   # completar las tres credenciales
pnpm dev
```

El sitio queda en [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Compila y exporta el sitio estático a `out/` |
| `pnpm test` | Corre los tests con Vitest |
| `pnpm fondo` | Regenera las planchas de fondo en `public/` |
| `pnpm iconos` | Regenera `lib/iconos-generados.ts` con los iconos de tecnología |

`pnpm iconos` hay que correrlo cuando se agrega una tecnología nueva a un
`stack` en `data/`. Precomputa los iconos en vez de importar `simple-icons`
desde un componente, que arrastraría los 3460 iconos del paquete al bundle
del navegador.

No hay script de lint: `next lint` fue removido en Next 16 y el proyecto no usa
ESLint. Las compuertas reales son `pnpm test` y `pnpm build`, que incluye el
chequeo de tipos.

## Variables de entorno

Van en `.env.local`, que no se versiona. `.env.local.example` lista las claves
vacías como plantilla.

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

Las tres son públicas por diseño: viajan al bundle del navegador, que es donde
corre EmailJS.

## Dónde vive el contenido

Todo el contenido está separado de la presentación, en módulos tipados bajo
`data/`. **Actualizar el CV es editar esos archivos, no los componentes.**

| Archivo | Contenido |
| --- | --- |
| `data/perfil.ts` | Nombre, título, resumen profesional |
| `data/experiencia.ts` | Puestos, períodos y tareas |
| `data/educacion.ts` | Formación académica |
| `data/habilidades.ts` | Habilidades por categoría |
| `data/tecnologias.ts` | Stack mostrado en la home |
| `data/proyectos.ts` | Fichas de proyectos |
| `data/contacto.ts` | Email, teléfono, redes |
| `data/tipos.ts` | Tipos que gobiernan todo lo anterior |

## Estructura

```
app/          rutas del App Router (/, /sobre-mi, /proyectos, /contacto)
components/   componentes por sección, más las primitivas en ui/
data/         contenido tipado
lib/          validación, envío de email y utilidades de fechas
tests/        tests de Vitest
scripts/      generador de las planchas de fondo
```

## Despliegue

```bash
pnpm build
```

Genera el sitio completo en `out/`. Desplegar es subir el **contenido** de esa
carpeta a la raíz del hosting. El `.htaccess` incluido sólo declara la página
404: como cada ruta se exporta como carpeta con su `index.html`, Apache las
sirve sin reglas de reescritura.

## Convenciones

- Clases propias con prefijo `sg-`, definidas en `app/globals.css`.
- Tema único oscuro; los colores salen de las custom properties en `:root` y
  nunca se hardcodean en los componentes.
- El bloque `@media (prefers-reduced-motion: reduce)` es **lo último** de
  `app/globals.css`: una media query no aporta especificidad, así que cualquier
  regla agregada después lo dejaría sin efecto.
