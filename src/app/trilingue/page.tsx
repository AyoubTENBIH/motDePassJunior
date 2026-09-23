import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { FaqSection } from "@/components/seo/FaqSection";
import { trilingueFaq } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "École trilingue à Mohammedia : français, arabe et anglais",
  description:
    "École trilingue à Mohammedia, La Coline. À Mot de Passe Junior, français, arabe et anglais font partie du quotidien dès le plus jeune âge.",
  path: "/trilingue",
});

export default function TrilinguePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Trilinguisme"
        title="École trilingue à Mohammedia : français, arabe et anglais"
        lead="On apprend en trois langues. L'anglais occupe une place importante dès le plus jeune âge — en plus du français et de l'arabe — à Mot de Passe Junior, La Coline."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Trilingue", path: "/trilingue" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink/75">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Pourquoi les langues tôt, à Mohammedia
            </h2>
            <p className="mt-3">
              Un jeune enfant entend les langues dans le jeu, les chansons et
              les routines. L&apos;objectif n&apos;est pas d&apos;empiler trois
              programmes, mais d&apos;ouvrir l&apos;oreille avec confiance. Le
              détail, pour les parents, est dans l&apos;article{" "}
              <Link
                href="/blog/education-trilingue-jeune-age"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                Pourquoi une éducation trilingue dès le plus jeune âge
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Le français
            </h2>
            <p className="mt-3">
              C&apos;est la langue de l&apos;enseignement, de la lecture et de
              la culture au quotidien — en{" "}
              <Link
                href="/prescolaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                préscolaire
              </Link>
              , en{" "}
              <Link
                href="/maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                maternelle
              </Link>{" "}
              et en{" "}
              <Link
                href="/primaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                primaire
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              L&apos;arabe
            </h2>
            <p className="mt-3">
              La langue maternelle, ancrée dans l&apos;identité et le
              patrimoine. Elle n&apos;est pas une option décorative : elle fait
              partie du projet, y compris dans sa forme quotidienne.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              L&apos;anglais dès le plus jeune âge
            </h2>
            <p className="mt-3">
              Une place importante tôt, pour s&apos;ouvrir au monde, surtout par
              le{" "}
              <Link
                href="/blog/role-du-jeu-apprentissages-maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                jeu
              </Link>{" "}
              et les rituels — pas par des listes trop tôt. [DONNÉE ÉCOLE À
              CONFIRMER : volume horaire exact par langue].
            </p>
          </section>

          <p>
            <Link
              href="/blog/education-trilingue-jeune-age"
              className="font-semibold text-navy hover:text-orange"
            >
              Lire l&apos;article du guide parents →
            </Link>
          </p>

          <FaqSection items={trilingueFaq} />
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
