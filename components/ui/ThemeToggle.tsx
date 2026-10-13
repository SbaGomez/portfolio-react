"use client";

import { Moon, Sun } from "lucide-react";
import { COLOR_BARRA, guardarTema, type Tema } from "@/lib/tema";

// Sin estado propio: el tema vive en el atributo data-theme del <html>, que
// el script de app/layout.tsx fija antes del primer pintado. El icono lo
// elige el CSS (.sg-theme-icon-*), asi que el server no tiene que saber cual
// mostrar y no hay desajuste al hidratar.
export default function ThemeToggle() {
  function alternar() {
    const actual = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nuevo: Tema = actual === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nuevo;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", COLOR_BARRA[nuevo]);
    guardarTema(nuevo);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label="Cambiar entre tema claro y oscuro"
      title="Cambiar tema"
      className="sg-theme-toggle"
    >
      <Sun size={17} className="sg-theme-icon-sol" aria-hidden="true" />
      <Moon size={17} className="sg-theme-icon-luna" aria-hidden="true" />
    </button>
  );
}
