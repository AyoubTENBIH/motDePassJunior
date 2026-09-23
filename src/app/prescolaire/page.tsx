import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Préscolaire à Mohammedia",
  description:
    "Préscolaire à Mohammedia, La Coline. Premiers pas à Mot de Passe Junior : jeu, couleurs, espaces pour apprendre et s'amuser.",
  path: "/prescolaire",
});

export default function PrescolairePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Préscolaire"
        title="École préscolaire à Mohammedia"
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
              Une entrée en douceur
            </h2>
            <p className="mt-3">
              Le préscolaire pose les bases : se sentir en sécurité, explorer,
              commencer à vivre en groupe. Rien n&apos;est précipité. L&apos;enfant
              découvre l&apos;école à son rythme.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Ensuite, la suite du parcours
            </h2>
            <p className="mt-3">
              Le chemin continue en{" "}
              <Link href="/maternelle" className="font-semibold text-navy underline decoration-orange/50">
                maternelle
              </Link>{" "}
              puis en{" "}
              <Link href="/primaire" className="font-semibold text-navy underline decoration-orange/50">
                primaire
              </Link>
              , avec le même fil : apprendre, découvrir, grandir.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Langues dès le plus jeune âge
            </h2>
            <p className="mt-3">
              L&apos;anglais a une place importante tôt, en plus du français et
              de l&apos;arabe. Voir la page{" "}
              <Link href="/trilingue" className="font-semibold text-navy underline decoration-orange/50">
                trilingue
              </Link>
              .
            </p>
          </section>
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
