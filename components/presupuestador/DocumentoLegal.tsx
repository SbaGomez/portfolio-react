import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

export type SeccionLegal = {
  titulo: string;
  contenido: React.ReactNode;
};

/**
 * Estructura comun de la politica de privacidad y los terminos del
 * Presupuestador. Las dos paginas las exige Google para verificar la marca de
 * la pantalla de consentimiento OAuth, asi que tienen que ser publicas, vivir
 * en el dominio verificado y nombrar la app igual que en la consola.
 */
export default function DocumentoLegal({
  titulo,
  actualizado,
  secciones,
}: {
  titulo: string;
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
        <GlassCard className="mx-auto max-w-3xl p-6 sm:p-10">
          <div className="flex flex-col gap-8 text-sm leading-relaxed text-[var(--color-text-muted)] [&_a]:text-[var(--color-accent-light)] [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-[var(--color-text)] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
            {secciones.map((seccion, i) => (
              <section key={seccion.titulo} className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-[var(--color-text)]">
                  {i + 1}. {seccion.titulo}
                </h2>
                {seccion.contenido}
              </section>
            ))}
          </div>
        </GlassCard>
        <nav
          aria-label="Documentos del Presupuestador"
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]"
        >
          <Link href="/presupuestador/" className="hover:text-[var(--color-text)]">
            Presupuestador
          </Link>
          <Link href="/presupuestador/privacidad/" className="hover:text-[var(--color-text)]">
            Política de privacidad
          </Link>
          <Link href="/presupuestador/terminos/" className="hover:text-[var(--color-text)]">
            Condiciones del servicio
          </Link>
        </nav>
      </section>
    </main>
  );
}
