import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ListaProyectos from "@/components/proyectos/ListaProyectos";
import { proyectos } from "@/data/proyectos";

export default function ProyectosDestacados() {
  const destacados = proyectos.filter((p) => p.destacado);

  return (
    <section className="sg-section">
      <SectionHeading
        titulo="Proyectos"
        subtitulo="Una selección del trabajo más reciente."
      />
      {/* La misma grilla que usa /proyectos, con el mismo modal: antes esta
          seccion armaba su propia grilla sin onAbrir, y por eso las tarjetas
          del inicio no tenian "Ver detalle". Solo la grilla es de cliente; el
          encabezado y el enlace de abajo siguen siendo de servidor. */}
      <ListaProyectos proyectos={destacados} pasoDelay={100} />
      <div className="mt-8 flex justify-center">
        <Link href="/proyectos" className="sg-button-outline">
          Ver todos los proyectos
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
