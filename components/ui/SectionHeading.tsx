export default function SectionHeading({
  titulo,
  subtitulo,
  nota,
  principal = false,
}: {
  titulo: string;
  subtitulo?: string;
  /**
   * Renderiza el título como <h1> en vez de <h2>. Va en el encabezado
   * principal de cada página: sin esto las rutas arrancaban en <h2> y se
   * quedaban sin h1, que además es cómo navegan los lectores de pantalla.
   */
  principal?: boolean;
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
      {principal ? (
        <h1 className="text-3xl font-bold">{titulo}</h1>
      ) : (
        <h2 className="text-3xl font-bold">{titulo}</h2>
      )}
      {subtitulo && (
        <p className="max-w-xl text-center text-sm text-[var(--color-text-muted)]">{subtitulo}</p>
      )}
      {nota && (
        <p className="max-w-xl text-center text-xs text-[var(--color-text-muted)]">{nota}</p>
      )}
    </div>
  );
}
