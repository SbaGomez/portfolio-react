import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenido" className="sg-section flex flex-col items-center gap-4 text-center">
      <p className="text-6xl font-extrabold text-[var(--color-accent-light)]">404</p>
      <h1 className="text-2xl font-bold">Esta página no existe</h1>
      <p className="text-sm text-[var(--color-text-muted)]">
        Puede que el enlace esté roto o que la página haya cambiado de lugar.
      </p>
      <Link href="/" className="sg-button">Volver al inicio</Link>
    </main>
  );
}
