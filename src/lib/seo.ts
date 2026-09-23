import type { Metadata } from "next";
import { contact } from "@/lib/content";

export const siteName = "Mot de Passe Junior";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.motdepassejunior.ma";
  return raw.replace(/\/$/, "");
}

export const siteUrl = getSiteUrl();

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? "/media/logo-brand-v3.png");
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "fr_MA",
      type: "website",
      images: [{ url: ogImage }],
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
    url: getSiteUrl(),
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
    areaServed: [contact.addressLocality, contact.neighborhood],
    // geo / hasMap : volontairement absents jusqu'à confirmation GPS
    // et création de la fiche Google Business Profile.
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

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      },
    })),
  };
}

export function blogPostingJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Organization", name: siteName },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/media/logo.png") },
    },
    image: absoluteUrl(article.image ?? "/media/logo-brand-v3.png"),
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  };
}
