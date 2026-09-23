import type { Metadata } from "next";
import { contact } from "@/lib/content";

export const siteUrl = "https://www.motdepassejunior.ma";
export const siteName = "Mot de Passe Junior";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "fr_MA",
      type: "website",
      images: [{ url: absoluteUrl("/media/logo-brand-v3.png") }],
    },
  };
}

export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: siteName,
    description:
      "École maternelle et primaire trilingue à Mohammedia, quartier La Coline.",
    url: siteUrl,
    logo: absoluteUrl("/media/logo.png"),
    telephone: "+212664617070",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mohammedia",
      addressRegion: "Casablanca-Settat",
      addressCountry: "MA",
      streetAddress: contact.address,
    },
    areaServed: ["Mohammedia", "La Coline"],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
