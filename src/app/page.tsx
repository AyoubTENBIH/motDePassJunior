import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Hero } from "@/components/sections/Hero";
import { Parcours } from "@/components/sections/Parcours";
import { Valeurs } from "@/components/sections/Valeurs";
import { Trilinguisme } from "@/components/sections/Trilinguisme";
import { Espaces } from "@/components/sections/Espaces";
import { VieEcole } from "@/components/sections/VieEcole";
import { Inscriptions } from "@/components/sections/Inscriptions";
import { Contact } from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "École maternelle et primaire à Mohammedia | Mot de Passe Junior",
  description:
    "Mot de Passe Junior est une école maternelle et primaire à Mohammedia. Parcours préscolaire et primaire, approche trilingue, inscriptions 2026-2027 ouvertes.",
  path: "/",
});

export default function Home() {
  return (
    <SiteChrome>
      <Hero />
      <Parcours />
      <Valeurs />
      <Trilinguisme />
      <Espaces />
      <VieEcole />
      <Inscriptions />
      <Contact />
    </SiteChrome>
  );
}
