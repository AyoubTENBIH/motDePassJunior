import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { FaqSection } from "@/components/seo/FaqSection";
import { primaireFaq } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "École primaire à Mohammedia, La Coline",
  description:
    "École primaire à Mohammedia, La Coline. Mot de Passe Junior prolonge la maternelle : nouvelles classes, langues, et toujours plus à apprendre.",
  path: "/primaire",
});

export default function PrimairePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Primaire"
        title="École primaire à Mohammedia, La Coline"
        lead="De nouvelles classes, de nouvelles découvertes, et toujours plus de choses à apprendre — à Mot de Passe Junior, Mohammedia."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Primaire", path: "/primaire" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink/75">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Un chemin qui grandit, dans le même quartier
            </h2>
            <p className="mt-3">
              Le primaire prolonge le{" "}
              <Link
                href="/prescolaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                préscolaire
              </Link>{" "}
              et la{" "}
              <Link
                href="/maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                maternelle
              </Link>
              . L&apos;enfant change d&apos;espaces et de défis, à Mohammedia,
              La Coline, dans la même école et le même esprit
              d&apos;accompagnement. Ce n&apos;est pas un autre univers : c&apos;est
              la suite.
            </p>
            <p className="mt-3">
              [DONNÉE ÉCOLE À CONFIRMER : niveaux ouverts en 2026-2027 et
              effectifs par classe].
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Apprendre et réussir
            </h2>
            <p className="mt-3">
              Un programme plus structuré, sans perdre la curiosité. Les
              langues restent présentes : français, arabe et{" "}
              <Link
                href="/trilingue"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                anglais
              </Link>
              . [DONNÉE ÉCOLE À CONFIRMER : organisation pédagogique du
              primaire].
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Arriver d&apos;une autre école
            </h2>
            <p className="mt-3">
              Toutes les familles n&apos;ont pas commencé ici. Si votre enfant
              arrive d&apos;ailleurs, dites-le lors de la visite : le rythme, les
              langues, ce qui l&apos;a aidé ou fatigué. L&apos;article{" "}
              <Link
                href="/blog/questions-avant-inscrire-ecole-privee"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                5 questions avant d&apos;inscrire
              </Link>{" "}
              sert aussi au primaire.
            </p>
          </section>

          <p>
            <Link
              href="/blog"
              className="font-semibold text-navy hover:text-orange"
            >
              Lire le guide des parents →
            </Link>
          </p>

          <FaqSection items={primaireFaq} />
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
