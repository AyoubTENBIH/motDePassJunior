import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageCta } from "@/components/layout/PageCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "École primaire à Mohammedia",
  description:
    "École primaire à Mohammedia, La Coline. Mot de Passe Junior : nouvelles classes, nouvelles découvertes, toujours plus à apprendre.",
  path: "/primaire",
});

export default function PrimairePage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Primaire"
        title="École primaire à Mohammedia"
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
              Un chemin qui grandit
            </h2>
            <p className="mt-3">
              Le primaire prolonge le{" "}
              <Link href="/prescolaire" className="font-semibold text-navy underline decoration-orange/50">
                préscolaire
              </Link>{" "}
              et la{" "}
              <Link href="/maternelle" className="font-semibold text-navy underline decoration-orange/50">
                maternelle
              </Link>
              . L&apos;enfant change d&apos;espaces et de défis, dans la même
              école, avec le même esprit d&apos;accompagnement.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Apprendre et réussir
            </h2>
            <p className="mt-3">
              Un programme plus structuré, sans perdre la curiosité. Les
              langues restent présentes : français, arabe et{" "}
              <Link href="/trilingue" className="font-semibold text-navy underline decoration-orange/50">
                anglais
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
