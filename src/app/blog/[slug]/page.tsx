import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageCta } from "@/components/layout/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichText } from "@/lib/blog/RichText";
import {
  getArticle,
  getPublishedArticles,
  getRelatedArticles,
} from "@/lib/blog";
import { blogPostingJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { robots: { index: false, follow: false } };
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: article.image,
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
      <JsonLd data={blogPostingJsonLd(article)} />
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

          {article.image ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[24px] bg-[#F4F1EA]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          ) : null}

          <div className="mt-10 space-y-8 text-base leading-relaxed text-ink/75">
            {article.body.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={`h2-${index}`}
                    className="font-display text-2xl font-bold text-navy"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3
                    key={`h3-${index}`}
                    className="font-display text-xl font-semibold text-navy"
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={`ul-${index}`} className="list-disc space-y-2 pl-5">
                    {block.items.map((item) => (
                      <li key={item.slice(0, 40)}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={`p-${index}`}>
                  <RichText text={block.text} />
                </p>
              );
            })}
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

          <PageCta
            title="Une question sur l'école ?"
            text="Les inscriptions 2026-2027 se préparent avec l'équipe. Écrivez-nous sur WhatsApp ou demandez une visite à Mohammedia."
          />
        </div>
      </article>
    </SiteChrome>
  );
}
