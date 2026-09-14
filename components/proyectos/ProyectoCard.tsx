import { ExternalLink } from "lucide-react";
import type { Proyecto } from "@/data/tipos";

export default function ProyectoCard({
  proyecto,
  onAbrir,
}: {
  proyecto: Proyecto;
  onAbrir?: () => void;
}) {
  return (
    <article className="sg-step-card">
      <span className="sg-step-number-bg" aria-hidden="true">{proyecto.anio}</span>
      <h3 className="text-lg font-bold">{proyecto.titulo}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{proyecto.resumen}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
        {proyecto.stack.map((t) => (
          <li key={t} className="sg-tag">{t}</li>
        ))}
      </ul>
      <dl className="mt-auto flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-3 text-xs">
        <div>
          <dt className="uppercase tracking-wide text-[var(--color-text-muted)]">Líneas</dt>
          <dd className="font-bold tabular-nums">{proyecto.metricas.lineas.toLocaleString("es-AR")}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-[var(--color-text-muted)]">Commits</dt>
          <dd className="font-bold tabular-nums">{proyecto.metricas.commits}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-[var(--color-text-muted)]">Período</dt>
          <dd className="font-bold">{proyecto.metricas.periodo}</dd>
        </div>
      </dl>
      <div className="flex gap-2">
        {onAbrir && (
          <button type="button" onClick={onAbrir} className="sg-button-outline-sm">
            Ver detalle
          </button>
        )}
        {proyecto.links.demo && (
          <a
            href={proyecto.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="sg-button-outline-sm"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Ver online
          </a>
        )}
      </div>
    </article>
  );
}
