"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import Wordmark from "@/components/ui/Wordmark";
import { contacto } from "@/data/contacto";

const SECCIONES = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

const ICONOS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  WhatsApp: WhatsappIcon,
};

const ANIO_INICIAL = 2025;

export default function Footer() {
  const [copiado, setCopiado] = useState(false);

  // Se calcula despues de montar y no durante el render: el sitio es un
  // export estatico, asi que en el render quedaria horneado el año del build
  // y dejaria de actualizarse. Ademas evita un desajuste de hidratacion al
  // cruzar un fin de año.
  const [anio, setAnio] = useState<number | null>(null);

  useEffect(() => {
    setAnio(new Date().getFullYear());
  }, []);

  const rango =
    anio && anio > ANIO_INICIAL ? `${ANIO_INICIAL} - ${anio}` : String(ANIO_INICIAL);

  async function copiar() {
    await navigator.clipboard.writeText(contacto.email);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <footer className="sg-footer">
      <div className="sg-footer-bg" aria-hidden="true" />
      <div className="sg-footer-glow" aria-hidden="true" />
      <div className="relative z-[2] mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Wordmark />
          <p className="text-sm text-[var(--color-text-muted)]">
            Desarrollador Full Stack en Buenos Aires, Argentina.
          </p>
          <ul className="flex gap-2">
            {contacto.redes.map((red) => {
              const Icon = ICONOS[red.nombre as keyof typeof ICONOS];
              return (
                <li key={red.nombre}>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={red.nombre}
                    className="sg-social-icon"
                    style={{ "--color-red": red.color } as React.CSSProperties}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Secciones">
          <h2 className="sg-footer-heading">Secciones</h2>
          {SECCIONES.map((s) => (
            <Link key={s.href} href={s.href} className="sg-footer-link">
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <h2 className="sg-footer-heading">Contacto</h2>
          <button type="button" onClick={copiar} className="sg-footer-connect">
            <span className="truncate text-sm">{contacto.email}</span>
            {copiado ? (
              <Check size={16} className="shrink-0 text-[#4ade80]" aria-hidden="true" />
            ) : (
              <Copy size={16} className="shrink-0" aria-hidden="true" />
            )}
            <span className="sr-only">{copiado ? "Email copiado" : "Copiar email"}</span>
          </button>
          {/* Region viva solo para lectores de pantalla: el check verde del
              boton ya es la senal visual, y el texto suelto colgaba por fuera
              del recuadro. */}
          <p aria-live="polite" className="sr-only">
            {copiado ? "Email copiado" : ""}
          </p>
        </div>
      </div>
      <p className="relative z-[2] border-t border-[var(--color-border)] px-6 py-5 text-center text-xs text-[var(--color-text-muted)]">
        © {rango} {contacto.copyright}
      </p>
    </footer>
  );
}
