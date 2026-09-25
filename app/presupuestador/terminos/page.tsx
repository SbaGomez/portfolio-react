import type { Metadata } from "next";
import Link from "next/link";
import DocumentoLegal, { type SeccionLegal } from "@/components/presupuestador/DocumentoLegal";
import { contacto } from "@/data/contacto";

export const metadata: Metadata = {
  title: "Condiciones del servicio de Presupuestador",
  description: "Condiciones de uso de Presupuestador, la aplicación de escritorio para armar presupuestos.",
  alternates: { canonical: "/presupuestador/terminos/" },
  openGraph: {
    title: "Condiciones del servicio de Presupuestador",
    description: "Condiciones de uso de Presupuestador, la aplicación de escritorio para armar presupuestos.",
  },
};

const secciones: SeccionLegal[] = [
  {
    titulo: "Aceptación",
    contenido: (
      <p>
        Estas condiciones regulan el uso de <strong>Presupuestador</strong>, una aplicación de
        escritorio para Windows desarrollada por Sebastian Gomez. Al descargar, instalar o usar la
        aplicación aceptás estas condiciones. Si no estás de acuerdo, no la uses.
      </p>
    ),
  },
  {
    titulo: "Qué es la aplicación",
    contenido: (
      <p>
        Presupuestador permite armar presupuestos, guardarlos en tu computadora, exportarlos a PDF y,
        de forma opcional, respaldarlos y sincronizarlos entre tus PCs usando tu propia cuenta de
        Google Drive. La aplicación se ofrece de forma gratuita.
      </p>
    ),
  },
  {
    titulo: "Tu cuenta de Google",
    contenido: (
      <p>
        La sincronización con Google Drive es opcional. Si la activás, también aplican los{" "}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
          Términos del Servicio de Google
        </a>
        . Podés desvincular tu cuenta en cualquier momento desde la aplicación. El tratamiento de tus
        datos se explica en la{" "}
        <Link href="/presupuestador/privacidad/">política de privacidad</Link>.
      </p>
    ),
  },
  {
    titulo: "Uso aceptable",
    contenido: (
      <>
        <p>Te comprometés a:</p>
        <ul>
          <li>Usar la aplicación de acuerdo con la ley vigente.</li>
          <li>
            Contar con autorización para cargar los datos de terceros (por ejemplo, de tus clientes)
            que ingreses en tus presupuestos.
          </li>
          <li>No usar la aplicación para emitir documentos engañosos o fraudulentos.</li>
        </ul>
      </>
    ),
  },
  {
    titulo: "Tu contenido",
    contenido: (
      <p>
        Los presupuestos, el logo y los datos que cargás son tuyos. El desarrollador no los recibe ni
        reclama ningún derecho sobre ellos. Sos responsable del contenido de los presupuestos que
        emitas, incluidos los precios, impuestos y condiciones comerciales que figuren en ellos.
      </p>
    ),
  },
  {
    titulo: "Respaldo de tus datos",
    contenido: (
      <p>
        Tus datos viven en tu computadora y, si lo activás, en tu Google Drive. Te recomendamos
        mantener la sincronización activa o hacer copias de respaldo propias: el desarrollador no
        guarda copias y no puede recuperar información perdida.
      </p>
    ),
  },
  {
    titulo: "Garantía y responsabilidad",
    contenido: (
      <p>
        La aplicación se ofrece “tal como está”, sin garantías de ningún tipo, expresas o implícitas.
        En la medida en que lo permita la ley, el desarrollador no es responsable por pérdidas de
        datos, errores en los cálculos o daños directos o indirectos derivados del uso de la
        aplicación. Revisá cada presupuesto antes de enviarlo.
      </p>
    ),
  },
  {
    titulo: "Cambios y discontinuación",
    contenido: (
      <p>
        La aplicación puede actualizarse, modificarse o dejar de mantenerse en cualquier momento.
        Estas condiciones pueden cambiar; la versión vigente es siempre la publicada en esta página,
        con su fecha de actualización.
      </p>
    ),
  },
  {
    titulo: "Ley aplicable",
    contenido: (
      <p>
        Estas condiciones se rigen por las leyes de la República Argentina. Cualquier conflicto se
        someterá a los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.
      </p>
    ),
  },
  {
    titulo: "Contacto",
    contenido: (
      <p>
        Por consultas sobre estas condiciones escribí a{" "}
        <a href={`mailto:${contacto.email}`}>{contacto.email}</a>.
      </p>
    ),
  },
];

export default function Terminos() {
  return (
    <DocumentoLegal
      titulo="Condiciones del servicio"
      actualizado="24 de septiembre de 2026"
      secciones={secciones}
    />
  );
}
