import { iconos } from "./iconos-generados";

export type Icono = { path: string; color: string };

/**
 * Lee del literal que emite scripts/generar-iconos.mjs. Deliberadamente NO
 * importa simple-icons: ProyectoCard cae en el grafo de cliente (porque
 * ListaProyectos es "use client"), asi que importar el paquete aca mandaba
 * los 3460 iconos al navegador en un chunk de 5 MB.
 */
export function iconoDe(nombre: string): Icono | null {
  return iconos[nombre] ?? null;
}
