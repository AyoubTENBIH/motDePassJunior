import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageCta } from "@/components/layout/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getArticle,
  getPublishedArticles,
  getRelatedArticles,
} from "@/lib/blog";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, siteName } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Guide des parents", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ];

  return (
    <SiteChrome>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.description,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          author: { "@type": "Organization", name: siteName },
          publisher: { "@type": "Organization", name: siteName },
          mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
        }}
      />
      <article className="bg-cream px-5 pb-20 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Fil d'Ariane" className="mb-5 text-xs text-ink/45">
            <Link href="/" className="hover:text-orange">
              Accueil
            </Link>
            <span className="px-1.5">/</span>
            <Link href="/blog" className="hover:text-orange">
              Guide des parents
            </Link>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-dark">
            {article.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-navy md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-ink/45">
            Publié le {article.datePublished} · Mot de Passe Junior
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            {article.description}
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-ink/75">
            {article.body.map((block, index) => (
              <section key={block.heading ?? index}>
                {block.heading ? (
                  <h2 className="font-display text-2xl font-bold text-navy">
                    {block.heading}
                  </h2>
                ) : null}
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mt-3">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-10">
            <Link
              href={article.pillar}
              className="font-semibold text-navy underline decoration-orange/50"
            >
              Continuer vers la page {article.pillar.replace("/", "")} →
            </Link>
          </p>

          {related.length > 0 ? (
            <aside className="mt-12">
              <h2 className="font-display text-xl font-bold text-navy">
                À lire aussi
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="text-navy hover:text-orange"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
