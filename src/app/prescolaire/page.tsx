import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { FaqSection } from "@/components/seo/FaqSection";
import { prescolaireFaq } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Préscolaire à Mohammedia, La Coline",
  description:
    "Préscolaire à Mohammedia, quartier La Coline. Premiers pas à Mot de Passe Junior : jeu, séparation en douceur, français, arabe et anglais.",
  path: "/prescolaire",
});

export default function PrescolairePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Préscolaire"
        title="École préscolaire à Mohammedia, La Coline"
        lead="Les premiers pas de l'aventure : des couleurs, des jeux, des espaces pour apprendre, créer et s'amuser — à Mot de Passe Junior, Mohammedia."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Préscolaire", path: "/prescolaire" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink/75">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Une entrée en douceur, à Mohammedia
            </h2>
            <p className="mt-3">
              Le préscolaire pose les bases : se sentir en sécurité, explorer,
              commencer à vivre en groupe. Rien n&apos;est précipité.
              L&apos;enfant découvre l&apos;école à son rythme, au quartier La
              Coline. Ce n&apos;est pas une « mini-maternelle » plus sévère.
              C&apos;est souvent le bon premier collectif.
            </p>
            <p className="mt-3">
              [DONNÉE ÉCOLE À CONFIRMER : âge minimum exact]. Si vous hésitez
              entre les mots, lisez{" "}
              <Link
                href="/blog/prescolaire-ou-maternelle-maroc"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                Préscolaire ou maternelle : quelle différence au Maroc ?
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Jouer pour apprendre
            </h2>
            <p className="mt-3">
              Couleurs, coins jeu, premier graphisme dans le sable plus que sur
              un cahier : le préscolaire vit par le{" "}
              <Link
                href="/blog/role-du-jeu-apprentissages-maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                jeu
              </Link>
              . À la maison, quelques gestes d&apos;
              <Link
                href="/blog/developper-autonomie-enfant-avant-ecole"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                autonomie
              </Link>{" "}
              aident, sans transformer l&apos;été en programme.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Ensuite, la suite du parcours
            </h2>
            <p className="mt-3">
              Le chemin continue en{" "}
              <Link
                href="/maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                maternelle
              </Link>{" "}
              puis en{" "}
              <Link
                href="/primaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                primaire
              </Link>
              , dans le même établissement, avec le même fil : apprendre,
              découvrir, grandir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Langues dès le plus jeune âge
            </h2>
            <p className="mt-3">
              L&apos;anglais a une place importante tôt, en plus du français et
              de l&apos;arabe. Voir la page{" "}
              <Link
                href="/trilingue"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                école trilingue
              </Link>
              . [DONNÉE ÉCOLE À CONFIRMER : organisation des langues en
              préscolaire].
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

          <FaqSection items={prescolaireFaq} />
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
