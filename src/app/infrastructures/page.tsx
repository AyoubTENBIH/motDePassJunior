import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Infrastructures de l'école à Mohammedia",
  description:
    "Espaces de Mot de Passe Junior à Mohammedia : façade, cour, classes et lieux communs pensés pour chaque moment.",
  path: "/infrastructures",
});

export default function InfrastructuresPage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Espaces"
        title="Des espaces pensés pour chaque moment"
        lead="Découvrez les lieux où les enfants apprennent, jouent et grandissent, à Mohammedia."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Infrastructures", path: "/infrastructures" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-ink/75">
          <p>
            Façade, cour, salles de classe, espaces communs, salle multimédia :
            l&apos;école montre ses lieux sur la{" "}
            <Link href="/#espaces" className="font-semibold text-navy underline decoration-orange/50">
              page d&apos;accueil
            </Link>
            . Une visite reste le meilleur moyen de les voir en vrai.
          </p>
          <p>
            Ces espaces servent le{" "}
            <Link href="/maternelle" className="font-semibold text-navy underline decoration-orange/50">
              préscolaire et la maternelle
            </Link>{" "}
            autant que le{" "}
            <Link href="/primaire" className="font-semibold text-navy underline decoration-orange/50">
              primaire
            </Link>
            .
          </p>
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
