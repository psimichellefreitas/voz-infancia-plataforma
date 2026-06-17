import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://voz-infancia-plataforma.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/movimento", changefreq: "weekly", priority: "0.9" },
          { path: "/biblioteca", changefreq: "weekly", priority: "0.9" },
          { path: "/artigos", changefreq: "weekly", priority: "0.8" },
          { path: "/guias", changefreq: "weekly", priority: "0.8" },
          { path: "/videos", changefreq: "weekly", priority: "0.8" },
          { path: "/podcasts", changefreq: "weekly", priority: "0.8" },
          { path: "/protecao-emocional", changefreq: "monthly", priority: "0.8" },
          { path: "/protecao-sexual", changefreq: "monthly", priority: "0.8" },
          { path: "/protecao-digital", changefreq: "monthly", priority: "0.8" },
          { path: "/protecao-social", changefreq: "monthly", priority: "0.8" },
          { path: "/pais", changefreq: "monthly", priority: "0.8" },
          { path: "/profissionais", changefreq: "monthly", priority: "0.8" },
          { path: "/escolas", changefreq: "monthly", priority: "0.8" },
          { path: "/igrejas", changefreq: "monthly", priority: "0.8" },
          { path: "/ferramentas", changefreq: "weekly", priority: "0.8" },
          { path: "/produtos", changefreq: "weekly", priority: "0.8" },
          { path: "/eventos", changefreq: "weekly", priority: "0.8" },
          { path: "/manifesto", changefreq: "monthly", priority: "0.7" },
          { path: "/quem-somos", changefreq: "monthly", priority: "0.7" },
          { path: "/contato", changefreq: "monthly", priority: "0.6" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
