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
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
