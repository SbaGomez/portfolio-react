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
      if (e.key === "Escape") {
        onCerrar();
        return;
      }
      if (e.key !== "Tab") return;

      // Trap real: mover el foco al dialogo una sola vez no alcanza, porque
      // el Tab sigue caminando hacia la pagina de atras, que esta detras de
      // un overlay y no se puede ver.
      const cont = ref.current;
      if (!cont) return;
      const focusables = cont.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) {
        e.preventDefault();
        cont.focus();
        return;
      }

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      const activo = document.activeElement;

      if (e.shiftKey) {
        // El contenedor cuenta como "principio": tiene tabIndex -1 y es
        // donde arranca el foco al abrir.
        if (activo === primero || activo === cont) {
          e.preventDefault();
          ultimo.focus();
        }
      } else if (activo === ultimo) {
        e.preventDefault();
        primero.focus();
      }
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
        {/* Las capturas solo se piden al abrir el modal: en la grilla serian
            siete imagenes cargando de entrada sin que nadie las haya pedido. */}
        {proyecto.imagenes.length > 0 && (
          <ul className="flex flex-col gap-3">
            {proyecto.imagenes.map((src) => (
              <li key={src}>
                <img
                  src={src}
                  alt={`Captura de ${proyecto.titulo}`}
                  loading="lazy"
                  className="w-full rounded-[10px] border border-[var(--color-border)]"
                />
              </li>
            ))}
          </ul>
        )}
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
