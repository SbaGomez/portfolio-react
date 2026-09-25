import type { Metadata } from "next";
import Link from "next/link";
import { FileText, History, Building2, FileDown, Cloud, ShieldCheck } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { contacto } from "@/data/contacto";

// Pagina principal de la app para la pantalla de consentimiento de Google.
// Google la revisa a mano: tiene que nombrar la app exactamente como en la
// consola ("Presupuestador"), explicar que hace, por que pide acceso a Drive y
// enlazar la politica de privacidad.
export const metadata: Metadata = {
  title: "Presupuestador",
  description:
    "Aplicación de escritorio para Windows que arma presupuestos, los exporta a PDF y los respalda en tu Google Drive.",
  alternates: { canonical: "/presupuestador/" },
  openGraph: {
    title: "Presupuestador — Sebastian Gomez",
    description:
      "Aplicación de escritorio para Windows que arma presupuestos, los exporta a PDF y los respalda en tu Google Drive.",
  },
};

const REPO = "https://github.com/SbaGomez/PresupuestadorApp";

const FUNCIONES = [
  {
    icono: FileText,
    titulo: "Presupuestos completos",
    texto: "Ítems ilimitados con descuento por ítem y descuento general, totales en vivo y numeración automática.",
  },
  {
    icono: History,
    titulo: "Historial",
    texto: "Buscá, duplicá o eliminá presupuestos anteriores sin empezar de cero.",
  },
  {
    icono: Building2,
    titulo: "Los datos de tu negocio",
    texto: "Logo, CUIT, dirección, contacto, color, vigencia y notas por defecto, cargados una sola vez.",
  },
  {
    icono: FileDown,
    titulo: "Exportación a PDF",
    texto: "Un PDF prolijo con tu marca, listo para mandarle al cliente.",
  },
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
            armá presupuestos en minutos, exportalos a PDF con tu logo y, si querés, respaldalos y
            sincronizalos entre tus computadoras con tu propia cuenta de Google Drive.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="sg-button">
              <GithubIcon size={18} />
              Ver en GitHub
            </a>
            <Link href="/presupuestador/privacidad/" className="sg-button-outline">
              Política de privacidad
            </Link>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {FUNCIONES.map(({ icono: Icono, titulo, texto }) => (
            <GlassCard key={titulo} className="p-6">
              <Icono size={22} className="mb-3 text-[var(--color-accent-light)]" aria-hidden="true" />
              <h2 className="mb-1 font-semibold">{titulo}</h2>
              <p className="text-sm text-[var(--color-text-muted)]">{texto}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--color-text)]">
              <Cloud size={22} className="text-[var(--color-accent-light)]" aria-hidden="true" />
              Por qué Presupuestador pide acceso a Google Drive
            </h2>
            <p>
              La sincronización es <strong className="text-[var(--color-text)]">opcional</strong>: la
              aplicación funciona completa sin cuenta de Google y guarda todo en tu computadora. Si
              vinculás tu cuenta, Presupuestador guarda una copia de respaldo de tus presupuestos en
              tu Drive para que no los pierdas y puedas usarlos desde otra PC.
            </p>
            <p>
              Para eso usa únicamente el permiso <code>drive.appdata</code>, que da acceso a una
              carpeta privada y oculta de tu Drive reservada para la aplicación. Presupuestador{" "}
              <strong className="text-[var(--color-text)]">no puede ver ni modificar ningún otro
              archivo de tu Drive</strong>. También lee el email de tu cuenta, solo para mostrarte
              cuál está vinculada.
            </p>
            <p className="flex items-start gap-2">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#4ade80]" aria-hidden="true" />
              <span>
                No hay servidores intermedios, publicidad ni analítica: tus datos viajan solo entre tu
                computadora y Google. Podés desvincular la cuenta cuando quieras desde la aplicación.
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
