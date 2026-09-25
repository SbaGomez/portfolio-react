import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

export type SeccionLegal = {
  titulo: string;
  contenido: React.ReactNode;
};

const DOCUMENTOS = [
  { href: "/presupuestador/", label: "Presupuestador" },
  { href: "/presupuestador/privacidad/", label: "Política de privacidad" },
  { href: "/presupuestador/terminos/", label: "Condiciones del servicio" },
];

// Estilos del texto corrido de cada seccion. Van como variantes de Tailwind
// sobre el contenedor porque el contenido llega como JSX suelto desde cada
// pagina, y asi las paginas escriben <p>, <ul> y <a> planos sin clases.
const PROSA =
  "flex flex-col gap-4 text-[15px] leading-7 text-[var(--color-text-muted)] " +
  "[&_a]:text-[var(--color-accent-light)] [&_a]:underline [&_a]:underline-offset-2 " +
  "[&_strong]:text-[var(--color-text)] [&_strong]:font-semibold " +
  "[&_code]:rounded [&_code]:bg-[rgba(59,130,246,0.12)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:text-[var(--color-accent-light)] [&_code]:break-all " +
  "[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:relative [&_li]:pl-5 " +
  "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-[var(--color-accent)] [&_li]:before:content-['']";

/**
 * Estructura comun de la politica de privacidad y los terminos del
 * Presupuestador. Las dos paginas las exige Google para verificar la marca de
 * la pantalla de consentimiento OAuth, asi que tienen que ser publicas, vivir
 * en el dominio verificado y nombrar la app igual que en la consola.
 */
export default function DocumentoLegal({
  titulo,
  actual,
  actualizado,
  secciones,
}: {
  titulo: string;
  // Ruta de la pagina, para marcarla en la navegacion entre documentos.
  actual: string;
  actualizado: string;
  secciones: SeccionLegal[];
}) {
  return (
    <main id="contenido">
      <section className="sg-section">
        <SectionHeading
          principal
          titulo={titulo}
          subtitulo="Presupuestador — aplicación de escritorio para Windows"
          nota={`Última actualización: ${actualizado}`}
        />

        <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-8">
          {/* El indice solo existe en pantallas anchas: en mobile ocuparia
              media pantalla antes del primer parrafo, y ahi el documento se
              recorre igual de bien con el scroll. */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-4">
              <GlassCard className="p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)]">
                  Contenido
                </p>
                <ol className="flex flex-col gap-1 text-sm">
                  {secciones.map((seccion, i) => (
                    <li key={seccion.titulo}>
                      <a
                        href={`#seccion-${i + 1}`}
                        className="flex gap-2 rounded-md px-2 py-1.5 text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(59,130,246,0.1)] hover:text-[var(--color-text)]"
                      >
                        <span className="tabular-nums text-[var(--color-accent-light)]">{i + 1}.</span>
                        {seccion.titulo}
                      </a>
                    </li>
                  ))}
                </ol>
              </GlassCard>
              <NavDocumentos actual={actual} />
            </div>
          </aside>

          <div className="flex flex-col gap-4">
            {secciones.map((seccion, i) => (
              <GlassCard key={seccion.titulo} className="p-6 sm:p-8">
                <section id={`seccion-${i + 1}`} className="scroll-mt-32">
                  <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold text-[var(--color-text)]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[rgba(59,130,246,0.12)] text-sm tabular-nums text-[var(--color-accent-light)]">
                      {i + 1}
                    </span>
                    {seccion.titulo}
                  </h2>
                  <div className={PROSA}>{seccion.contenido}</div>
                </section>
              </GlassCard>
            ))}
            <div className="lg:hidden">
              <NavDocumentos actual={actual} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function NavDocumentos({ actual }: { actual: string }) {
  return (
    <nav aria-label="Documentos del Presupuestador" className="flex flex-col gap-1 text-sm">
      {DOCUMENTOS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={href === actual ? "page" : undefined}
          className="rounded-md px-2 py-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] aria-[current=page]:text-[var(--color-accent-light)]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
