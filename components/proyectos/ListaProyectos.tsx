"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import ProyectoCard from "@/components/proyectos/ProyectoCard";
import ProyectoModal from "@/components/proyectos/ProyectoModal";
import type { Proyecto } from "@/data/tipos";

/**
 * Grilla de tarjetas con el modal de detalle.
 *
 * Recibe la lista por props en vez de leer los datos: asi la usan tanto la
 * pagina de proyectos (todos) como la seccion del inicio (solo los
 * destacados), sin duplicar en dos lugares el estado del modal ni la conducta
 * de "Ver detalle". Es el unico componente de cliente de las dos secciones: el
 * encabezado y los enlaces que lo rodean siguen siendo de servidor.
 */
export default function ListaProyectos({
  proyectos,
  pasoDelay = 70,
}: {
  proyectos: Proyecto[];
  // Escalonado de la aparicion de cada tarjeta. El inicio muestra menos y las
  // separa un poco mas.
  pasoDelay?: number;
}) {
  const [abierto, setAbierto] = useState<Proyecto | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((p, i) => (
          <Reveal key={p.slug} delay={i * pasoDelay}>
            <ProyectoCard proyecto={p} onAbrir={() => setAbierto(p)} />
          </Reveal>
        ))}
      </div>
      {abierto && <ProyectoModal proyecto={abierto} onCerrar={() => setAbierto(null)} />}
    </>
  );
}
