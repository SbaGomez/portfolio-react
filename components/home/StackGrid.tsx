import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { tecnologias } from "@/data/tecnologias";

export default function StackGrid() {
  return (
    <section className="sg-section">
      <SectionHeading titulo="Stack" subtitulo="Tecnologías con las que trabajo a diario." />
      <div className="flex flex-wrap justify-center gap-3">
        {tecnologias.map((t, i) => (
          <Reveal key={t.nombre} delay={i * 50}>
            <span className="sg-tech-chip">
              {t.logo && (
                <img src={t.logo} alt="" aria-hidden="true" width={20} height={20} />
              )}
              {t.nombre}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
