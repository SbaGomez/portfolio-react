import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactoForm from "@/components/contacto/ContactoForm";
import ContactoInfo from "@/components/contacto/ContactoInfo";

export const metadata: Metadata = {
  title: "Contacto — Sebastián Gómez",
  description: "Escribime para hablar de un proyecto, una idea o una posición.",
};

export default function Contacto() {
  return (
    <main id="contenido">
      <section className="sg-section">
        <SectionHeading
          titulo="Contacto"
          subtitulo="Contame sobre tu proyecto y te respondo a la brevedad."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <ContactoForm />
          <ContactoInfo />
        </div>
      </section>
    </main>
  );
}
