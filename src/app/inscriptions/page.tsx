import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FaqSection } from "@/components/seo/FaqSection";
import { contact } from "@/lib/content";
import { inscriptionsFaq } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inscriptions 2026-2027 à Mohammedia",
  description:
    "Inscriptions 2026-2027 à Mot de Passe Junior, Mohammedia (La Coline). Préscolaire, maternelle et primaire. WhatsApp et visite de l'école.",
  path: "/inscriptions",
});

export default function InscriptionsPage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Rentrée 2026-2027"
        title="Inscriptions 2026-2027 à Mot de Passe Junior, Mohammedia"
        lead="Les inscriptions pour la prochaine rentrée sont ouvertes, à La Coline. Places limitées pour des classes à taille humaine et un accompagnement personnalisé."
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
              <Link
                href="/prescolaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                préscolaire
              </Link>
              , la{" "}
              <Link
                href="/maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                maternelle
              </Link>{" "}
              et le{" "}
              <Link
                href="/primaire"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                primaire
              </Link>
              , à Mohammedia. Si le niveau n&apos;est pas encore clair, lisez{" "}
              <Link
                href="/blog/prescolaire-ou-maternelle-maroc"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                la différence entre préscolaire et maternelle
              </Link>{" "}
              ou{" "}
              <Link
                href="/blog/a-quel-age-commencer-maternelle"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                à quel âge commencer
              </Link>
              .
            </p>
            <p className="mt-3">
              [DONNÉE ÉCOLE À CONFIRMER : âge minimum, effectifs et places
              restantes]. Une offre a déjà été annoncée pour les 20 premières
              inscriptions : les disponibilités du moment se confirment auprès
              de l&apos;équipe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Les étapes
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Premier contact (WhatsApp ou formulaire de la page contact)</li>
              <li>Échange sur l&apos;âge et le niveau</li>
              <li>Visite de l&apos;école à La Coline, si vous le souhaitez</li>
              <li>Finalisation de l&apos;inscription avec l&apos;équipe</li>
            </ol>
            <p className="mt-3">
              Avant de signer, les{" "}
              <Link
                href="/blog/questions-avant-inscrire-ecole-privee"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                5 questions à poser à une école privée
              </Link>{" "}
              aident à rester lucide. Le{" "}
              <Link
                href="/blog/calendrier-scolaire-2026-2027-maroc-mohammedia"
                className="font-semibold text-navy underline decoration-orange/50"
              >
                calendrier scolaire 2026-2027
              </Link>{" "}
              donne le rythme national ; le calendrier interne de l&apos;école
              reste à confirmer. [DONNÉE ÉCOLE À CONFIRMER : calendrier interne].
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy">
              Documents et tarifs
            </h2>
            <p className="mt-3">
              [DONNÉE ÉCOLE À CONFIRMER : liste des pièces, tarifs, frais
              d&apos;inscription et modalités de paiement]. Nous ne publions
              ici aucune estimation. Le premier pas reste un message ou une
              visite.
            </p>
          </section>

          <FaqSection items={inscriptionsFaq} />

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
