import { CalendarDays, FolderGit2, Code2 } from "lucide-react";
import { perfil } from "@/data/perfil";
import { proyectos } from "@/data/proyectos";
import { habilidades } from "@/data/habilidades";
import { aniosDesde } from "@/lib/fechas";

export default function StatsBar() {
  const lenguajes = habilidades.find((g) => g.categoria === "Lenguajes")!.items.length;
  const celdas = [
    { Icon: CalendarDays, valor: `${aniosDesde(perfil.inicioProfesional)}+`, label: "Años" },
    { Icon: FolderGit2, valor: String(proyectos.length), label: "Proyectos" },
    { Icon: Code2, valor: String(lenguajes), label: "Lenguajes" },
  ];

  return (
    <div className="sg-section relative z-10 -mt-24 sm:-mt-32">
      <div className="sg-stats-container grid grid-cols-1 sm:grid-cols-3">
        {celdas.map(({ Icon, valor, label }) => (
          // justify-center: con solo tres celdas anchas, el grupo pegado a la
          // izquierda dejaba un vacio grande a la derecha de cada una.
          <div key={label} className="flex items-center justify-center gap-4 p-6">
            {/* Sin overrides !important: StatsBar es el unico consumidor de
                .sg-step-icon, asi que se usa su tamaño natural de 3rem. */}
            <span className="sg-step-icon">
              <Icon size={20} aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              {/* El numero es el dato: estaba en text-base, mas chico que los
                  tags de las tarjetas de proyecto. */}
              <b className="text-2xl font-extrabold leading-none tabular-nums">{valor}</b>
              <span className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
