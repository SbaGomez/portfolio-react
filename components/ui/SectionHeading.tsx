export default function SectionHeading({
  titulo,
  subtitulo,
  nota,
}: {
  titulo: string;
  subtitulo?: string;
  /**
   * Aclaracion secundaria. Va adentro del encabezado a proposito: como
   * bloque aparte queda a 3rem del subtitulo, que es el margin-bottom de
   * .sg-section-heading, y se lee como otra seccion en vez de como parte
   * del mismo bloque.
   */
  nota?: string;
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
      {nota && (
        <p className="max-w-xl text-center text-xs text-[var(--color-text-muted)]">{nota}</p>
      )}
    </div>
  );
}
