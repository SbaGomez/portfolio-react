# Rediseño del portfolio — diseño

Fecha: 2026-09-13
Estado: aprobado para planificar

## 1. Objetivo

Rehacer `sebastiangomez.com.ar` tomando como referencia visual el sistema de
`ragnarok-web`, y repoblar su contenido desde el CV real y los proyectos que
existen en disco.

El portfolio actual subvende a su autor y en varios puntos contradice su CV:
declara "Proyectos Personales 2022-Presente" y "Freelance 2021-2022" cuando la
trayectoria real son dos empleos formales, muestra la carrera como en curso
cuando está terminada, y lista tres proyectos menores mientras seis proyectos
sustanciales quedan afuera.

## 2. Decisiones tomadas

Todas acordadas con el autor antes de escribir este documento.

| Decisión | Valor |
|---|---|
| Fidelidad a la referencia | Sistema visual completo, adaptado a portfolio |
| Stack | Next.js 16 + React 19 + TypeScript + Tailwind v4 |
| Deploy | Export estático al hosting Apache actual |
| Estructura | Home larga de scroll + las 4 rutas existentes |
| Fondo | Plancha generada "Aurora" (variante A) |
| Contenido | El CV manda en todo el sitio |
| Email público | `admin@sebastiangomez.com.ar` (el del dominio) |
| Proyectos | Ficha técnica con métricas reales, sin depender de capturas |
| Clientes | Proyectos de cliente anonimizados |

### 2.1 Dónde se traza la línea de confidencialidad

Los empleadores **sí** se nombran en la timeline de experiencia: Synerbit y
Arvent Group ya figuran como tales en el CV que el autor entrega, y nombrar a
quién trabajás para es información pública normal.

Los **sistemas** de esos empleadores y de sus clientes **no** se nombran ni se
describen a nivel de arquitectura interna. Publicar cómo funciona el sistema de
fotomultas de un proveedor, o el esquema de datos de su `.log`, es distinto de
decir dónde trabajás, y puede acarrear un problema laboral real.

Excepción razonada: la plataforma de gestión de propiedades se publica con su
enlace, porque el sitio ya está online y es públicamente accesible bajo esa
marca — enlazar un sitio público que construiste no divulga nada. Lo que se
omite de esa ficha es la infraestructura (IP del VPS, layout del servidor,
rutas de administración).

## 3. Arquitectura

### 3.1 Stack y por qué

Next.js 16.3.2, React 19.2.8, TypeScript 5, Tailwind v4 — el mismo stack exacto
que la referencia. Eso permite portar su `globals.css` de forma directa en vez
de reinterpretarlo, que es donde se pierden los detalles que hacen que un
sistema visual se sienta cohesivo.

Dato que orientó la decisión: la referencia **casi no usa Tailwind para el
diseño**. El 90% de su aspecto son ~1515 líneas de CSS escrito a mano con
prefijo `rw-*` sobre custom properties en `:root`; Tailwind solo le resuelve
layout y spacing. El sistema se replica con CSS, no con utilidades.

Entorno verificado: Node 24.12.0, pnpm 11.21.0. Next 16 requiere Node 20+.

### 3.2 Export estático

```
output: 'export'
images.unoptimized: true
trailingSlash: true
```

`trailingSlash` hace que cada ruta se emita como `<ruta>/index.html`, que es lo
que Apache sirve de forma natural. El `.htaccess` actual existe solo para
reescribir todo a `index.html` (necesario en una SPA de React Router) y deja de
hacer falta; se reemplaza por una `ErrorDocument 404`.

Consecuencia asumida: no hay route handlers ni SSR. No se necesitan — el
contenido es estático y EmailJS corre en el navegador.

### 3.3 Aislamiento del trabajo

Rama `redesign` sobre el repo actual, trabajada en un **git worktree** para que
`master` siga checkouteado y desplegable durante toda la migración. El sitio en
producción no depende del estado del rediseño en ningún momento.

### 3.4 Qué sobrevive y qué se va

Sobrevive:

- La integración de EmailJS, en un componente `"use client"`. Las variables
  pasan de `REACT_APP_*` a `NEXT_PUBLIC_*`.
- La validación en tiempo real de tres niveles del formulario (error / warning /
  helper), que funciona y no tiene librería detrás.
- La máquina de estados de modales y slider de proyectos.
- Los SVG de tecnologías y las capturas de `public/proyectos/`.

Se va:

- **Bootstrap**. Se usa poco (grid, offcanvas, algunas utilidades) y es la causa
  de los ~40 `!important` de `SobreMi.module.css` y del uso masivo en
  `Navbar.css`. Su grid se reemplaza por CSS Grid y el offcanvas por un drawer
  propio.
- **FontAwesome**, reemplazado por `lucide-react` como la referencia.
- Los ~3.000 líneas de CSS con tres paletas superpuestas, siete escalas de radio
  y keyframes duplicados en cuatro archivos.
- Los estilos inline de `inicio.js`, que pisan el responsive del CSS module.
- El `position: fixed` del footer con su listener de `resize`.

## 4. Sistema visual

### 4.1 Tokens

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
}
```

Semánticos, solo para el formulario y los estados: `#4ade80` éxito, `#f59e0b`
advertencia, `#ef4444` error.

El detalle que define el look: **el borde no es neutro**. Todo el sitio bordea
con el acento al 18% de opacidad. Eso, y usar un solo azul en tres densidades
(5% para la retícula, 18% para cada borde, 100% para los acentos), es lo que
produce la coherencia cromática del original. No se introducen colores de marca
por tecnología ni paletas secundarias.

Tema único oscuro, declarado explícitamente. No hay modo claro.

### 4.2 Tipografía

`system-ui, -apple-system, sans-serif`, igual que la referencia.

| Nivel | Tamaño | Peso | Tracking |
|---|---|---|---|
| Hero | `clamp(3.75rem, 9vw, 6rem)` | 800 | `-0.025em` |
| H1 de página | 2.25–3rem | 700 | `-0.02em` |
| H2 de sección | 1.875rem | 700 | — |
| Título de card | 1rem | 600 | — |
| Cuerpo | 0.875rem | 400 | — |
| Etiqueta | 0.75rem uppercase | 600 | `0.05em` |

El sitio vive entre 12 y 14px, con un único salto teatral en el hero. Ese
contraste es deliberado y es parte de la identidad que se replica.

Consecuencia sobre el contenido: el footer actual imprime literalmente
"Tipografia Web: Roboto Condensed" y doce muestras de color bajo el rótulo
"Colores Utilizados". Ese bloque documenta el diseño que se está reemplazando,
así que se elimina, junto con los campos `colors` y `typography` de la config.

### 4.3 Superficies

Radios, cinco niveles: `8px` botón pequeño · `10px` botones, inputs, iconos ·
`12px` card base · `14px` botón principal · `16px` nav, glass, step-card ·
`20px` banda CTA · `999px` pills y avatares.

Bordes: `1px solid var(--color-border)` universal. Variante tenue al 8% para
cards de contenido largo, que suben al 40% en hover.

**La elevación se comunica con borde y color de fondo, no con sombra.** En toda
la referencia hay cinco sombras, todas en botones y modales. Esta es la regla
que más cambia respecto del portfolio actual, que tiene sombras en cada tarjeta.

### 4.4 Fondo y glass

Dos capas fijas inyectadas en el layout:

1. `.page-bg` (`z-index: -2`): la plancha "Aurora" en WebP, `cover`, `center
   top`, con `hero-bg-mobile.webp` (900px) hasta 640px y `hero-bg.webp`
   (1672×941) arriba. Su `::after` superpone
   `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.15), transparent)`
   más un `linear-gradient` que disuelve a `var(--color-bg)` al 90%.
2. `.hero-grid` (`z-index: -1`): retícula de 48×48px con líneas de
   `rgba(59,130,246,0.05)`, enmascarada con
   `mask-image: linear-gradient(to bottom, black, transparent 1400px)`.

**Glass de tres capas**, el patrón firma. Se usa en cards de proyecto, footer y
tarjetas de contacto:

```
.glass-card      → overflow hidden, radio 16px, borde token
.glass-card-bg   → inset -24px, la misma imagen, background-attachment: fixed,
                   blur(10px), opacity 0.4
.glass-card-glow → radial azul 20% arriba + linear a --color-bg al 85%
```

El `background-attachment: fixed` es lo que lo vende: todas las superficies
glass comparten el mismo plano de fondo, así que al scrollear la imagen queda
quieta detrás y las tarjetas se leen como ventanas recortadas sobre una misma
foto.

**Origen de la plancha**: generada proceduralmente para este proyecto — ruido
fBm de cuatro octavas sobre halos radiales en la paleta exacta. Sin
dependencias de terceros, sin atribución, sin riesgo de licencia. El generador
queda versionado en `scripts/` para poder regenerarla o ajustarla.

### 4.5 Wordmark

`SG.dev` se recrea como texto con `background-clip: text` sobre
`linear-gradient(100deg, #93c5fd, #3b82f6 55%, #a78bfa 100%)`, siguiendo el
patrón del original.

No se usa `public/SG.jpg`: es un logo de 1024×1024 sobre fondo crema, y su
fondo claro no se puede recortar de forma limpia. Como texto queda nítido a
cualquier tamaño, pesa cero y hereda los tokens.

### 4.6 Motion

- Reveal on scroll: `opacity 0 → 1`, `translateY(28px) → 0`, **2200ms**, con
  IntersectionObserver (`threshold: 0.01`, `rootMargin: 0px 0px -80px 0px`).
  El ritmo lento es una decisión de identidad, no un descuido.
- Stagger en cascada por índice: 50–120ms según la sección.
- Lift universal: `translateY(-1px)` en botones, `translateY(-2px)` en cards.
- Transiciones de 150ms en hover, 200ms en la nav.

`prefers-reduced-motion: reduce` desactiva reveals, stagger y lift. Hoy el
portfolio no tiene ni una sola regla de reduced-motion.

## 5. Páginas y componentes

### 5.1 Layout

```
<body>
  <div class="page-bg" />
  <div class="hero-grid" />
  <Nav />          ← pill flotante, sticky top 1.5rem, 92% / 80% de ancho
  {children}
  <Footer />       ← glass de 3 capas
  <ScrollToTop />
</body>
```

La nav arranca **completamente transparente, con borde transparente**, y solo
al pasar `scrollY > 8` gana fondo `rgba(10,14,26,0.85)` + `blur(8px)` + borde.
En mobile los links muestran solo el icono.

### 5.2 `/` — home larga

1. **Hero**: badge con punto verde ("Disponible para trabajar"), nombre en
   `text-6xl → 8xl`, `FULL STACK` en gradiente, párrafo del perfil del CV, y dos
   botones (contacto + GitHub).
2. **Barra de stats** cabalgando el hero con `-mt-32`, cuatro celdas con valores
   fijos y verificables: **4+** años en desarrollo profesional (desde jul 2022),
   **6** proyectos en el portfolio, **6** lenguajes (C#, Java, TypeScript,
   JavaScript, SQL, PHP — los del CV), y **Synerbit** como puesto actual. Los
   años se calculan en runtime desde una fecha en `data/perfil.ts`, igual que ya
   se hace con la edad, para que no envejezcan.
3. **Stack**: grilla de tecnologías. Hay SVG en `public/tecnologias/` para 12
   (React, Angular, Java, JavaScript, MySQL, MongoDB, Node, .NET, Bootstrap,
   HTML5, CSS3, Android), pero el CV suma varias sin asset: C#, Spring Boot,
   Express, React Native, Expo, Electron, PostgreSQL, Redis, Firebase,
   TypeScript, Git, Azure DevOps.

   Resolución: **la grilla no mezcla dos tratamientos.** Todas las tecnologías se
   renderizan igual, como chip con borde token y etiqueta de texto, y el logo
   aparece dentro del chip solo cuando el SVG existe. Así sumar un logo después
   es aditivo y nunca deja huecos visuales. Se reutiliza `nodejs.svg` en lugar
   del `.png` que usa el código actual, y se descarta el duplicado.
4. **Proyectos destacados**: tres fichas, enlace a `/proyectos`.
5. **Banda CTA** hacia `/contacto`.

### 5.3 `/sobre-mi`

Perfil profesional, timeline de las cinco experiencias, habilidades en los cinco
grupos del CV, educación, idiomas y competencias.

Dos elementos se **eliminan**, con motivo:

- **Las barras de progreso con porcentaje.** Los valores son inventados y
  además subvenden: marcan Java en 65% y Angular en 60% cuando son el stack
  profesional diario del autor. Un lector técnico las descuenta. Se reemplazan
  por los tags agrupados por categoría, tal como los presenta el CV.
- **El placeholder de foto de perfil.** No hay retrato disponible; un recuadro
  vacío con un icono de usuario es peor que no tener nada. Si aparece una foto,
  el componente la acepta sin rediseño.

### 5.4 `/proyectos`

Seis fichas. El componente de card no depende de imágenes: icono en cuadro de
`3rem`, título, qué resuelve, tags de stack, métricas verificadas, y un año
gigante de fondo al 8% que sube al 22% en hover. Las fichas que tengan captura
la muestran arriba; las que no, se ven parejas igual.

Las métricas son el protagonista porque son reales y son fuertes. Todas fueron
verificadas contra el repo, no estimadas.

### 5.5 `/contacto`

El formulario actual repintado, conservando su validación. Tarjetas de contacto
en glass. Se corrige el filtro que hoy busca `'Twitter'` en `socialMedia`, red
que no existe en la config.

## 6. Modelo de contenido

El contenido sale de los componentes y pasa a `data/` tipado: `perfil.ts`,
`experiencia.ts`, `proyectos.ts`, `habilidades.ts`, `educacion.ts`,
`contacto.ts`, `tecnologias.ts`.

Hoy está hardcodeado dentro de los `.js` — actualizar el CV significa editar
JSX. Separarlo es lo que hace que el próximo cambio de contenido sea trivial.

```ts
type Proyecto = {
  slug: string
  titulo: string
  resumen: string            // 1-2 frases, va en la card
  descripcion: string[]      // párrafos, van en el modal
  stack: string[]
  metricas: { lineas: number; commits: number; periodo: string }
  destacados: string[]       // bullets técnicos verificables
  links: { demo?: string; repo?: string }
  imagenes: string[]         // puede ir vacío
  anonimo: boolean
}
```

`contactConfig` pasa a `contacto.ts` conservando email, teléfono, ubicación,
redes, copyright y `calculateAge`, y perdiendo `colors` y `typography`.

## 7. Contenido de las fichas

Métricas verificadas contra cada repo el 2026-09-13.

### 7.1 Ecosistema Farmeando Aura RP

Servidor de roleplay para GTA V (FiveM) con su web y su launcher de escritorio,
unidos por autenticación de Steam. Los tres se presentan como **una sola ficha**:
contados por separado pierden la historia, que es un sistema de tres piezas con
identidad federada atravesándolas.

- Stack: Lua 5.4, Next.js 16, React 19, TypeScript, Electron 44, MySQL/MariaDB,
  Tailwind v4, Steam OpenID, Discord OAuth2, Mercado Pago, PayPal
- Métricas: ~22.000 líneas propias en 22 recursos Lua · 16.042 en la web ·
  20.286 en el launcher · 955 commits combinados
- Destacados:
  - La web nunca escribe sobre las tablas del juego: encola pedidos que un
    resource Lua consume y ejecuta. El usuario MySQL tiene solo `SELECT` sobre
    las tablas del juego.
  - Anti-fraude de pagos por doble criterio: referencia externa firmada con
    HMAC, revalidación contra la API del proveedor, e id de pago `UNIQUE`
    contra doble acreditación por reintento de webhook.
  - CSP con nonce por request y `strict-dynamic`; sanitización server-side del
    HTML de administración con allowlist explícita.
  - Launcher portable que difiere su auto-actualización al próximo arranque,
    porque el ejecutable sigue vivo mientras descarga.
  - Resolución de SteamID64 aprovechando los enteros de 64 bits de Lua 5.4,
    evitando la pérdida de precisión de los números de JavaScript.
- Demo: https://farmeandoaura.net (verificado HTTP 200)
- Repo: privado

### 7.2 Plataforma de gestión de propiedades

Gestión de propiedades en alquiler y membresías: publicación con circuito de
aprobación, búsqueda en mapa, módulo de servicios con asignación a operarios, y
panel administrativo.

- Stack: React 18, Vite 7, Node/Express 4, MySQL 8, Passport + Google OAuth 2.0,
  JWT, Leaflet, Recharts, ExcelJS, Nodemailer, node-cron
- Métricas: 36.920 líneas · 179 archivos · 139 commits · feb–may 2026
- Destacados:
  - Backend en tres capas estrictas: 15 controllers → 13 services → 14
    repositories, con SQL confinado a los repositories.
  - RBAC de cuatro roles, aplicado en backend y en el enrutado del frontend.
  - Job cron diario que pausa las propiedades de membresías vencidas y notifica
    al usuario.
  - Compresión de imágenes en el navegador antes de subirlas.
  - Cinco plantillas de email transaccional propias.
- Demo: https://clubdepropietarios.com.ar — **no verificada en vivo**; hay que
  comprobar que responda antes de publicar el enlace.
- Repo: privado

Nota sobre la anonimización: el título de la ficha es genérico, pero el enlace
revela inevitablemente la marca. Se acepta porque el sitio ya es público bajo
ese nombre y enlazar algo público que construiste no divulga nada. Lo que se
omite es la infraestructura: IP del VPS, layout del servidor y rutas de
administración. Si el enlace no responde, la ficha va sin demo y entonces sí
queda completamente anónima.

### 7.3 Sistema de gestión de cobros

Punto de venta y control de caja: cobros con productos asociados, descuento
automático de stock, y apertura/cierre de caja con arqueo por método de pago.
Pensado para correr on-premise en la red local del comercio.

- Stack: React 18, Vite 5, Express 4, MySQL/MariaDB (`mysql2`, SQL parametrizado
  sin ORM), JWT, bcrypt, multer, `xlsx-js-style`, PM2
- Métricas: 20.730 líneas · 50 archivos · 104 commits · dic 2025–ene 2026
- Destacados:
  - Arqueo de caja con totales desagregados por método de pago y cálculo de
    diferencia.
  - Anulación que restaura stock; devoluciones modeladas como cantidades
    negativas.
  - Vouchers virtuales de saldo a favor que se recalculan solos al cambiar los
    productos del cobro.
  - Exportación a Excel con estilos y formato de moneda `es-AR`.
  - Atajos de teclado para carga rápida en mostrador.
- Sin demo pública (on-premise)

### 7.4 Visor de infracciones de tránsito *(anonimizado)*

Aplicación de escritorio para revisar y despachar infracciones de
estacionamiento captadas por dispositivos viales. El operador navega las
capturas por fecha, las aprueba o rechaza, y al cerrar la fecha se despachan
las aprobadas.

- Stack: Electron 33, JavaScript (ES modules nativos en el renderer, sin
  bundler), FTP
- Métricas: 2.420 líneas · 24 archivos · 14 commits · abr–may 2026
- Destacados:
  - Estado de revisión persistido como archivo plano por carpeta: sin base de
    datos, sobrevive reinicios y es inspeccionable desde el explorador.
  - Despacho selectivo: solo salen de la máquina los archivos cifrados; la
    imagen en claro nunca se transfiere.
  - Errores de FTP crudos traducidos a mensajes accionables en español.
  - Zoom y paneo de imagen, navegación completa por teclado.
- No se nombra al cliente ni al proveedor, ni se describe el esquema de datos.

### 7.5 Validador de bases de contactos *(anonimizado)*

Herramienta de escritorio que verifica en lote qué teléfonos de una base tienen
cuenta activa en una plataforma de mensajería, y devuelve el resultado como
Excel enviado por email.

- Stack: Electron 33, TypeScript 5.9, SheetJS, Nodemailer
- Métricas: ~1.033 líneas de código · 17 archivos · ene 2026
- Destacados:
  - Verificación real contra la plataforma, no heurística de formato.
  - Sesión persistente: se vincula una sola vez y sobrevive reinicios.
  - Delay aleatorio entre consultas para reducir el riesgo de rate limiting.
  - Cancelación en caliente que emite un Excel parcial marcando lo no
    procesado, con timeout de guardado.
  - Ventana endurecida: aislamiento de contexto, sin integración de Node.
- Se declara como proyecto acotado. No se presenta como trabajo de dos años: el
  historial tiene cuatro commits y la versión actual es de enero de 2026.

### 7.6 GymApp

SaaS multi-tenant para gimnasios. **Se declara explícitamente como cimiento de
arquitectura, no como producto terminado**: el modelo de datos, la autenticación
y el aislamiento por tenant están hechos y testeados; la interfaz está
pendiente.

- Stack: Next.js 16, React 19, TypeScript, Prisma 6, PostgreSQL 16, NextAuth 5,
  Vitest
- Métricas: 652 líneas · 23 archivos · 20 commits
- Destacados:
  - Multi-tenancy de esquema compartido donde el identificador de tenant nunca
    viene del cliente: se deriva siempre de la sesión.
  - Tipo *branded* que hace que el compilador impida pasar un identificador
    fuera de scope a una consulta.
  - Login federado restringido a usuarios dados de alta previamente, evitando
    autoasignación de cuentas.
  - Mitigación de timing side-channel en el login por credenciales.

## 8. Accesibilidad

- `lang="es"` en el documento. Hoy declara `"en"` mientras el manifest dice
  `"es"`.
- `prefers-reduced-motion: reduce` cubierto en reveals, stagger y lift.
- `:focus-visible` con contorno visible en todo control interactivo. El original
  comunica el foco solo con cambio de color de borde, que es insuficiente.
- Skip link al contenido principal.
- Contraste AA verificado sobre los tokens: `--color-text-muted` (#8b96ad) sobre
  `--color-bg` (#0a0e1a) da 6.5:1 — pasa AA para texto normal (4.5:1) con
  margen, pero no llega a AAA (7:1). El acento sobre fondo oscuro se usa solo en
  texto de 14px+ o en elementos no textuales.
- Las fuentes pasan a `<link rel="preconnect">` en el head en vez de `@import`
  dentro de un CSS module, que bloquea hasta que el CSS parsea.

## 9. Verificación

Antes de declarar el trabajo terminado:

1. `pnpm build` completa sin errores ni warnings de TypeScript.
2. Las cuatro rutas se navegan en el `out/` servido estáticamente, incluida la
   navegación directa por URL a cada una (no solo desde la home).
3. Envío real del formulario de contacto, con recepción confirmada.
4. Revisión a 400px de ancho: sin scroll horizontal en ninguna página.
5. Tests de Vitest en verde sobre lo que tiene lógica real: validación del
   formulario y cálculo de edad. No se escriben tests de layout.

No se declara nada como hecho sin haber corrido estos pasos y visto su salida.

## 10. Fuera de alcance

Registrado acá para que no se pierda, pero **no** es parte de este trabajo.

### 10.1 Hallazgos de seguridad en los repos analizados

Aparecieron al inventariar los proyectos. Varios requieren **rotar** secretos,
no solo dejar de publicarlos:

| Repo | Hallazgo |
|---|---|
| SistemaGestion | `.env` versionado desde el primer commit con un JWT secret real. El mismo secret hardcodeado como fallback en el middleware. Comparación de contraseña en texto plano cuando el hash no empieza con `$2b$`. |
| validador-whatsapp | `.env.example` versionado con un identificador de cuenta real y dos casillas corporativas. La configuración de build copia el `.env` real dentro del ejecutable distribuido: la contraseña SMTP viaja en el binario que recibe el cliente. |
| Club de Propietarios | Credenciales sueltas en el directorio padre (secreto de cliente OAuth, códigos de recuperación de hosting, notas con accesos). `docs/DEPLOYMENT.md` versionado con la IP real del VPS. |
| server (FiveM) | `docs/DEPLOY-VPS.md` versionado con la IP real del VPS. |

### 10.2 Otros

- Optimizar `bakastamu.png` (812 KB sin comprimir).
- Assets huérfanos: `juego-botones.png`, `nodejs.svg` duplicado.
- `sitemap.xml` desactualizado, con anclas de una versión anterior del sitio.
- Conseguir una foto de perfil y capturas de las aplicaciones.

## 11. Riesgos

- **`background-attachment: fixed` en iOS Safari** tiene un bug conocido de
  repintado. Mitigación: `scroll` por debajo de 640px, donde el efecto de
  paralaje no se aprecia igual.
- **Seis fichas sin captura.** El diseño de card lo absorbe sin verse pobre,
  pero un portfolio con imágenes reales sería más fuerte. El componente ya
  acepta imágenes, así que sumarlas después no requiere rediseño.
- **Sin retrato en Sobre Mí.** Misma situación: el layout no deja un hueco.
- **Ningún repo es público**, así que ninguna ficha puede enlazar a código. La
  única demo enlazable verificada es la del ecosistema de roleplay.
