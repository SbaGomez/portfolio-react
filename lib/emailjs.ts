import emailjs from "@emailjs/browser";
import type { DatosFormulario } from "./validacion";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

let inicializado = false;

export async function enviarEmail(
  datos: DatosFormulario,
): Promise<{ success: boolean; error?: string }> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return { success: false, error: "Configuración de EmailJS incompleta." };
  }
  if (!inicializado) {
    emailjs.init(PUBLIC_KEY);
    inicializado = true;
  }

  const params = {
    from_name: datos.nombre,
    from_email: datos.email,
    subject: datos.asunto,
    message: datos.mensaje,
    to_email: "sbagomeznight@gmail.com",
    reply_to: datos.email,
    from_name_display: `${datos.nombre} (${datos.email})`,
    fecha: new Date().toLocaleString("es-AR", {
      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
    }),
  };

  try {
    // EmailJS no expone timeout propio: sin esta carrera, un envio colgado
    // deja el boton en "Enviando..." para siempre.
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000),
    );
    await Promise.race([
      emailjs.send(SERVICE_ID, TEMPLATE_ID, params, {
        publicKey: PUBLIC_KEY,
        limitRate: { throttle: 0, id: "contact-form" },
      }),
      timeout,
    ]);
    return { success: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    if (msg.includes("Timeout")) {
      return { success: false, error: "El envío tardó demasiado. Verificá tu conexión e intentá de nuevo." };
    }
    if (msg.includes("Template")) {
      return { success: false, error: "Error en la configuración del servidor. Intentá más tarde." };
    }
    return { success: false, error: "Error al enviar el mensaje. Intentá de nuevo." };
  }
}
