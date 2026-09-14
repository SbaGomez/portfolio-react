import { describe, it, expect } from "vitest";
import { validarCampo } from "@/lib/validacion";

describe("validarCampo", () => {
  it("exige el nombre", () => {
    expect(validarCampo("nombre", "  ").error).toBe("El nombre es requerido");
  });

  it("pide al menos dos caracteres en el nombre", () => {
    expect(validarCampo("nombre", "a").error).toBe("El nombre debe tener al menos 2 caracteres");
  });

  it("acepta un nombre válido", () => {
    expect(validarCampo("nombre", "Sebastián")).toEqual({ error: "", warning: "" });
  });

  it("exige el email como error, pero un formato inválido es solo advertencia", () => {
    expect(validarCampo("email", "").error).toBe("El email es requerido");
    expect(validarCampo("email", "no-es-un-mail").warning).toBe("Por favor, usa un email válido");
    expect(validarCampo("email", "no-es-un-mail").error).toBe("");
  });

  it("acepta un email válido", () => {
    expect(validarCampo("email", "hola@ejemplo.com")).toEqual({ error: "", warning: "" });
  });

  it("pide al menos tres caracteres en el asunto", () => {
    expect(validarCampo("asunto", "ab").error).toBe("El asunto debe tener al menos 3 caracteres");
  });

  it("pide al menos diez caracteres en el mensaje", () => {
    expect(validarCampo("mensaje", "corto").error).toBe("El mensaje debe tener al menos 10 caracteres");
  });
});
