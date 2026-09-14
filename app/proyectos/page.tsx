import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ListaProyectos from "@/components/proyectos/ListaProyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Seis proyectos de desarrollo full stack, web, escritorio y servidores.",
};

export default function Proyectos() {
  return (
    <main id="contenido">
      <section className="sg-section">
        <SectionHeading
          titulo="Proyectos"
          subtitulo="Trabajo full stack en web, escritorio y servidores."
        />
        {/* Sin esta linea, la ausencia de links a GitHub se lee como descuido
            en vez de como lo que es: codigo de clientes. */}
        <p className="mx-auto mb-8 max-w-xl text-center text-sm text-[var(--color-text-muted)]">
          Varios de estos proyectos son privados o pertenecen a clientes, así que no todos tienen
          código público.
        </p>
        <ListaProyectos />
      </section>
    </main>
  );
}
