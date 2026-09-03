import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// TODO: trocar pelo domínio oficial quando publicado (https://vozpelainfancia.com.br).
const BASE_URL = "https://vozpelainfancia.com.br";

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
          { path: "/o-movimento", changefreq: "monthly", priority: "0.9" },
          { path: "/metodologia", changefreq: "monthly", priority: "0.9" },
          { path: "/conteudos", changefreq: "weekly", priority: "0.8" },
          { path: "/solucoes", changefreq: "monthly", priority: "0.8" },
          { path: "/participe", changefreq: "monthly", priority: "0.8" },
          { path: "/contato", changefreq: "monthly", priority: "0.5" },
          { path: "/politica-de-privacidade", changefreq: "monthly", priority: "0.3" },
          { path: "/termos-de-uso", changefreq: "monthly", priority: "0.3" },
          { path: "/acessibilidade", changefreq: "monthly", priority: "0.3" },
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
