"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, User, Mail, Tag, MessageSquare, X } from "lucide-react";
import { validarCampo, type CampoFormulario, type DatosFormulario } from "@/lib/validacion";
import { enviarEmail } from "@/lib/emailjs";

const CAMPOS: {
  id: CampoFormulario;
  etiqueta: string;
  placeholder: string;
  ayuda: string;
  Icono: typeof User;
  multilinea?: boolean;
}[] = [
  { id: "nombre", etiqueta: "Nombre", placeholder: "Escribí tu nombre completo", ayuda: "Ingresá tu nombre y apellido", Icono: User },
  { id: "email", etiqueta: "Email", placeholder: "tu@email.com", ayuda: "Por favor, usá un email válido", Icono: Mail },
  { id: "asunto", etiqueta: "Asunto", placeholder: "¿De qué querés hablar?", ayuda: "Describí brevemente el tema de tu mensaje", Icono: Tag },
  { id: "mensaje", etiqueta: "Mensaje", placeholder: "Contame sobre tu proyecto o idea...", ayuda: "Escribí tu mensaje detallado acá", Icono: MessageSquare, multilinea: true },
];

const VACIO: DatosFormulario = { nombre: "", email: "", asunto: "", mensaje: "" };

export default function ContactoForm() {
  const [datos, setDatos] = useState<DatosFormulario>(VACIO);
  const [errores, setErrores] = useState<Partial<DatosFormulario>>({});
  const [avisos, setAvisos] = useState<Partial<DatosFormulario>>({});
  const [tocados, setTocados] = useState<Partial<Record<CampoFormulario, boolean>>>({});
  const [enviando, setEnviando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [resultado, setResultado] = useState<"ok" | "error" | null>(null);

  function revalidar(id: CampoFormulario, valor: string) {
    const { error, warning } = validarCampo(id, valor);
    setErrores((p) => ({ ...p, [id]: error }));
    setAvisos((p) => ({ ...p, [id]: warning }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTocados({ nombre: true, email: true, asunto: true, mensaje: true });

    const nuevosErrores: Partial<DatosFormulario> = {};
    const nuevosAvisos: Partial<DatosFormulario> = {};
    for (const campo of CAMPOS) {
      const { error, warning } = validarCampo(campo.id, datos[campo.id]);
      if (error) nuevosErrores[campo.id] = error;
      if (warning) nuevosAvisos[campo.id] = warning;
    }
    setErrores(nuevosErrores);
    setAvisos(nuevosAvisos);

    // Solo los errores frenan el envio: una advertencia (email mal formado)
    // se muestra pero deja pasar.
    const primerError = CAMPOS.find((c) => nuevosErrores[c.id]);
    if (primerError) {
      document.getElementById(primerError.id)?.focus();
      return;
    }

    setEnviando(true);
    setResultado(null);
    setProgreso(0);
    // Progreso simulado: EmailJS no expone avance real del envío.
    const tick = setInterval(() => {
      setProgreso((p) => (p >= 90 ? p : p + Math.random() * 15));
    }, 200);

    const r = await enviarEmail(datos);

    clearInterval(tick);
    setProgreso(100);
    if (r.success) {
      setResultado("ok");
      setDatos(VACIO);
      setErrores({});
      setAvisos({});
      setTocados({});
    } else {
      setResultado("error");
    }
    setTimeout(() => {
      setEnviando(false);
      setProgreso(0);
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {CAMPOS.map(({ id, etiqueta, placeholder, ayuda, Icono, multilinea }) => {
        const error = tocados[id] ? errores[id] : "";
        const aviso = tocados[id] && !error ? avisos[id] : "";
        const props = {
          id,
          name: id,
          value: datos[id],
          placeholder,
          "aria-invalid": Boolean(error),
          "aria-describedby": `${id}-msg`,
          className: `sg-input ${error ? "sg-input-error" : aviso ? "sg-input-warning" : ""}`,
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setDatos((p) => ({ ...p, [id]: e.target.value }));
            revalidar(id, e.target.value);
          },
          onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setTocados((p) => ({ ...p, [id]: true }));
            revalidar(id, e.target.value);
          },
        };

        return (
          <div key={id} className="flex flex-col gap-2">
            <label
              htmlFor={id}
              className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent-light)]"
            >
              {etiqueta}:
            </label>
            <div className="sg-input-wrap">
              <span className="sg-input-icono">
                <Icono size={16} aria-hidden="true" />
              </span>
              {multilinea ? <textarea rows={5} {...props} /> : <input type="text" {...props} />}
            </div>
            <p
              id={`${id}-msg`}
              className={`sg-field-msg ${
                error ? "sg-field-msg-error" : aviso ? "sg-field-msg-warning" : ""
              }`}
            >
              {error ? (
                <X size={14} aria-hidden="true" className="shrink-0" />
              ) : aviso ? (
                <AlertCircle size={14} aria-hidden="true" className="shrink-0" />
              ) : null}
              {error || aviso || ayuda}
            </p>
          </div>
        );
      })}

      <button type="submit" className="sg-button sg-button-enviar" disabled={enviando}>
        {enviando ? (
          <>
            <Loader2 size={18} className="sg-spin" aria-hidden="true" />
            Enviando… {Math.round(progreso)}%
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Enviar mensaje
          </>
        )}
      </button>

      {enviando && (
        <div className="sg-progress-track">
          <div className="sg-progress-fill" style={{ width: `${progreso}%` }} />
        </div>
      )}

      <div aria-live="polite">
        {resultado === "ok" && (
          <p className="sg-alert sg-alert-ok">
            <CheckCircle2 size={16} aria-hidden="true" />
            ¡Mensaje enviado! Te respondo a la brevedad.
          </p>
        )}
        {resultado === "error" && (
          <p className="sg-alert sg-alert-error">
            <AlertCircle size={16} aria-hidden="true" />
            Hubo un error al enviar el mensaje. Intentá de nuevo.
          </p>
        )}
      </div>
    </form>
  );
}
