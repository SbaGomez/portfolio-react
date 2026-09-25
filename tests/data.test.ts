import { describe, it, expect } from "vitest";
import { proyectos } from "@/data/proyectos";
import { tecnologias } from "@/data/tecnologias";
import { experiencias } from "@/data/experiencia";

describe("proyectos", () => {
  it("tiene ocho fichas", () => {
    expect(proyectos).toHaveLength(8);
  });

  it("no repite slugs", () => {
    const slugs = proyectos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cada ficha tiene resumen, stack y al menos un destacado", () => {
    for (const p of proyectos) {
      expect(p.resumen.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.destacados.length).toBeGreaterThan(0);
    }
  });

  it("las fichas anónimas no nombran al cliente ni al proveedor", () => {
    const prohibidos = ["synerbit", "tattile", "whatsapp"];
    for (const p of proyectos.filter((x) => x.anonimo)) {
      const texto = [p.titulo, p.resumen, ...p.descripcion, ...p.destacados, ...p.stack]
        .join(" ")
        .toLowerCase();
      for (const palabra of prohibidos) {
        expect(texto).not.toContain(palabra);
      }
    }
  });
});

describe("tecnologias", () => {
  it("cada tecnología con logo apunta a un archivo bajo /tecnologias", () => {
    for (const t of tecnologias.filter((x) => x.logo)) {
      expect(t.logo).toMatch(/^\/tecnologias\/.+\.svg$/);
    }
  });
});

describe("experiencias", () => {
  it("están ordenadas de más reciente a más antigua", () => {
    const desdes = experiencias.map((e) => e.desde);
    expect([...desdes].sort().reverse()).toEqual(desdes);
  });
});
