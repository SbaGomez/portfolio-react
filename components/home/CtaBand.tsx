import Link from "next/link";
import { Mail } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="sg-section">
      <div className="sg-cta-band">
        <h2 className="text-2xl font-bold text-balance">¿Tenés un proyecto en mente?</h2>
        <p className="mx-auto max-w-md text-sm text-[var(--color-text-muted)]">
          Contame en qué estás trabajando y vemos cómo puedo ayudarte.
        </p>
        <Link href="/contacto" className="sg-button">
          <Mail size={18} aria-hidden="true" />
          Escribime
        </Link>
      </div>
    </section>
  );
}
