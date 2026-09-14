import IconoTecnologia from "@/components/ui/IconoTecnologia";

/**
 * Tag de tecnologia.
 *
 * Se colorea solo el icono, y solo cuando es una marca real. Pintar tambien
 * el fondo y el texto con el color de marca daria hasta nueve colores por
 * tarjeta compitiendo entre si y con el azul del sistema.
 */
export default function TechTag({ nombre }: { nombre: string }) {
  return (
    <li className="sg-tag">
      <IconoTecnologia nombre={nombre} />
      {nombre}
    </li>
  );
}
