import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "École trilingue à Mohammedia : français, arabe et anglais",
  description:
    "École trilingue à Mohammedia. À Mot de Passe Junior, le français, l'arabe et l'anglais font partie du quotidien, dès le plus jeune âge.",
  path: "/trilingue",
});

export default function TrilinguePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Trilinguisme"
        title="École trilingue à Mohammedia : français, arabe et anglais"
        lead="On apprend en trois langues. L'anglais occupe une place importante dès le plus jeune âge — en plus du français et de l'arabe."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Trilingue", path: "/trilingue" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink/75">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Pourquoi les langues tôt
            </h2>
            <p className="mt-3">
              Un jeune enfant entend les langues dans le jeu, les chansons et
              les routines. L&apos;objectif n&apos;est pas d&apos;empiler trois
              programmes, mais d&apos;ouvrir l&apos;oreille avec confiance.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Le français
            </h2>
            <p className="mt-3">
              C&apos;est la langue de l&apos;enseignement, de la lecture et de
              la culture au quotidien.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              L&apos;arabe
            </h2>
            <p className="mt-3">
              La langue maternelle, ancrée dans l&apos;identité et le
              patrimoine.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              L&apos;anglais dès le préscolaire
            </h2>
            <p className="mt-3">
              Une place très importante dès le plus jeune âge, pour s&apos;ouvrir
              au monde — y compris en{" "}
              <Link href="/prescolaire" className="font-semibold text-navy underline decoration-orange/50">
                préscolaire
              </Link>{" "}
              et en{" "}
              <Link href="/maternelle" className="font-semibold text-navy underline decoration-orange/50">
                maternelle
              </Link>
              .
            </p>
          </section>
          <p>
            <Link href="/blog/education-trilingue-jeune-age" className="font-semibold text-navy hover:text-orange">
              Lire l&apos;article du guide parents →
            </Link>
          </p>
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
