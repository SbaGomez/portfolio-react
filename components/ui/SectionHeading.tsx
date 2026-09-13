export default function SectionHeading({
  titulo,
  subtitulo,
}: {
  titulo: string;
  subtitulo?: string;
}) {
  return (
    <div className="sg-section-heading">
      <span className="sg-section-heading-line" aria-hidden="true">
        <span className="sg-section-heading-dot" />
      </span>
      <h2 className="text-3xl font-bold">{titulo}</h2>
      {subtitulo && (
        <p className="max-w-xl text-center text-sm text-[var(--color-text-muted)]">{subtitulo}</p>
      )}
    </div>
  );
}
