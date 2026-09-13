import { describe, it, expect } from "vitest";
import { calcularEdad, aniosDesde } from "@/lib/fechas";

describe("calcularEdad", () => {
  it("cuenta los años cumplidos", () => {
    expect(calcularEdad("1995-12-09", new Date("2026-12-10"))).toBe(31);
  });

  it("no cuenta el año si todavía no llegó el cumpleaños", () => {
    expect(calcularEdad("1995-12-09", new Date("2026-12-08"))).toBe(30);
  });

  it("cuenta el año el mismo día del cumpleaños", () => {
    expect(calcularEdad("1995-12-09", new Date("2026-12-09"))).toBe(31);
  });
});

describe("aniosDesde", () => {
  it("redondea hacia abajo los años completos", () => {
    expect(aniosDesde("2022-07-01", new Date("2026-09-13"))).toBe(4);
  });

  it("devuelve 0 antes del primer año", () => {
    expect(aniosDesde("2026-01-01", new Date("2026-09-13"))).toBe(0);
  });
});
