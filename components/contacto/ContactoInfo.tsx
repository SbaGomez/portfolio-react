import { Mail, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { contacto } from "@/data/contacto";

const ICONOS_MEDIO = {
  mail: Mail,
  whatsapp: WhatsappIcon,
  "map-pin": MapPin,
};

// Mismo mapa que el Footer: lucide no trae iconos de marca, van inline.
const ICONOS_RED = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  WhatsApp: WhatsappIcon,
};

export default function ContactoInfo() {
  return (
    // h-full para igualar la altura del formulario. El contenido se reparte
    // con justify-between: estirar la tarjeta sin distribuir dejaba todo
    // arriba y un hueco grande abajo.
    <GlassCard className="h-full">
      <div className="flex flex-1 flex-col justify-between gap-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
            Otros medios
          </h2>

          <ul className="mt-4 flex flex-col gap-2.5">
            {contacto.medios.map((medio) => {
              const Icon = ICONOS_MEDIO[medio.icono as keyof typeof ICONOS_MEDIO];
              const contenido = (
                <>
                  <span className="sg-social-icon shrink-0">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      {medio.titulo}
                    </span>
                    <span className="truncate text-sm font-semibold">{medio.valor}</span>
                  </span>
                </>
              );

              return (
                <li key={medio.titulo}>
                  {/* Ubicacion no tiene link: va como texto y no como un <a>
                      apuntando a "#", que es lo que hacia el sitio anterior.
                      Por eso el hover del CSS aplica solo a los <a>. */}
                  {medio.link ? (
                    <a
                      href={medio.link}
                      target={medio.link.startsWith("http") ? "_blank" : undefined}
                      rel={medio.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="sg-medio"
                    >
                      {contenido}
                    </a>
                  ) : (
                    <span className="sg-medio">{contenido}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]">
            Redes
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
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
                    style={{ "--color-red": red.color } as React.CSSProperties}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}
