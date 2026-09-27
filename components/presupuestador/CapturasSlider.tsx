"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VideoResponsivo from "@/components/ui/VideoResponsivo";
import type { VideoProyecto } from "@/data/tipos";
import { siguienteCaptura } from "@/lib/slider";

export type Captura = { src: string; texto: string };

/** Video que va como primera slide, con el texto que se muestra debajo. */
export type VideoSlide = VideoProyecto & { texto: string };

/**
 * Slider de capturas de la pagina del Presupuestador. Reusa los estilos del
 * slider y la vista ampliada de ProyectoModal para que se vean igual.
 */
export default function CapturasSlider({ capturas, video }: { capturas: Captura[]; video?: VideoSlide }) {
  const [indice, setIndice] = useState(0);
  const [ampliada, setAmpliada] = useState(false);

  // El video ocupa la posicion 0; las capturas van corridas un lugar.
  const offset = video ? 1 : 0;
  const total = capturas.length + offset;
  const esVideo = video !== undefined && indice === 0;
  const actual = esVideo ? null : capturas[indice - offset];
  const texto = esVideo ? video.texto : actual?.texto;

  function mover(paso: number) {
    setIndice((i) => (i + paso + total) % total);
  }

  // Precarga el resto de las capturas para que pasar de una a otra no deje
  // un hueco mientras baja la siguiente.
  useEffect(() => {
    capturas.slice(video ? 0 : 1).forEach((c) => {
      new Image().src = c.src;
    });
  }, [capturas, video]);

  // A diferencia del modal, el teclado global solo se escucha con la vista
  // ampliada abierta: en la pagina, las flechas tienen que seguir haciendo
  // scroll. Con la vista cerrada, las flechas van por onKeyDown del slider.
  // La vista ampliada es solo de capturas, asi que ahi se recorren sin el video.
  const cantidadCapturas = capturas.length;
  useEffect(() => {
    if (!ampliada) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAmpliada(false);
      else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const paso = e.key === "ArrowLeft" ? -1 : 1;
        setIndice((i) => siguienteCaptura(i, paso, offset, cantidadCapturas));
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previo;
      document.removeEventListener("keydown", onKey);
    };
  }, [ampliada, offset, cantidadCapturas]);

  function moverCaptura(paso: number) {
    setIndice((i) => siguienteCaptura(i, paso, offset, cantidadCapturas));
  }

  if (total === 0) return null;

  const numeroCaptura = indice - offset + 1;

  return (
    <figure className="mx-auto flex w-full max-w-4xl flex-col gap-3">
      <div
        className="sg-slider"
        role="group"
        aria-roledescription="carrusel"
        aria-label="Video y capturas de Presupuestador"
        tabIndex={0}
        onKeyDown={(e) => {
          // Las flechas dentro del video son del reproductor (adelantar y atrasar).
          if (ampliada || total < 2 || e.target instanceof HTMLVideoElement) return;
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            mover(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {esVideo ? (
          <VideoResponsivo video={video} titulo="Presupuestador" />
        ) : (
          actual && (
            <img
              src={actual.src}
              alt={`Captura ${numeroCaptura} de ${capturas.length} de Presupuestador: ${actual.texto}`}
              width={1200}
              height={750}
              onClick={() => setAmpliada(true)}
            />
          )
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => mover(-1)}
              aria-label="Anterior"
              className="sg-slider-nav sg-slider-prev"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              aria-label="Siguiente"
              className="sg-slider-nav sg-slider-next"
            >
              <ChevronRight size={18} />
            </button>
            {/* En el video va arriba para no tapar los controles del reproductor. */}
            <span className={`sg-slider-contador${esVideo ? " sg-slider-contador-arriba" : ""}`}>
              {indice + 1} / {total}
            </span>
          </>
        )}
      </div>

      <figcaption className="text-center text-sm text-[var(--color-text-muted)]" aria-live="polite">
        {texto}
      </figcaption>

      {ampliada && actual && (
        <div className="sg-lightbox" onClick={() => setAmpliada(false)}>
          <img
            src={actual.src}
            alt={`Captura ${numeroCaptura} de ${capturas.length} de Presupuestador, ampliada`}
          />

          {/* Cada control detiene el click: sin eso, pasar de imagen cerraria
              la vista ampliada en el mismo gesto. */}
          {capturas.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  moverCaptura(-1);
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
                  moverCaptura(1);
                }}
                aria-label="Captura siguiente"
                className="sg-slider-nav sg-lightbox-next"
              >
                <ChevronRight size={22} />
              </button>
              <span className="sg-lightbox-contador">
                {numeroCaptura} / {capturas.length}
              </span>
            </>
          )}
        </div>
      )}
    </figure>
  );
}
