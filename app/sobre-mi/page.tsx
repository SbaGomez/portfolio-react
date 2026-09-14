import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Timeline, { type ItemTimeline } from "@/components/sobre-mi/Timeline";
import HabilidadesGrid from "@/components/sobre-mi/HabilidadesGrid";
import { perfil } from "@/data/perfil";
import { experiencias } from "@/data/experiencia";
import { educacion } from "@/data/educacion";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Experiencia, habilidades técnicas y formación.",
  alternates: { canonical: "/sobre-mi/" },
  // Sin esto hereda el del layout y compartir la página muestra el título
  // genérico del sitio en vez del de la sección.
  openGraph: {
    title: "Sobre mí — Sebastian Gomez",
    description: "Experiencia, habilidades técnicas y formación.",
  },
};

const itemsExperiencia: ItemTimeline[] = experiencias.map((e) => ({
  titulo: e.puesto,
  subtitulo: e.empresa,
  periodo: e.periodo,
  detalles: e.tareas,
  tags: e.stack,
}));

// La educación no tiene tareas ni stack: entra al mismo componente con las
// listas vacías, que Timeline omite en vez de renderizar un <ul> huérfano.
const itemsEducacion: ItemTimeline[] = educacion.map((e) => ({
  titulo: e.titulo,
  subtitulo: e.institucion,
  periodo: e.periodo,
  detalles: [],
  tags: [],
}));

const idiomas = [
  { nombre: "Español", nivel: "Nativo" },
  { nombre: "Inglés", nivel: "Intermedio" },
];

const competencias =
  "Fuerte adaptabilidad, pensamiento lógico estructurado, proactividad y sólida orientación al trabajo colaborativo en células ágiles.";

export default function SobreMi() {
  return (
    <main id="contenido">
      <section className="sg-section">
        <SectionHeading principal titulo="Sobre mí" subtitulo="Perfil profesional." />
        <Reveal>
          <div className="flex flex-col items-center gap-6">
            {/* La imagen es cuadrada de origen, asi que el recorte circular
                no deforma nada. width/height explicitos para que el navegador
                reserve el lugar y el texto no salte al cargar. */}
            <img
              src="/perfil.webp"
              alt={`Foto de ${perfil.nombre}`}
              width={128}
              height={128}
              className="h-32 w-32 rounded-full border border-[var(--color-border)] object-cover"
            />
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-[var(--color-text-muted)]">
              {perfil.resumen}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="sg-section">
        <SectionHeading titulo="Experiencia" subtitulo="Dónde trabajé y en qué." />
        <Timeline items={itemsExperiencia} />
      </section>

      <section className="sg-section">
        <SectionHeading titulo="Habilidades" subtitulo="Tecnologías y herramientas." />
        <HabilidadesGrid />
      </section>

      <section className="sg-section">
        <SectionHeading titulo="Educación" subtitulo="Formación académica." />
        <Timeline items={itemsEducacion} />
      </section>

      <section className="sg-section">
        <SectionHeading titulo="Idiomas y competencias" />
        <div className="grid gap-4 sm:grid-cols-2">
          {idiomas.map((idioma, i) => (
            <Reveal key={idioma.nombre} delay={i * 80}>
              <div className="sg-card flex items-baseline justify-between gap-2">
                <h3 className="font-semibold">{idioma.nombre}</h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {idioma.nivel}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {competencias}
          </p>
        </Reveal>
      </section>
    </main>
  );
}
