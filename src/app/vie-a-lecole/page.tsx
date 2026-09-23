import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vie à l'école à Mot de Passe Junior",
  description:
    "La vie à Mot de Passe Junior, Mohammedia : ateliers, accueil, classes et moments partagés. On apprend, on découvre, on grandit.",
  path: "/vie-a-lecole",
});

export default function VieEcolePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Vie à l'école"
        title="La vie à Mot de Passe Junior"
        lead="Parce qu'ici, on réussit, on apprend, on découvre — et surtout, on grandit."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Vie à l'école", path: "/vie-a-lecole" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-ink/75">
          <p>
            Kermesses, ateliers créatifs, accueil du matin, salles de classe :
            la vie d&apos;école se voit autant que le programme. Vous pouvez
            aussi parcourir les photos sur la{" "}
            <Link href="/#vie" className="font-semibold text-navy underline decoration-orange/50">
              page d&apos;accueil
            </Link>
            .
          </p>
          <p>
            Les{" "}
            <Link href="/infrastructures" className="font-semibold text-navy underline decoration-orange/50">
              espaces
            </Link>{" "}
            (cour, classes, lieux communs) font partie de ce quotidien.
          </p>
          <PageCta />
        </div>
      </article>
    </SiteChrome>
  );
}
