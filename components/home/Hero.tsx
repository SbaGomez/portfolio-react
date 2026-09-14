import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { perfil } from "@/data/perfil";
import { contacto } from "@/data/contacto";

export default function Hero() {
  const github = contacto.redes.find((r) => r.nombre === "GitHub")!;

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
        <a href={github.url} target="_blank" rel="noopener noreferrer" className="sg-button-outline">
          <GithubIcon size={18} />
          GitHub
        </a>
      </div>
    </section>
  );
}
