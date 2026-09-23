import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { FaqSection } from "@/components/seo/FaqSection";
import { maternelleFaq } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "École maternelle à Mohammedia, La Coline",
  description:
    "École maternelle à Mohammedia, quartier La Coline. Mot de Passe Junior : jeu, langues (français, arabe, anglais) et accompagnement avant le primaire.",
  path: "/maternelle",
});

export default function MaternellePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Maternelle"
        title="École maternelle à Mohammedia, La Coline"
        lead="Mot de Passe Junior accueille les enfants en maternelle à Mohammedia, au quartier La Coline : un lieu pour apprendre, découvrir et grandir, en français, arabe et anglais."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Maternelle", path: "/maternelle" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink/75">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Une maternelle de quartier, à Mohammedia
            </h2>
            <p className="mt-3">
              L&apos;école se présente comme une deuxième famille : un
              accompagnement de proximité, des espaces colorés, un rythme pensé
              pour l&apos;âge de l&apos;enfant. Le projet tient en quatre mots :
              apprendre, découvrir, grandir, réussir. Il s&apos;adresse aux
              familles de La Coline et du reste de Mohammedia qui cherchent une{" "}
              <Link
                href="/blog/choisir-ecole-maternelle-mohammedia"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                école maternelle
              </Link>{" "}
              où le quotidien se voit, pas seulement s&apos;affiche.
            </p>
            <p className="mt-3">
              [DONNÉE ÉCOLE À CONFIRMER : âge minimum exact et effectif par
              classe]. Tant que ces chiffres ne sont pas confirmés, une visite
              reste le meilleur moyen de juger si le groupe convient à votre
              enfant.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Du préscolaire à la maternelle
            </h2>
            <p className="mt-3">
              Le{" "}
              <Link
                href="/prescolaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                préscolaire
              </Link>{" "}
              ouvre souvent le chemin — jeu, couleurs, premiers pas hors de la
              maison. La maternelle prolonge cette étape, avec un peu plus de
              rituels collectifs, avant le{" "}
              <Link
                href="/primaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                primaire
              </Link>
              . Si les mots se mélangent, lisez{" "}
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
              Le jeu, au centre
            </h2>
            <p className="mt-3">
              Les enfants bougent, créent, se socialisent. Le jeu n&apos;est pas
              l&apos;opposé du travail : c&apos;est le moyen le plus juste
              d&apos;apprendre à cet âge. L&apos;article{" "}
              <Link
                href="/blog/role-du-jeu-apprentissages-maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                Le rôle du jeu dans les apprentissages
              </Link>{" "}
              le détaille. [DONNÉE ÉCOLE À CONFIRMER : organisation d&apos;une
              journée type — un article dédié est en préparation].
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Trois langues, un quotidien
            </h2>
            <p className="mt-3">
              Français, arabe et anglais font partie du projet. Le français
              structure une grande part de la journée, l&apos;arabe ancre
              l&apos;identité, l&apos;anglais entre tôt, surtout par le jeu et
              les rituels. Tout est sur la page{" "}
              <Link
                href="/trilingue"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                école trilingue
              </Link>
              . [DONNÉE ÉCOLE À CONFIRMER : volume horaire par langue].
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Première rentrée
            </h2>
            <p className="mt-3">
              La séparation se prépare. Les articles{" "}
              <Link
                href="/blog/preparer-enfant-premiere-rentree-scolaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                préparer la rentrée
              </Link>{" "}
              et{" "}
              <Link
                href="/blog/premiere-rentree-maternelle-transition"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                une transition en douceur
              </Link>{" "}
              aident les familles. [DONNÉE ÉCOLE À CONFIRMER : protocole
              d&apos;adaptation des premières semaines].
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

          <FaqSection items={maternelleFaq} />
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
