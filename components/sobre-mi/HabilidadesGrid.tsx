import Reveal from "@/components/ui/Reveal";
import TechTag from "@/components/ui/TechTag";
import { habilidades } from "@/data/habilidades";

export default function HabilidadesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {habilidades.map((grupo, i) => (
        <Reveal key={grupo.categoria} delay={i * 80}>
          <div className="sg-card h-full">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
              {grupo.categoria}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {grupo.items.map((item) => (
                <TechTag key={item} nombre={item} />
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
