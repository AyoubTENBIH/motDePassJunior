import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function PageIntro({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  crumbs: Crumb[];
}) {
  return (
    <header className="bg-cream px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="mb-5 text-xs text-ink/45">
          {crumbs.map((crumb, index) => (
            <span key={crumb.path}>
              {index > 0 && <span className="px-1.5">/</span>}
              {index === crumbs.length - 1 ? (
                <span className="text-ink/70">{crumb.name}</span>
              ) : (
                <Link href={crumb.path} className="hover:text-orange">
                  {crumb.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-dark">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-bold leading-tight text-navy md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">
          {lead}
        </p>
      </div>
    </header>
  );
}
