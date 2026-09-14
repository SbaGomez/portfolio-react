import { CalendarDays, FolderGit2, Code2, Building2 } from "lucide-react";
import { perfil } from "@/data/perfil";
import { proyectos } from "@/data/proyectos";
import { habilidades } from "@/data/habilidades";
import { experiencias } from "@/data/experiencia";
import { aniosDesde } from "@/lib/fechas";

export default function StatsBar() {
  const lenguajes = habilidades.find((g) => g.categoria === "Lenguajes")!.items.length;
  const celdas = [
    { Icon: CalendarDays, valor: `${aniosDesde(perfil.inicioProfesional)}+`, label: "Años" },
    { Icon: FolderGit2, valor: String(proyectos.length), label: "Proyectos" },
    { Icon: Code2, valor: String(lenguajes), label: "Lenguajes" },
    { Icon: Building2, valor: experiencias[0].empresa, label: "Actualmente" },
  ];

  return (
    <div className="sg-section relative z-10 -mt-24 sm:-mt-32">
      <div className="sg-stats-container grid grid-cols-2 sm:grid-cols-4">
        {celdas.map(({ Icon, valor, label }) => (
          <div key={label} className="flex items-center gap-3 p-5">
            <span className="sg-step-icon !h-9 !w-9 !rounded-lg">
              <Icon size={16} aria-hidden="true" />
            </span>
            <span>
              <b className="block text-base font-bold tabular-nums">{valor}</b>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                {label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
