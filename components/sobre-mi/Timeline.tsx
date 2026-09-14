import Reveal from "@/components/ui/Reveal";
import TechTag from "@/components/ui/TechTag";

export type ItemTimeline = {
  titulo: string;
  subtitulo: string;
  periodo: string;
  detalles: string[];
  tags: string[];
};

export default function Timeline({ items }: { items: ItemTimeline[] }) {
  return (
    <ol className="sg-timeline">
      {items.map((item, i) => (
        <li key={`${item.titulo}-${item.periodo}`} className="sg-timeline-item">
          <Reveal delay={i * 80}>
            <div className="sg-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{item.titulo}</h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {item.periodo}
                </span>
              </div>
              <p className="text-sm font-semibold text-[var(--color-accent-light)]">{item.subtitulo}</p>
              {item.detalles.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5 text-sm text-[var(--color-text-muted)]">
                  {item.detalles.map((d) => (
                    <li key={d} className="sg-bullet">{d}</li>
                  ))}
                </ul>
              )}
              {item.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <TechTag key={t} nombre={t} />
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
