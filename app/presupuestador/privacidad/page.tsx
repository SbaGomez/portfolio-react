import type { Metadata } from "next";
import DocumentoLegal, { type SeccionLegal } from "@/components/presupuestador/DocumentoLegal";
import { contacto } from "@/data/contacto";

export const metadata: Metadata = {
  title: "Política de privacidad de Presupuestador",
  description: "Qué datos usa Presupuestador, dónde se guardan y cómo usa Google Drive.",
  alternates: { canonical: "/presupuestador/privacidad/" },
  openGraph: {
    title: "Política de privacidad de Presupuestador",
    description: "Qué datos usa Presupuestador, dónde se guardan y cómo usa Google Drive.",
  },
};

const email = <a href={`mailto:${contacto.email}`}>{contacto.email}</a>;

// El texto describe lo que la app hace de verdad: el unico permiso es
// drive.appdata y no hay servidor propio ni analitica. Si la app cambia de
// permisos o suma un servicio, esta pagina tiene que cambiar con ella.
const secciones: SeccionLegal[] = [
  {
    titulo: "Quién es el responsable",
    contenido: (
      <p>
        <strong>Presupuestador</strong> es una aplicación de escritorio para Windows desarrollada
        por Sebastian Gomez (Buenos Aires, Argentina). Para cualquier consulta sobre esta política
        podés escribir a {email}.
      </p>
    ),
  },
  {
    titulo: "Datos que maneja la aplicación",
    contenido: (
      <>
        <p>La aplicación trabaja con los datos que vos cargás:</p>
        <ul>
          <li>Los datos de tu negocio: nombre, logo, CUIT, dirección y datos de contacto.</li>
          <li>Tus presupuestos: ítems, precios, descuentos, notas y vigencia.</li>
          <li>Los datos de tus clientes que ingreses en cada presupuesto: nombre y, opcionalmente, teléfono.</li>
        </ul>
        <p>
          Todo esto se guarda <strong>únicamente en tu computadora</strong>, en la carpeta
          <code> %LOCALAPPDATA%\Presupuestador</code>. La aplicación no tiene un servidor propio, no
          envía estadísticas de uso ni reportes de errores, y no incluye publicidad ni herramientas de
          seguimiento. Los registros de errores se guardan solo en tu equipo y se borran solos a los
          14 días.
        </p>
      </>
    ),
  },
  {
    titulo: "Sincronización con Google Drive (opcional)",
    contenido: (
      <>
        <p>
          Si decidís vincular tu cuenta de Google, la aplicación usa Google Drive para guardar una
          copia de respaldo y sincronizar tus presupuestos entre tus computadoras. Para eso solicita
          un único permiso:
        </p>
        <ul>
          <li>
            <strong>
              <code>https://www.googleapis.com/auth/drive.appdata</code>
            </strong>{" "}
            — acceso a una carpeta privada y oculta de tu Google Drive reservada para esta
            aplicación. Con este permiso la aplicación <strong>no puede ver, leer ni modificar
            ningún otro archivo de tu Drive</strong>.
          </li>
        </ul>
        <p>Con ese acceso, la aplicación:</p>
        <ul>
          <li>
            Lee la <strong>dirección de email</strong> de tu cuenta de Google, solo para mostrarte
            qué cuenta está vinculada y comprobar que, si volvés a vincular, sea la misma.
          </li>
          <li>
            Guarda en esa carpeta privada un archivo de respaldo con tu base de presupuestos, tu logo y
            un resumen técnico (versión de la app, fecha, cantidad de presupuestos y el nombre de la
            computadora que lo generó).
          </li>
          <li>
            Guarda un pequeño archivo de sesión con el nombre de la computadora y la hora de la última
            actividad, para avisarte si la aplicación está abierta en otra de tus PCs.
          </li>
        </ul>
        <p>
          Los datos obtenidos de Google se usan exclusivamente para brindarte esta función de
          respaldo y sincronización. No se venden, no se comparten con terceros, no se usan para
          publicidad y ninguna persona los lee. Viajan directamente entre tu computadora y Google;
          nunca pasan por servidores del desarrollador.
        </p>
        <p>
          El uso y la transferencia de la información recibida de las API de Google por parte de
          Presupuestador cumple con la{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Datos del Usuario de los Servicios de las API de Google
          </a>
          , incluidos los requisitos de Uso Limitado.
        </p>
      </>
    ),
  },
  {
    titulo: "Cómo se protege la información",
    contenido: (
      <ul>
        <li>
          El token de acceso de Google se guarda en tu computadora cifrado con la protección de datos
          de Windows (DPAPI), atado a tu usuario de Windows.
        </li>
        <li>La comunicación con Google se hace siempre por conexiones cifradas (HTTPS).</li>
        <li>El desarrollador no tiene acceso a tus datos ni a tu cuenta de Google.</li>
      </ul>
    ),
  },
  {
    titulo: "Cuánto tiempo se conservan los datos y cómo borrarlos",
    contenido: (
      <>
        <p>Los datos se conservan hasta que vos decidas borrarlos:</p>
        <ul>
          <li>
            <strong>Desvincular la cuenta:</strong> desde la aplicación, la opción “Desvincular”
            revoca el permiso ante Google y borra el token de tu computadora. También podés revocarlo
            desde{" "}
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
              myaccount.google.com/permissions
            </a>
            .
          </li>
          <li>
            <strong>Borrar el respaldo de Drive:</strong> en Google Drive, entrá a Configuración →
            Administrar aplicaciones → Presupuestador → “Eliminar datos ocultos de la aplicación”.
          </li>
          <li>
            <strong>Borrar los datos locales:</strong> eliminá la carpeta{" "}
            <code>%LOCALAPPDATA%\Presupuestador</code> de tu computadora.
          </li>
        </ul>
        <p>Si necesitás ayuda para borrar tus datos, escribí a {email}.</p>
      </>
    ),
  },
  {
    titulo: "Menores de edad",
    contenido: (
      <p>
        La aplicación es una herramienta de trabajo para comercios y profesionales y no está dirigida
        a menores de 13 años.
      </p>
    ),
  },
  {
    titulo: "Cambios en esta política",
    contenido: (
      <p>
        Si la aplicación empieza a usar otros datos o permisos, esta página se va a actualizar antes
        de que el cambio llegue a la aplicación, y la fecha de arriba lo va a reflejar.
      </p>
    ),
  },
];

export default function Privacidad() {
  return (
    <DocumentoLegal
      titulo="Política de privacidad"
      actualizado="24 de septiembre de 2026"
      secciones={secciones}
    />
  );
}
