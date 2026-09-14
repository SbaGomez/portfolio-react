import type { MetadataRoute } from "next";

// Obligatorio con output: "export", igual que en sitemap.ts.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://sebastiangomez.com.ar/sitemap.xml",
  };
}
