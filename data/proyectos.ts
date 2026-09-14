import type { Proyecto } from "./tipos";

const fichas: Proyecto[] = [
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
    imagenes: [
      "/proyectos/ecosistema-roleplay.webp",
      "/proyectos/roleplay-descargar.webp",
      "/proyectos/roleplay-tienda.webp",
      "/proyectos/roleplay-galeria.webp",
      "/proyectos/roleplay-faq.webp",
    ],
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
    links: {},
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
    anio: "2025",
    resumen:
      "Aplicación de escritorio para revisar y despachar infracciones de estacionamiento captadas por dispositivos viales.",
    descripcion: [
      "El operador navega las capturas agrupadas por fecha, revisa la imagen junto a los metadatos del acta, y aprueba o rechaza con atajos de teclado. Al cerrar una fecha, solo las aprobadas se despachan.",
      "No usa base de datos: el estado de revisión vive como archivo plano dentro de cada carpeta, así que sobrevive reinicios y se puede inspeccionar desde el explorador de archivos.",
    ],
    stack: ["Electron", "JavaScript (ES Modules)", "FTP"],
    metricas: { lineas: 2420, commits: 14, periodo: "abr 2025 – may 2025" },
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
    anio: "2025",
    resumen:
      "Herramienta de escritorio que verifica en lote qué teléfonos de una base tienen cuenta activa, y devuelve el resultado como planilla.",
    descripcion: [
      "Toma una planilla de contactos, consulta cada número contra la plataforma de mensajería y devuelve un Excel con el resultado por fila, que además envía por email al terminar.",
      "Proyecto deliberadamente acotado: resuelve un flujo operativo puntual sin arrastrar infraestructura.",
    ],
    stack: ["Electron", "TypeScript", "SheetJS", "Nodemailer"],
    metricas: { lineas: 1033, commits: 4, periodo: "ene 2025" },
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
  {
    slug: "calculadora-3d",
    titulo: "Calculadora de costos de impresión 3D",
    anio: "2025",
    resumen:
      "Herramienta de costeo para impresión 3D: calcula el costo real de una tirada y emite cotizaciones en PDF para el cliente.",
    descripcion: [
      "Calcula el costo de una tirada a partir del material, la energía, el mantenimiento y el laqueado, y lo divide por las unidades que salen de esa impresión para obtener el costo y el precio unitarios.",
      "Sobre ese cálculo arma cotizaciones de varios ítems y las exporta a PDF. El documento muestra solo lo que el cliente necesita ver: nunca los costos internos ni los márgenes de ganancia.",
      "Nació en 2025 como una planilla de cálculo y recién se versionó en 2026, así que el historial de commits arranca bastante después que el proyecto.",
    ],
    stack: ["JavaScript", "Bootstrap", "HTML5 / CSS3", "jsPDF"],
    metricas: { lineas: 2444, commits: 10, periodo: "sep 2025 – sep 2026" },
    destacados: [
      "Separa los costos fijos de la tirada de los que dependen de las piezas, que es lo que hace que el costo unitario dé bien.",
      "Cotización de varios ítems, con precio mínimo, máximo o propio sobre el margen configurado.",
      "PDF generado en el navegador con jsPDF, con logo opcional reescalado antes de guardarlo para no exceder la cuota del navegador.",
      "Sin backend ni paso de build: HTML, CSS y JavaScript plano servidos como archivos estáticos.",
    ],
    links: { demo: "https://sebastiangomez.com.ar/Calculadora3D/" },
    imagenes: ["/proyectos/calculadora-3d.webp"],
    anonimo: false,
    destacado: false,
  },
];

/**
 * Ordenadas por año, de la más reciente a la más antigua. Se ordena acá y no
 * reacomodando el array a mano para que haya una sola fuente de verdad y las
 * fichas nuevas se ubiquen solas. El sort de JavaScript es estable, así que
 * dentro del mismo año se respeta el orden en que están escritas.
 */
export const proyectos: Proyecto[] = [...fichas].sort((a, b) =>
  b.anio.localeCompare(a.anio),
);
