import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ListaProyectos from "@/components/proyectos/ListaProyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de desarrollo full stack: web, escritorio y servidores.",
  alternates: { canonical: "/proyectos/" },
  openGraph: {
    title: "Proyectos — Sebastian Gomez",
    description: "Proyectos de desarrollo full stack: web, escritorio y servidores.",
  },
};

export default function Proyectos() {
  return (
    <main id="contenido">
      <section className="sg-section">
        {/* La nota evita que la ausencia de links a GitHub se lea como
            descuido en vez de como lo que es: codigo de clientes. */}
        <SectionHeading
          principal
          titulo="Proyectos"
          subtitulo="Trabajo full stack en web, escritorio y servidores."
          nota="Varios de estos proyectos son privados o pertenecen a clientes, así que no todos tienen código público."
        />
        <ListaProyectos />
      </section>
    </main>
  );
}
