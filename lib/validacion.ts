export type CampoFormulario = "nombre" | "email" | "asunto" | "mensaje";
export type DatosFormulario = Record<CampoFormulario, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarCampo(
  nombre: CampoFormulario,
  valor: string,
): { error: string; warning: string } {
  const v = valor.trim();

  switch (nombre) {
    case "nombre":
      if (!v) return { error: "El nombre es requerido", warning: "" };
      if (v.length < 2) return { error: "El nombre debe tener al menos 2 caracteres", warning: "" };
      return { error: "", warning: "" };
    case "email":
      // Un email vacio es error, pero uno mal formado es solo advertencia:
      // no bloquea el envio. Se conserva del formulario original.
      if (!v) return { error: "El email es requerido", warning: "" };
      if (!EMAIL.test(valor)) return { error: "", warning: "Por favor, usa un email válido" };
      return { error: "", warning: "" };
    case "asunto":
      if (!v) return { error: "El asunto es requerido", warning: "" };
      if (v.length < 3) return { error: "El asunto debe tener al menos 3 caracteres", warning: "" };
      return { error: "", warning: "" };
    case "mensaje":
      if (!v) return { error: "El mensaje es requerido", warning: "" };
      if (v.length < 10) return { error: "El mensaje debe tener al menos 10 caracteres", warning: "" };
      return { error: "", warning: "" };
  }
}
