import type { VideoProyecto } from "@/data/tipos";

/**
 * Video pensado para ir dentro de un .sg-slider: el horizontal en pantallas
 * grandes y el vertical en el celular. Los dos estan en el HTML y el CSS
 * oculta uno; con preload="none" el oculto no baja nada y el visible solo
 * trae la portada hasta que se le da play. Al cambiar de slide se desmontan
 * y se cortan.
 */
export default function VideoResponsivo({ video, titulo }: { video: VideoProyecto; titulo: string }) {
  return (
    <>
      <video
        className="hidden aspect-video w-full md:block"
        src={video.horizontal.src}
        poster={video.horizontal.poster}
        width={1920}
        height={1080}
        controls
        playsInline
        preload="none"
        aria-label={`Video de presentación de ${titulo}`}
      />
      <video
        className="block aspect-[9/16] w-full md:hidden"
        src={video.vertical.src}
        poster={video.vertical.poster}
        width={1080}
        height={1920}
        controls
        playsInline
        preload="none"
        aria-label={`Video de presentación de ${titulo}`}
      />
    </>
  );
}
