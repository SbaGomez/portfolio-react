import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  History,
  Building2,
  FileDown,
  Cloud,
  ShieldCheck,
  Download,
  RefreshCw,
  KeyRound,
  Mail,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { contacto } from "@/data/contacto";

// Pagina principal de la app para la pantalla de consentimiento de Google.
// Google la revisa a mano: tiene que nombrar la app exactamente como en la
// consola ("Presupuestador"), explicar que hace, por que pide acceso a Drive y
// enlazar la politica de privacidad.
export const metadata: Metadata = {
  title: "Presupuestador",
  description:
    "Aplicación de escritorio para Windows que arma presupuestos, los exporta a PDF, los comparte por WhatsApp y los respalda en tu Google Drive. 15 días de prueba gratis.",
  alternates: { canonical: "/presupuestador/" },
  openGraph: {
    title: "Presupuestador — Sebastian Gomez",
    description:
      "Aplicación de escritorio para Windows que arma presupuestos, los exporta a PDF, los comparte por WhatsApp y los respalda en tu Google Drive. 15 días de prueba gratis.",
  },
};

// El instalador se llama igual en todas las versiones, asi que "latest"
// siempre baja el de la ultima release.
const DESCARGA =
  "https://github.com/SbaGomez/PresupuestadorApp-releases/releases/latest/download/SGPresupuestador-win-Setup.exe";

const MENSAJE_LICENCIA = encodeURIComponent("Hola! Quiero la licencia de Presupuestador.");
const WHATSAPP = `${contacto.redes.find((r) => r.nombre === "WhatsApp")?.url}?text=${MENSAJE_LICENCIA}`;
const MAIL = `mailto:${contacto.email}?subject=${encodeURIComponent("Licencia de Presupuestador")}`;

const FUNCIONES = [
  {
    icono: FileText,
    titulo: "Presupuestos completos",
    texto: "Ítems ilimitados con descuento por ítem y descuento general, totales en vivo y numeración automática.",
  },
  {
    icono: History,
    titulo: "Historial",
    texto: "Buscá por cliente, teléfono o número, y abrí, duplicá o eliminá presupuestos anteriores sin empezar de cero.",
  },
  {
    icono: Building2,
    titulo: "Los datos de tu negocio",
    texto: "Logo, CUIT, dirección, contacto, color, vigencia y notas por defecto, cargados una sola vez.",
  },
  {
    icono: FileDown,
    titulo: "PDF con tu marca",
    texto: "Vista previa con zoom antes de guardar: un PDF prolijo con tu logo y tus colores, listo para el cliente.",
  },
  {
    icono: WhatsappIcon,
    titulo: "Envío por WhatsApp",
    texto: "Mandale el PDF al cliente desde WhatsApp Desktop o WhatsApp Web, sin guardarlo ni buscarlo a mano.",
  },
  {
    icono: RefreshCw,
    titulo: "Sincronizado y al día",
    texto: "Respaldo en tu Google Drive y los mismos presupuestos en todas tus PCs. Las actualizaciones se instalan solas.",
  },
];

const CAPTURAS = [
  { src: "/proyectos/presupuestador-listado.webp", texto: "Historial con búsqueda, vista previa y envío por WhatsApp" },
  { src: "/proyectos/presupuestador-editor.webp", texto: "Editor con descuentos y totales en vivo" },
  { src: "/proyectos/presupuestador-pdf.webp", texto: "Vista previa del PDF con tu logo" },
  { src: "/proyectos/presupuestador-negocio.webp", texto: "Los datos de tu negocio, cargados una sola vez" },
];

export default function Presupuestador() {
  return (
    <main id="contenido">
      <section className="sg-section flex flex-col gap-12">
        <header className="flex flex-col items-center gap-5 text-center">
          <img
            src="/presupuestador/icono.png"
            alt="Logo de Presupuestador"
            width={96}
            height={96}
            className="rounded-2xl"
          />
          <h1 className="text-4xl font-bold">Presupuestador</h1>
          <p className="max-w-2xl text-[var(--color-text-muted)]">
            Aplicación de escritorio para Windows 10 y 11 pensada para comercios y profesionales:
            armá presupuestos en minutos, exportalos a PDF con tu logo, mandalos por WhatsApp y
            tenelos respaldados y sincronizados entre tus computadoras con tu propia cuenta de Google
            Drive.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={DESCARGA} className="sg-button">
              <Download size={18} aria-hidden="true" />
              Descargar para Windows
            </a>
            <Link href="/presupuestador/privacidad/" className="sg-button-outline">
              Política de privacidad
            </Link>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-text)]">15 días de prueba gratis.</strong> Windows 10
            u 11 de 64 bits, sin permisos de administrador.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUNCIONES.map(({ icono: Icono, titulo, texto }) => (
            <GlassCard key={titulo} className="p-6">
              <Icono size={22} className="mb-3 text-[var(--color-accent-light)]" aria-hidden="true" />
              <h2 className="mb-1 font-semibold">{titulo}</h2>
              <p className="text-sm text-[var(--color-text-muted)]">{texto}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {CAPTURAS.map(({ src, texto }) => (
            <figure key={src} className="flex flex-col gap-2">
              <a href={src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt={`Captura de Presupuestador: ${texto}`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-300 hover:scale-[1.02]"
                />
              </a>
              <figcaption className="text-center text-sm text-[var(--color-text-muted)]">{texto}</figcaption>
            </figure>
          ))}
        </div>

        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--color-text)]">
              <KeyRound size={22} className="text-[var(--color-accent-light)]" aria-hidden="true" />
              Prueba gratis y licencia
            </h2>
            <p>
              Al abrir la aplicación por primera vez vinculás tu cuenta de Google y arranca una{" "}
              <strong className="text-[var(--color-text)]">prueba gratuita de 15 días</strong> con
              todas las funciones. Pasado ese plazo, para seguir creando y editando presupuestos
              contactame para abonar la licencia: te la activo en el momento y la aplicación sigue
              funcionando sin reinstalar nada.
            </p>
            <p>
              La licencia va atada a tu cuenta de Google, así que la usás en todas tus computadoras
              con esa misma cuenta. Si vence, no perdés nada: podés seguir viendo, buscando,
              exportando y enviando tus presupuestos hasta que la renueves.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="sg-button">
                <WhatsappIcon size={18} />
                Pedir licencia por WhatsApp
              </a>
              <a href={MAIL} className="sg-button-outline">
                <Mail size={18} aria-hidden="true" />
                {contacto.email}
              </a>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--color-text)]">
              <Cloud size={22} className="text-[var(--color-accent-light)]" aria-hidden="true" />
              Por qué Presupuestador pide acceso a tu cuenta de Google
            </h2>
            <p>
              Tu cuenta de Google cumple dos funciones: identifica tu licencia y guarda una copia de
              respaldo de tus presupuestos en tu Drive, para que no los pierdas y los tengas en
              todas tus PCs. Tus presupuestos se guardan en tu computadora y la aplicación sigue
              funcionando sin conexión.
            </p>
            <p>
              Para el respaldo usa únicamente el permiso <code>drive.appdata</code>, que da acceso a
              una carpeta privada y oculta de tu Drive reservada para la aplicación. Presupuestador{" "}
              <strong className="text-[var(--color-text)]">no puede ver ni modificar ningún otro
              archivo de tu Drive</strong>. También lee el email de tu cuenta, para mostrarte cuál
              está vinculada y para consultar el estado de tu licencia.
            </p>
            <p className="flex items-start gap-2">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#4ade80]" aria-hidden="true" />
              <span>
                Sin publicidad ni analítica. Tus presupuestos viajan solo entre tu computadora y
                Google; al servidor de licencias llega únicamente tu email. Podés desvincular la
                cuenta cuando quieras desde la aplicación.
              </span>
            </p>
          </div>
        </GlassCard>

        <footer className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]">
          <Link href="/presupuestador/privacidad/" className="hover:text-[var(--color-text)]">
            Política de privacidad
          </Link>
          <Link href="/presupuestador/terminos/" className="hover:text-[var(--color-text)]">
            Condiciones del servicio
          </Link>
          <a href={`mailto:${contacto.email}`} className="hover:text-[var(--color-text)]">
            {contacto.email}
          </a>
        </footer>
      </section>
    </main>
  );
}
