import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageIntro } from "@/components/layout/PageIntro";
import { Contact } from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact à Mohammedia",
  description:
    "Contactez Mot de Passe Junior, boulevard de la Résistance à Mohammedia (La Coline). WhatsApp, téléphone et demande de visite. Inscriptions 2026-2027.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteChrome>
      <PageIntro
        eyebrow="Contact"
        title="Contact à Mohammedia"
        lead="Mot de Passe Junior se situe boulevard de la Résistance, à Mohammedia (La Coline). WhatsApp, téléphone, et une visite sur rendez-vous."
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Contact hideHeading />
    </SiteChrome>
  );
}
