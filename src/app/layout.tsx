import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl, pageMetadata, schoolJsonLd, siteName } from "@/lib/seo";
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
  metadataBase: new URL(getSiteUrl()),
  ...pageMetadata({
    title: "École maternelle et primaire à Mohammedia | Mot de Passe Junior",
    description:
      "Mot de Passe Junior est une école maternelle et primaire à Mohammedia, quartier La Coline. Parcours préscolaire et primaire, approche trilingue, inscriptions 2026-2027 ouvertes.",
    path: "/",
  }),
  title: {
    default: "École maternelle et primaire à Mohammedia | Mot de Passe Junior",
    template: `%s | ${siteName}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fredoka.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={schoolJsonLd()} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
