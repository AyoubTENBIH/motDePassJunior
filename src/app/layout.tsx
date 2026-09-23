import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mot de Passe Junior | École Maternelle & Primaire — Casablanca",
  description:
    "Mot de Passe Junior — Maternelle & Primaire à Casablanca. Un lieu pour apprendre, découvrir, grandir et réussir, en trois langues. Inscriptions 2026-2027 ouvertes.",
  openGraph: {
    title: "Mot de Passe Junior",
    description:
      "École privée maternelle & primaire à Casablanca. Trilinguisme, parcours préscolaire et primaire.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fredoka.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
