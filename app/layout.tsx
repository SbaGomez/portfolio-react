import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { COLOR_BARRA, ICONO, SCRIPT_TEMA } from "@/lib/tema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastiangomez.com.ar"),
  title: {
    default: "Sebastian Gomez — Full Stack Developer",
    // Las paginas hijas declaran solo su nombre ("Sobre mi"): el sufijo lo
    // pone este template, y repetirlo alla daria el nombre dos veces.
    template: "%s — Sebastian Gomez",
  },
  description:
    "Desarrollador Full Stack. .NET, Java / Spring Boot, Node.js, Angular, React Native y Electron.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://sebastiangomez.com.ar",
    siteName: "Sebastian Gomez",
    title: "Sebastian Gomez — Full Stack Developer",
    description: "Desarrollador Full Stack con experiencia en web, backend, mobile y escritorio.",
  },
  // Sale el del tema claro, que es el default; si el visitante eligio el
  // oscuro, SCRIPT_TEMA lo cambia. Por eso el .ico no esta en app/: Next lo
  // publicaria como un segundo <link rel="icon"> y el navegador elegiria uno
  // de los dos por su cuenta. Va sin type a proposito: el mismo <link> pasa a
  // apuntar al .ico, y un type="image/png" que no coincide hace que algunos
  // navegadores lo ignoren.
  icons: { icon: ICONO.light },
};

export const viewport = {
  // El del tema claro, que es el que sale del server. Si el visitante eligio
  // el oscuro, SCRIPT_TEMA lo corrige antes de pintar.
  themeColor: COLOR_BARRA.light,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme sale en claro y SCRIPT_TEMA lo pisa en el cliente antes del
    // primer pintado: el suppressHydrationWarning es para que React no se
    // queje de esa diferencia, y solo alcanza a los atributos del <html>.
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
      </head>
      <body>
        <div className="sg-page-bg" />
        <div className="sg-hero-grid" />
        <a href="#contenido" className="sg-skip-link">
          Saltar al contenido
        </a>
        <Nav />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
