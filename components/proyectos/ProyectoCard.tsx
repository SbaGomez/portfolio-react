import type { CSSProperties } from "react";
import { ExternalLink } from "lucide-react";
import TechTag from "@/components/ui/TechTag";
import type { Proyecto } from "@/data/tipos";

// El año gigante del fondo se pinta segun de cuando es el proyecto: es lo
// unico que deja distinguir de un vistazo lo reciente de lo viejo sin leer.
// Van como terna RGB y no como hex porque globals.css les aplica su propia
// opacidad en reposo y en hover.
// Las claves van entrecomilladas porque `anio` es string en el modelo de datos
// (data/tipos.ts), no number.
const COLOR_POR_ANIO: Record<string, string> = {
  "2026": "248, 113, 113",
  "2025": "167, 139, 250",
};

// Cualquier año sin color propio cae en el violeta, que es el mismo respaldo
// declarado en globals.css. Se repite aca a proposito: el dia que se agregue
// un proyecto de 2027, la tarjeta no queda sin color a la espera del CSS.
const COLOR_POR_DEFECTO = "167, 139, 250";

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
      <span
        className="sg-step-number-bg"
        aria-hidden="true"
        style={{ "--anio-rgb": COLOR_POR_ANIO[proyecto.anio] ?? COLOR_POR_DEFECTO } as CSSProperties}
      >
        {proyecto.anio}
      </span>
      {/* pr-16 reserva el ancho del año que va absoluto arriba a la derecha:
          sin eso, un titulo largo le pasa por encima. */}
      <h3 className="pr-16 text-xl font-bold">{proyecto.titulo}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{proyecto.resumen}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
        {proyecto.stack.map((t) => (
          <TechTag key={t} nombre={t} />
        ))}
      </ul>
      {/* Ya no son tres columnas iguales: las lineas dominan y commits y
          periodo quedan de contexto en una segunda fila. Se escribe a mano y
          no con un map porque las tres celdas ya no son intercambiables --
          cada una tiene su tamaño y su lugar en la grilla. */}
      <dl className="sg-metricas mt-auto">
        <div className="sg-metrica-lineas">
          <dt>líneas de código</dt>
          <dd>{proyecto.metricas.lineas.toLocaleString("es-AR")}</dd>
        </div>
        <div className="sg-metrica-commits">
          <dt>commits</dt>
          <dd>{proyecto.metricas.commits}</dd>
        </div>
        <div className="sg-metrica-periodo">
          {/* La etiqueta se oculta a la vista pero no al lector de pantalla:
              "dic 2025 - ene 2026" ya se lee como un rango de fechas, pero sin
              el <dt> la lista de definiciones quedaria con un valor huerfano. */}
          <dt className="sr-only">Período</dt>
          <dd>{proyecto.metricas.periodo}</dd>
        </div>
      </dl>
      {/* Un solo control partido y no dos botones sueltos. El divisor es el
          borde del segundo segmento, asi que una tarjeta sin demo queda con un
          boton solo ocupando la fila sin nada que ajustar aca. La condicion no
          es de adorno: el contenedor tiene borde propio, y sin ella una tarjeta
          sin ninguna de las dos acciones dibujaria una franja vacia. */}
      {(onAbrir || proyecto.links.demo) && (
        <div className="sg-card-actions">
          {onAbrir && (
            <button type="button" onClick={onAbrir} className="sg-card-action">
              Ver detalle
            </button>
          )}
          {proyecto.links.demo && (
            <a
              href={proyecto.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="sg-card-action"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Ver online
            </a>
          )}
        </div>
      )}
    </article>
  );
}
