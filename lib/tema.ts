export type Tema = "dark" | "light";

const CLAVE = "tema";

// Color de la barra del navegador en mobile, uno por tema. Son --color-bg de
// cada tema en globals.css.
export const COLOR_BARRA: Record<Tema, string> = {
  dark: "#0a0e1a",
  light: "#f3eee8",
};

// Corre inline en el <head>, antes de que se pinte nada: sin esto quien eligio
// el oscuro veria un destello del claro en cada carga. Sin preferencia
// guardada queda el claro, que es el que sale del server. El try cubre el
// localStorage bloqueado (modo privado, cookies deshabilitadas).
export const SCRIPT_TEMA = `(function(){try{var t=localStorage.getItem("${CLAVE}");if(t!=="light"&&t!=="dark")t="light";document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"${COLOR_BARRA.light}":"${COLOR_BARRA.dark}")}catch(e){}})()`;

export function guardarTema(tema: Tema) {
  try {
    localStorage.setItem(CLAVE, tema);
  } catch {
    // Sin almacenamiento el cambio vale solo para esta pagina.
  }
}
