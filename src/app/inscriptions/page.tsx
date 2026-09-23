import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { contact } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inscriptions 2026-2027 à Mot de Passe Junior",
  description:
    "Inscriptions 2026-2027 à Mot de Passe Junior, Mohammedia. Préscolaire, maternelle et primaire. Contact WhatsApp et visite de l'école.",
  path: "/inscriptions",
});

export default function InscriptionsPage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Rentrée 2026-2027"
        title="Inscriptions 2026-2027 à Mot de Passe Junior"
        lead="Les inscriptions pour la prochaine rentrée sont ouvertes. Places limitées pour des classes à taille humaine et un accompagnement personnalisé."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Inscriptions", path: "/inscriptions" },
        ]}
      />
      <article className="bg-cream px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink/75">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Qui peut s&apos;inscrire
            </h2>
            <p className="mt-3">
              Le parcours concerne le{" "}
              <Link href="/prescolaire" className="font-semibold text-navy underline decoration-orange/50">
                préscolaire
              </Link>
              , la{" "}
              <Link href="/maternelle" className="font-semibold text-navy underline decoration-orange/50">
                maternelle
              </Link>{" "}
              et le{" "}
              <Link href="/primaire" className="font-semibold text-navy underline decoration-orange/50">
                primaire
              </Link>
              , à Mohammedia.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Les étapes
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Contact (WhatsApp ou formulaire)</li>
              <li>Échange sur l&apos;âge et le niveau</li>
              <li>Visite de l&apos;école, si vous le souhaitez</li>
              <li>Finalisation de l&apos;inscription avec l&apos;équipe</li>
            </ol>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Documents
            </h2>
            <p className="mt-3">
              La liste exacte des pièces est confirmée lors de l&apos;échange
              avec l&apos;école. Nous ne publions ici que ce qui est déjà
              certain : le premier pas se fait par message ou visite.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">FAQ</h2>
            <p className="mt-3">
              Une offre est annoncée pour les 20 premières inscriptions.
              Pour les disponibilités du moment, le plus fiable reste WhatsApp.
            </p>
          </section>
          <div className="flex flex-wrap gap-3">
            <MagneticButton>
              <Button href={contact.whatsapp} variant="primary">
                Écrire sur WhatsApp
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href="/contact" variant="ghost">
                Demander une visite
              </Button>
            </MagneticButton>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
