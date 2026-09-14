"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import ProyectoCard from "@/components/proyectos/ProyectoCard";
import ProyectoModal from "@/components/proyectos/ProyectoModal";
import { proyectos } from "@/data/proyectos";
import type { Proyecto } from "@/data/tipos";

export default function ListaProyectos() {
  const [abierto, setAbierto] = useState<Proyecto | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((p, i) => (
          <Reveal key={p.slug} delay={i * 70}>
            <ProyectoCard proyecto={p} onAbrir={() => setAbierto(p)} />
          </Reveal>
        ))}
      </div>
      {abierto && <ProyectoModal proyecto={abierto} onCerrar={() => setAbierto(null)} />}
    </>
  );
}
