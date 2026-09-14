"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Proyecto } from "@/data/tipos";

export default function ProyectoModal({
  proyecto,
  onCerrar,
}: {
  proyecto: Proyecto;
  onCerrar: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(0);
  const [ampliada, setAmpliada] = useState(false);

  const total = proyecto.imagenes.length;

  // Foco inicial y bloqueo del scroll del body: solo al montar. Si esto
  // viviera en el mismo efecto que el teclado, cada cambio de estado del
  // slider volvería a ejecutar el focus() y te robaría el foco.
  useEffect(() => {
    // Se guarda el overflow previo en vez de asumir "": si el body ya tenia
    // un valor propio, restaurarlo a "" al cerrar lo pisaria.
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.body.style.overflow = previo;
    };
  }, []);

  // Teclado. Se vuelve a registrar cuando cambia el estado que consulta,
  // porque si no leería valores viejos por closure.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // La imagen ampliada se cierra primero: si no, un Escape cerraría
        // todo de una y perderías el detalle que estabas mirando.
        if (ampliada) setAmpliada(false);
        else onCerrar();
        return;
      }

      if (total > 1 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        const paso = e.key === "ArrowLeft" ? -1 : 1;
        setIndice((i) => (i + paso + total) % total);
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
    return () => document.removeEventListener("keydown", onKey);
  }, [onCerrar, ampliada, total]);

  function mover(paso: number) {
    setIndice((i) => (i + paso + total) % total);
  }

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
        {total > 0 && (
          <div className="sg-slider">
            <img
              src={proyecto.imagenes[indice]}
              alt={`Captura ${indice + 1} de ${total} de ${proyecto.titulo}`}
              loading="lazy"
              onClick={() => setAmpliada(true)}
            />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => mover(-1)}
                  aria-label="Captura anterior"
                  className="sg-slider-nav sg-slider-prev"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => mover(1)}
                  aria-label="Captura siguiente"
                  className="sg-slider-nav sg-slider-next"
                >
                  <ChevronRight size={18} />
                </button>
                <span className="sg-slider-contador">
                  {indice + 1} / {total}
                </span>
              </>
            )}
          </div>
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

      {/* Fuera de .sg-modal para que ocupe la pantalla entera. El click se
          detiene acá: sin eso burbujearía al overlay y cerraría el modal
          completo en vez de solo la imagen. */}
      {ampliada && total > 0 && (
        <div
          className="sg-lightbox"
          onClick={(e) => {
            e.stopPropagation();
            setAmpliada(false);
          }}
        >
          <img
            src={proyecto.imagenes[indice]}
            alt={`Captura ${indice + 1} de ${total} de ${proyecto.titulo}, ampliada`}
          />

          {/* Cada control detiene el click: sin eso, pasar de imagen cerraría
              la vista ampliada en el mismo gesto. Las flechas del teclado ya
              funcionaban acá, pero con el mouse no había forma. */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(-1);
                }}
                aria-label="Captura anterior"
                className="sg-slider-nav sg-lightbox-prev"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(1);
                }}
                aria-label="Captura siguiente"
                className="sg-slider-nav sg-lightbox-next"
              >
                <ChevronRight size={22} />
              </button>
              <span className="sg-lightbox-contador">
                {indice + 1} / {total}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
