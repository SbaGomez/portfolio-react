import type { MetadataRoute } from "next";

// Obligatorio con output: "export". Sin esto Next trata la ruta como
// dinamica y el build falla al recolectar la page data.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sebastiangomez.com.ar";
  // Con trailingSlash: true cada ruta es una carpeta con su index.html, asi
  // que la URL canonica lleva barra final.
  return ["", "/sobre-mi", "/proyectos", "/contacto"].map((ruta) => ({
    url: `${base}${ruta}/`,
    lastModified: new Date(),
  }));
}
