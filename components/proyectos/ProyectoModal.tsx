"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import VideoResponsivo from "@/components/ui/VideoResponsivo";
import type { Proyecto } from "@/data/tipos";
import { siguienteCaptura } from "@/lib/slider";

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

  // Si hay video, ocupa la posicion 0 y las capturas van corridas un lugar.
  // La vista ampliada es solo de capturas: ahi se recorren sin el video.
  const video = proyecto.video;
  const offset = video ? 1 : 0;
  const cantidadCapturas = proyecto.imagenes.length;
  const total = cantidadCapturas + offset;
  const esVideo = video !== undefined && indice === 0;
  const captura = proyecto.imagenes[indice - offset];
  const numeroCaptura = indice - offset + 1;

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

      // Con el foco en el video, las flechas son del reproductor (adelantar y atrasar).
      if (
        (e.key === "ArrowLeft" || e.key === "ArrowRight") &&
        !(e.target instanceof HTMLVideoElement)
      ) {
        const paso = e.key === "ArrowLeft" ? -1 : 1;
        if (ampliada && cantidadCapturas > 1) {
          e.preventDefault();
          setIndice((i) => siguienteCaptura(i, paso, offset, cantidadCapturas));
        } else if (!ampliada && total > 1) {
          e.preventDefault();
          setIndice((i) => (i + paso + total) % total);
        }
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
  }, [onCerrar, ampliada, total, offset, cantidadCapturas]);

  function mover(paso: number) {
    setIndice((i) => (i + paso + total) % total);
  }

  function moverCaptura(paso: number) {
    setIndice((i) => siguienteCaptura(i, paso, offset, cantidadCapturas));
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

        {/* Sin loading="lazy" a proposito. Aca no hay nada que diferir: este
            <img> es uno solo, no siete, y recien existe despues de que el
            usuario abrio el modal, o sea que ya se carga a demanda. Diferirlo
            posterga algo que acaban de pedir, y encima queda insertado dentro
            de dos contenedores con scroll propio (.sg-slider con
            overflow:hidden y .sg-modal con overflow-y:auto), que es donde la
            carga diferida falla en varios navegadores moviles: el observer no
            llega a disparar y la imagen no aparece nunca. */}
        {total > 0 && (
          <div className="sg-slider">
            {esVideo ? (
              <VideoResponsivo video={video} titulo={proyecto.titulo} />
            ) : (
              <img
                src={captura}
                alt={`Captura ${numeroCaptura} de ${cantidadCapturas} de ${proyecto.titulo}`}
                onClick={() => setAmpliada(true)}
              />
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
      {ampliada && captura && (
        <div
          className="sg-lightbox"
          onClick={(e) => {
            e.stopPropagation();
            setAmpliada(false);
          }}
        >
          <img
            src={captura}
            alt={`Captura ${numeroCaptura} de ${cantidadCapturas} de ${proyecto.titulo}, ampliada`}
          />

          {/* Cada control detiene el click: sin eso, pasar de imagen cerraría
              la vista ampliada en el mismo gesto. Las flechas del teclado ya
              funcionaban acá, pero con el mouse no había forma. */}
          {cantidadCapturas > 1 && (
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
                {numeroCaptura} / {cantidadCapturas}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
