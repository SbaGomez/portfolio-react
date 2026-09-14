import { Mail, MessageCircle, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { contacto } from "@/data/contacto";

const ICONOS_MEDIO = {
  mail: Mail,
  "message-circle": MessageCircle,
  "map-pin": MapPin,
};

// Mismo mapa que el Footer: lucide no trae iconos de marca, salvo WhatsApp
// que se resuelve con el generico de mensaje.
const ICONOS_RED = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  WhatsApp: MessageCircle,
};

export default function ContactoInfo() {
  return (
    <GlassCard>
      <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
        Otros medios
      </h2>

      <ul className="mt-4 flex flex-col gap-4">
        {contacto.medios.map((medio) => {
          const Icon = ICONOS_MEDIO[medio.icono as keyof typeof ICONOS_MEDIO];
          const contenido = (
            <>
              <span className="sg-social-icon shrink-0">
                <Icon size={16} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                  {medio.titulo}
                </span>
                <span className="text-sm font-semibold">{medio.valor}</span>
              </span>
            </>
          );

          return (
            <li key={medio.titulo}>
              {/* Ubicacion no tiene link: va como texto y no como un <a>
                  apuntando a "#", que es lo que hacia el sitio anterior. */}
              {medio.link ? (
                <a
                  href={medio.link}
                  target={medio.link.startsWith("http") ? "_blank" : undefined}
                  rel={medio.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3"
                >
                  {contenido}
                </a>
              ) : (
                <span className="flex items-center gap-3">{contenido}</span>
              )}
            </li>
          );
        })}
      </ul>

      <h2 className="mt-8 text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
        Redes
      </h2>
      <ul className="mt-3 flex gap-2">
        {contacto.redes.map((red) => {
          const Icon = ICONOS_RED[red.nombre as keyof typeof ICONOS_RED];
          return (
            <li key={red.nombre}>
              <a
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={red.nombre}
                className="sg-social-icon"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
