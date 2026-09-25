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

// El texto describe lo que la app hace de verdad: pide openid, email y
// drive.appdata, y el unico servidor propio es el de licencias, que guarda el
// email y las fechas de prueba y vencimiento. No hay analitica. Si la app
// cambia de permisos o suma un servicio, esta pagina tiene que cambiar con ella.
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
          Todo esto se guarda <strong>únicamente en tu computadora</strong>, en la carpeta{" "}
          <code>%LOCALAPPDATA%\Presupuestador</code>, y en la copia de respaldo de tu Google Drive que
          se explica más abajo. La aplicación no envía estadísticas de uso ni reportes de errores, y
          no incluye publicidad ni herramientas de seguimiento. Los registros de errores se guardan
          solo en tu equipo y se borran solos a los 14 días.
        </p>
      </>
    ),
  },
  {
    titulo: "Tu cuenta de Google y Google Drive",
    contenido: (
      <>
        <p>
          Para usar la aplicación tenés que vincular tu cuenta de Google. La cuenta sirve para dos
          cosas: identificar tu licencia y guardar una copia de respaldo de tus presupuestos en tu
          Google Drive, sincronizada entre tus computadoras. Para eso la aplicación solicita estos
          permisos:
        </p>
        <ul>
          <li>
            <strong>
              <code>openid</code> y <code>email</code>
            </strong>{" "}
            — tu identidad y la dirección de email verificada de tu cuenta de Google.
          </li>
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
            Usa la <strong>dirección de email</strong> de tu cuenta de Google para mostrarte qué
            cuenta está vinculada, para comprobar que, si volvés a vincular, sea la misma, y para
            consultar tu licencia (ver la sección siguiente).
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
          Los datos obtenidos de Google se usan exclusivamente para brindarte el respaldo, la
          sincronización y la licencia. No se venden, no se comparten con terceros, no se usan para
          publicidad y ninguna persona lee tus presupuestos. El respaldo viaja directamente entre tu
          computadora y Google y nunca pasa por servidores del desarrollador.
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
    titulo: "Licencia y período de prueba",
    contenido: (
      <>
        <p>
          Para saber si tenés una prueba o una licencia vigente, la aplicación envía al servidor de
          licencias del desarrollador (alojado en Cloudflare) el token de identidad de tu cuenta de
          Google. El servidor lo verifica ante Google, toma de él tu email y guarda únicamente:
        </p>
        <ul>
          <li>Tu dirección de email.</li>
          <li>La fecha en que empezó tu prueba gratuita y la fecha de vencimiento de tu licencia.</li>
          <li>Una nota interna opcional del desarrollador, por ejemplo sobre el pago de la licencia.</li>
        </ul>
        <p>
          El servidor no recibe tus presupuestos, tus clientes, los datos de tu negocio ni ningún
          archivo de tu Drive. Estos datos se usan solo para administrar tu licencia y no se
          comparten con terceros.
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
        <li>
          La comunicación con Google y con el servidor de licencias se hace siempre por conexiones
          cifradas (HTTPS).
        </li>
        <li>
          El desarrollador no tiene acceso a tus presupuestos, a tu Drive ni a tu cuenta de Google;
          solo ve tu email y el estado de tu licencia.
        </li>
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
          <li>
            <strong>Borrar tu registro de licencia:</strong> escribí a {email} desde la cuenta
            vinculada y lo eliminamos. Tené en cuenta que, sin ese registro, se pierde la licencia
            que tengas vigente.
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
      actual="/presupuestador/privacidad/"
      actualizado="25 de septiembre de 2026"
      secciones={secciones}
    />
  );
}
