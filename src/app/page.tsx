import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Parcours } from "@/components/sections/Parcours";
import { Valeurs } from "@/components/sections/Valeurs";
import { Trilinguisme } from "@/components/sections/Trilinguisme";
import { Espaces } from "@/components/sections/Espaces";
import { VieEcole } from "@/components/sections/VieEcole";
import { Inscriptions } from "@/components/sections/Inscriptions";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Parcours />
        <Valeurs />
        <Trilinguisme />
        <Espaces />
        <VieEcole />
        <Inscriptions />
      </main>
      <Footer />
    </>
  );
}
