"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Captura = { src: string; texto: string };

/**
 * Slider de capturas de la pagina del Presupuestador. Reusa los estilos del
 * slider y la vista ampliada de ProyectoModal para que se vean igual.
 */
export default function CapturasSlider({ capturas }: { capturas: Captura[] }) {
  const [indice, setIndice] = useState(0);
  const [ampliada, setAmpliada] = useState(false);

  const total = capturas.length;
  const actual = capturas[indice];

  function mover(paso: number) {
    setIndice((i) => (i + paso + total) % total);
  }

  // Precarga el resto de las capturas para que pasar de una a otra no deje
  // un hueco mientras baja la siguiente.
  useEffect(() => {
    capturas.slice(1).forEach((c) => {
      new Image().src = c.src;
    });
  }, [capturas]);

  // A diferencia del modal, el teclado global solo se escucha con la vista
  // ampliada abierta: en la pagina, las flechas tienen que seguir haciendo
  // scroll. Con la vista cerrada, las flechas van por onKeyDown del slider.
  useEffect(() => {
    if (!ampliada) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAmpliada(false);
      else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const paso = e.key === "ArrowLeft" ? -1 : 1;
        setIndice((i) => (i + paso + total) % total);
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previo;
      document.removeEventListener("keydown", onKey);
    };
  }, [ampliada, total]);

  if (total === 0) return null;

  return (
    <figure className="mx-auto flex w-full max-w-4xl flex-col gap-3">
      <div
        className="sg-slider"
        role="group"
        aria-roledescription="carrusel"
        aria-label="Capturas de Presupuestador"
        tabIndex={0}
        onKeyDown={(e) => {
          if (ampliada || total < 2) return;
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            mover(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <img
          src={actual.src}
          alt={`Captura ${indice + 1} de ${total} de Presupuestador: ${actual.texto}`}
          width={1200}
          height={750}
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

      <figcaption className="text-center text-sm text-[var(--color-text-muted)]" aria-live="polite">
        {actual.texto}
      </figcaption>

      {ampliada && (
        <div className="sg-lightbox" onClick={() => setAmpliada(false)}>
          <img src={actual.src} alt={`Captura ${indice + 1} de ${total} de Presupuestador, ampliada`} />

          {/* Cada control detiene el click: sin eso, pasar de imagen cerraria
              la vista ampliada en el mismo gesto. */}
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
    </figure>
  );
}
