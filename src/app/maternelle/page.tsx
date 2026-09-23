import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "École maternelle à Mohammedia",
  description:
    "École maternelle à Mohammedia, quartier La Coline. Mot de Passe Junior accueille les enfants dans un cadre bienveillant, avec français, arabe et anglais.",
  path: "/maternelle",
});

export default function MaternellePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Maternelle"
        title="École maternelle à Mohammedia"
        lead="Mot de Passe Junior accueille les enfants en maternelle à Mohammedia, au quartier La Coline : un lieu pour apprendre, découvrir et grandir, en trois langues."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Maternelle", path: "/maternelle" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink/75">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Pourquoi cette maternelle
            </h2>
            <p className="mt-3">
              L&apos;école se présente comme une deuxième famille : un
              accompagnement de proximité, des espaces colorés, et un rythme
              pensé pour l&apos;âge de l&apos;enfant. Le projet tient en quatre
              mots affichés au quotidien : apprendre, découvrir, grandir,
              réussir.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Les premiers pas
            </h2>
            <p className="mt-3">
              Le{" "}
              <Link href="/prescolaire" className="font-semibold text-navy underline decoration-orange/50">
                préscolaire
              </Link>{" "}
              ouvre le chemin — jeu, couleurs, premiers apprentissages. La
              maternelle prolonge cette étape avant le{" "}
              <Link href="/primaire" className="font-semibold text-navy underline decoration-orange/50">
                primaire
              </Link>
              .
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Approche
            </h2>
            <p className="mt-3">
              Le jeu, la curiosité et la confiance sont au centre. Les enfants
              évoluent dans des classes et des espaces communs conçus pour
              bouger, créer et se socialiser, avec un encadrement de proximité.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Les langues
            </h2>
            <p className="mt-3">
              Français, arabe et anglais font partie du quotidien. Le détail du
              projet linguistique est sur la page{" "}
              <Link href="/trilingue" className="font-semibold text-navy underline decoration-orange/50">
                école trilingue
              </Link>
              .
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Questions fréquentes
            </h2>
            <p className="mt-3">
              Pour les inscriptions, les visites ou le niveau le plus adapté,
              le plus simple est d&apos;écrire sur WhatsApp. L&apos;équipe vous
              oriente selon l&apos;âge de votre enfant.
            </p>
          </section>
          <p>
            <Link href="/blog" className="font-semibold text-navy hover:text-orange">
              Lire le guide des parents →
            </Link>
          </p>
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
