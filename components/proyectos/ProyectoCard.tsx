import { ExternalLink } from "lucide-react";
import TechTag from "@/components/ui/TechTag";
import type { Proyecto } from "@/data/tipos";

export default function ProyectoCard({
  proyecto,
  onAbrir,
}: {
  proyecto: Proyecto;
  onAbrir?: () => void;
}) {
  return (
    // h-full: la tarjeta es hija de un Reveal que la grilla estira a la
    // altura de la fila, pero sin esto el article solo mide su contenido y
    // el mt-auto del <dl> no tiene contra que empujar.
    <article className="sg-step-card h-full">
      <span className="sg-step-number-bg" aria-hidden="true">{proyecto.anio}</span>
      <h3 className="pr-16 text-lg font-bold">{proyecto.titulo}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{proyecto.resumen}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
        {proyecto.stack.map((t) => (
          <TechTag key={t} nombre={t} />
        ))}
      </ul>
      {/* Grilla de 3 y no flex-wrap: asi las columnas caen en la misma
          posicion en todas las tarjetas, que con gap variable no pasaba. */}
      <dl className="mt-auto grid grid-cols-3 border-t border-[var(--color-border)] pt-3">
        {[
          { label: "Líneas", valor: proyecto.metricas.lineas.toLocaleString("es-AR") },
          { label: "Commits", valor: String(proyecto.metricas.commits) },
          // El periodo es un rango de fechas: a la escala de los numeros no
          // entra en un tercio del ancho de la tarjeta.
          { label: "Período", valor: proyecto.metricas.periodo, chico: true },
        ].map(({ label, valor, chico }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-0.5 ${
              i > 0 ? "border-l border-[var(--color-border)] pl-3" : ""
            } ${i < 2 ? "pr-3" : ""}`}
          >
            {/* order invertido: el numero es el dato y va arriba, pero en el
                DOM el <dt> tiene que preceder a su <dd>. */}
            <dt className="order-2 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {label}
            </dt>
            <dd className={`order-1 font-bold tabular-nums ${chico ? "text-xs" : "text-sm"}`}>
              {valor}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex gap-2">
        {onAbrir && (
          <button type="button" onClick={onAbrir} className="sg-button-outline sg-button-outline-sm">
            Ver detalle
          </button>
        )}
        {proyecto.links.demo && (
          <a
            href={proyecto.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="sg-button-outline sg-button-outline-sm"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Ver online
          </a>
        )}
      </div>
    </article>
  );
}
