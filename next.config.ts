import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El hosting es Apache sirviendo archivos: no hay Node corriendo.
  output: "export",
  // next/image necesita un servidor para optimizar; en export no existe.
  images: { unoptimized: true },
  // Emite cada ruta como <ruta>/index.html, que es lo que Apache sirve
  // de forma natural sin reglas de reescritura.
  trailingSlash: true,
};

export default nextConfig;
