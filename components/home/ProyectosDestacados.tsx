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
