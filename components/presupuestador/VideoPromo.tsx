/**
 * Video de presentacion del Presupuestador: el horizontal en pantallas
 * grandes y el vertical en el celular. Los dos estan en el HTML y el CSS
 * oculta uno; con preload="none" el oculto no baja nada, y el visible recien
 * descarga el video cuando el usuario le da play (hasta ahi solo la portada).
 */
export default function VideoPromo() {
  return (
    <figure className="mx-auto w-full max-w-4xl">
      <video
        className="hidden aspect-video w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg)] md:block"
        src="/presupuestador/video-horizontal.mp4"
        poster="/presupuestador/video-horizontal.webp"
        width={1920}
        height={1080}
        controls
        playsInline
        preload="none"
        aria-label="Video de presentación de Presupuestador"
      />
      <video
        className="mx-auto aspect-[9/16] w-full max-w-sm rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
        src="/presupuestador/video-vertical.mp4"
        poster="/presupuestador/video-vertical.webp"
        width={1080}
        height={1920}
        controls
        playsInline
        preload="none"
        aria-label="Video de presentación de Presupuestador"
      />
    </figure>
  );
}
