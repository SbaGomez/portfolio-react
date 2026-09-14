export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`sg-glass-card ${className}`}>
      <div className="sg-glass-card-bg" aria-hidden="true" />
      <div className="sg-glass-card-glow" aria-hidden="true" />
      {/* Altura completa para que el contenido pueda distribuirse cuando la
          tarjeta se estira: sin esto el wrapper mide lo que mide el contenido
          y un justify-between adentro no tiene contra que repartir. */}
      <div className="relative z-[2] flex h-full flex-col">{children}</div>
    </div>
  );
}
