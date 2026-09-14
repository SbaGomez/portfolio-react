import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { perfil } from "@/data/perfil";
import { contacto } from "@/data/contacto";

export default function Hero() {
  const linkedin = contacto.redes.find((r) => r.nombre === "LinkedIn")!;

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-32 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight text-balance sm:text-7xl lg:text-8xl">
        {perfil.nombre}
        <span className="sg-hero-gradient block">FULL STACK</span>
      </h1>
      <p className="max-w-xl text-lg text-[var(--color-text-muted)]">{perfil.resumen}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/contacto" className="sg-button">
          <Mail size={18} aria-hidden="true" />
          Contactame
        </Link>
        <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="sg-button-outline">
          <LinkedinIcon size={18} />
          LinkedIn
        </a>
      </div>
    </section>
  );
}
