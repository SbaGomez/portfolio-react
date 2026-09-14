"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Proyecto } from "@/data/tipos";

export default function ProyectoModal({
  proyecto,
  onCerrar,
}: {
  proyecto: Proyecto;
  onCerrar: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar();
    }
    document.addEventListener("keydown", onKey);
    // Se guarda el overflow previo en vez de asumir "": si el body ya tenia
    // un valor propio, restaurarlo a "" al cerrar lo pisaria.
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previo;
    };
  }, [onCerrar]);

  return (
    <div className="sg-modal-overlay" onClick={onCerrar}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        tabIndex={-1}
        className="sg-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onCerrar} aria-label="Cerrar" className="sg-modal-cerrar">
          <X size={18} />
        </button>
        <h2 id="modal-titulo" className="pr-10 text-2xl font-bold">{proyecto.titulo}</h2>
        {proyecto.descripcion.map((p) => (
          <p key={p} className="text-sm text-[var(--color-text-muted)]">{p}</p>
        ))}
        <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
          Destacados
        </h3>
        <ul className="flex flex-col gap-1.5 text-sm text-[var(--color-text-muted)]">
          {proyecto.destacados.map((d) => (
            <li key={d} className="sg-bullet">{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
