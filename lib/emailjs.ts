import emailjs from "@emailjs/browser";
import type { DatosFormulario } from "./validacion";
import { contacto } from "@/data/contacto";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

let inicializado = false;

/**
 * EmailJS no rechaza con un Error sino con un `EmailJSResponseStatus`, que es
 * una clase suelta con `status` y `text` y que NO extiende Error. Por eso el
 * `error instanceof Error` de antes daba false para todo fallo del servicio y
 * el motivo real se perdia sin siquiera loguearse.
 *
 * No se importa la clase para no depender de que el paquete la exporte:
 * alcanza con mirar la forma del objeto.
 */
function detalleDeError(error: unknown): { status: number | null; texto: string } {
  if (typeof error === "object" && error !== null && "text" in error) {
    const e = error as { status?: unknown; text?: unknown };
    return {
      status: typeof e.status === "number" ? e.status : null,
      texto: typeof e.text === "string" ? e.text : "",
    };
  }
  // El timeout de abajo si rechaza con un Error propio.
  if (error instanceof Error) return { status: null, texto: error.message };
  return { status: null, texto: "" };
}

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
    // El correo del visitante. La plantilla de EmailJS ata TRES campos a esta
    // misma variable —"From Email", "Reply To" y la linea "Email:" del
    // cuerpo—, asi que tiene que llevar su direccion: es lo unico que hace
    // que el cuerpo lo muestre y que "Responder" le conteste a el.
    //
    // CONTRAPARTIDA CONOCIDA: el mensaje sale diciendo venir del dominio del
    // visitante (gmail.com, por ejemplo), que por SPF no autoriza al servidor
    // de Ferozo que lo envia. Es una senal de spam. Si los mensajes empiezan
    // a caer en la carpeta de basura, la causa es esta.
    //
    // El arreglo entonces NO es tocar esta linea, sino desatar los tres
    // campos en la plantilla: poner {{reply_to}} en "Reply To" y en la linea
    // "Email:" del cuerpo, y dejar {{from_email}} solo como remitente con una
    // direccion del dominio propio. El parametro reply_to ya se manda abajo.
    from_email: datos.email,
    subject: datos.asunto,
    message: datos.mensaje,
    // Derivado de data/contacto.ts y no hardcodeado: era el ultimo literal
    // que duplicaba la direccion publica. OJO: esto solo manda a donde dice
    // si el campo "To Email" de la plantilla en EmailJS es {{to_email}};
    // si ahi hay una direccion fija, gana esa y este valor es inerte.
    to_email: contacto.email,
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
    const { status, texto } = detalleDeError(error);

    // Sin esto, un servicio de correo desconectado se ve igual que un corte
    // de red: el unico que sabe la causa es EmailJS y lo dice aca.
    console.error(`EmailJS fallo (status ${status ?? "?"}): ${texto || "sin detalle"}`);

    if (texto.includes("Timeout")) {
      return {
        success: false,
        error: "El envío tardó demasiado. Verificá tu conexión e intentá de nuevo.",
      };
    }

    // 412: EmailJS recibio bien la peticion pero su servicio de correo
    // conectado fallo, casi siempre porque la cuenta perdio la autorizacion.
    // Reintentar no puede funcionar, asi que no se lo pedimos al visitante:
    // se le da una via que si anda.
    if (status === 412) {
      return {
        success: false,
        error: `El formulario está fuera de servicio por un problema de configuración. Escribime directo a ${contacto.email}.`,
      };
    }

    if (status === 429) {
      return {
        success: false,
        error: "Demasiados envíos seguidos. Esperá un momento e intentá de nuevo.",
      };
    }

    return { success: false, error: "Error al enviar el mensaje. Intentá de nuevo." };
  }
}
