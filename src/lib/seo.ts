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
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
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
      streetAddress: contact.streetAddress,
      addressLocality: contact.addressLocality,
      postalCode: contact.postalCode,
      addressRegion: "Casablanca-Settat",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    hasMap: contact.mapsUrl,
    areaServed: [contact.addressLocality, contact.neighborhood],
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
