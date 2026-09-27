/**
 * Indice de la captura vecina en un slider que empieza con un video: la vista
 * ampliada es solo de capturas, asi que recorre las posiciones desde `offset`
 * (1 si hay video, 0 si no) y saltea el video al dar la vuelta.
 */
export function siguienteCaptura(i: number, paso: number, offset: number, n: number) {
  return ((i - offset + paso + n) % n) + offset;
}
