import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
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
};

export const viewport = {
  themeColor: "#0a0e1a",
  colorScheme: "dark" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
