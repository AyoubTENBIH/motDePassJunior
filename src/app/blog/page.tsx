import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { getPublishedArticles } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guide des parents : maternelle à Mohammedia",
  description:
    "Articles pour les familles de Mohammedia : choisir une école maternelle, comprendre le préscolaire, préparer la rentrée 2026-2027.",
  path: "/blog",
});

export default function BlogPage() {
  const articles = getPublishedArticles();

  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Guide des parents"
        title="Des repères utiles, sans remplissage"
        lead="Des articles factuels pour les familles de Mohammedia : choisir une école maternelle, comprendre le préscolaire, les langues et préparer la rentrée 2026-2027."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Guide des parents", path: "/blog" },
        ]}
      />
      <div className="bg-cream px-5 pb-20 md:px-8">
        <ul className="mx-auto max-w-3xl space-y-5">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                className="block rounded-[24px] bg-white px-6 py-5 ring-1 ring-navy/5 transition hover:ring-orange/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-dark">
                  {article.category}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-navy">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {article.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteChrome>
  );
}
