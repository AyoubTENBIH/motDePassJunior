import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/blog";

const staticRoutes = [
  "/",
  "/maternelle",
  "/prescolaire",
  "/primaire",
  "/trilingue",
  "/inscriptions",
  "/contact",
  "/vie-a-lecole",
  "/infrastructures",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const siteUrl = getSiteUrl();
  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = getPublishedArticles().map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: new Date(article.dateModified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
