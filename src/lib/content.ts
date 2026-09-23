export const navLinks = [
  { href: "/maternelle", label: "Maternelle" },
  { href: "/primaire", label: "Primaire" },
  { href: "/trilingue", label: "Trilingue" },
  { href: "/#vie", label: "Vie à l'école" },
  { href: "/contact", label: "Contact" },
] as const;

/** WhatsApp — 0664617070 (Maroc) */
export const contact = {
  phoneDisplay: "06 64 61 70 70",
  phoneHref: "tel:+212664617070",
  whatsappNumber: "212664617070",
  streetAddress: "Boulevard de la Résistance",
  addressLocality: "Mohammedia",
  postalCode: "28000",
  neighborhood: "La Coline",
  address: "Boulevard de la Résistance, Mohammedia 28000",
  /** Horaires quotidiens : non confirmés par l'école. */
  hours: null,
  /** Lien Maps générique (recherche d'adresse). Pas de pin GPS confirmé. */
  mapsUrl: null,
  whatsapp:
    "https://wa.me/212664617070?text=" +
    encodeURIComponent(
      "Bonjour, je souhaite des informations sur les inscriptions Mot de Passe Junior.",
    ),
} as const;

export function whatsappUrl(text: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function mapsSearchUrl() {
  if (contact.mapsUrl) return contact.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${contact.streetAddress}, ${contact.addressLocality} ${contact.postalCode}`,
  )}`;
}

export const valeurs = [
  {
    image: "/media/icons/valeur-apprendre-t.png",
    title: "Apprendre",
    description: "Un programme riche pensé pour chaque âge.",
  },
  {
    image: "/media/icons/valeur-decouvrir-t.png",
    title: "Découvrir",
    description: "La curiosité au cœur de chaque activité.",
  },
  {
    image: "/media/icons/valeur-grandir-t.png",
    title: "Grandir",
    description: "En confiance, entourés et accompagnés.",
  },
  {
    image: "/media/icons/valeur-reussir-t.png",
    title: "Réussir",
    description: "Préparer l'enfant aux étapes suivantes.",
  },
] as const;

export const heroHighlights = [
  {
    title: "Apprendre",
    description: "Un programme riche pour chaque âge",
    icon: "/media/icons/apprendre.png",
  },
  {
    title: "Découvrir",
    description: "La curiosité au cœur des activités",
    icon: "/media/icons/decouvrir.png",
  },
  {
    title: "Grandir",
    description: "En confiance, accompagnés",
    icon: "/media/icons/grandir.png",
  },
] as const;

export const parcours = [
  {
    id: "prescolaire",
    href: "/prescolaire",
    title: "Préscolaire",
    description:
      "Des couleurs, des jeux, des espaces pour apprendre, créer et s'amuser — les premiers pas de l'aventure.",
    accent: "orange" as const,
    image: "/media/images/parcours-prescolaire.png",
  },
  {
    id: "primaire",
    href: "/primaire",
    title: "Primaire",
    description:
      "De nouvelles classes, de nouvelles découvertes, et toujours plus de choses à apprendre.",
    accent: "green" as const,
    image: "/media/images/parcours-primaire.png",
  },
] as const;

export const espacesRow1 = [
  {
    image: "/media/images/ecole-maternelle-mohammedia-facade.webp",
    alt: "Façade de l'école Mot de Passe Junior à Mohammedia",
  },
  {
    image: "/media/images/ecole-maternelle-mohammedia-classe-prescolaire.webp",
    alt: "Classe préscolaire à Mot de Passe Junior, Mohammedia",
  },
  {
    image: "/media/images/ecole-maternelle-mohammedia-cour-evenements.webp",
    alt: "Cour et moment collectif à Mot de Passe Junior",
  },
  {
    image: "/media/images/ecole-maternelle-mohammedia-salle-de-classe.webp",
    alt: "Salle de classe à Mot de Passe Junior, Mohammedia",
  },
  {
    image: "/media/images/parcours-prescolaire.png",
    alt: "Enfants en préscolaire à Mot de Passe Junior",
  },
] as const;

export const espacesRow2 = [
  {
    image: "/media/images/ecole-maternelle-mohammedia-espaces-communs.webp",
    alt: "Espaces communs de l'école à Mohammedia",
  },
  {
    image: "/media/images/ecole-maternelle-mohammedia-espace-jeux.webp",
    alt: "Espace de jeux à Mot de Passe Junior",
  },
  {
    image: "/media/images/ecole-maternelle-mohammedia-salle-multimedia.webp",
    alt: "Salle multimédia de l'école à Mohammedia",
  },
  {
    image: "/media/images/ecole-maternelle-mohammedia-classe-primaire.webp",
    alt: "Classe primaire à Mot de Passe Junior, Mohammedia",
  },
  {
    image: "/media/images/parcours-primaire.png",
    alt: "Élèves de primaire à Mot de Passe Junior",
  },
] as const;

/** @deprecated use espacesRow1 / espacesRow2 */
export const espaces = [...espacesRow1, ...espacesRow2] as const;

export const langues = ["Français", "Arabe", "Anglais"] as const;

export const trilangues = {
  title: "On apprend en trois langues.",
  underlineWord: "langues",
  left: {
    title: "Français",
    description:
      "La langue de l'enseignement, de la lecture et de la culture au quotidien.",
  },
  center: {
    title: "Anglais",
    description:
      "Une place très importante dès le plus jeune âge, pour s'ouvrir au monde.",
    images: [
      "/media/images/trilangues-facade.png",
      "/media/images/trilangues-ecoliere.png",
    ] as const,
  },
  right: {
    title: "Arabe",
    description:
      "La langue maternelle, ancrée dans notre identité et notre patrimoine.",
  },
  cartoons: {
    left: "/media/icons/cartoon-yellow.png",
    right: "/media/icons/cartoon-green.png",
  },
} as const;

export const vieEcoleColumns = [
  [
    "/media/images/ecole-maternelle-mohammedia-kermesse.webp",
    "/media/images/ecole-maternelle-mohammedia-vie-quotidienne.webp",
    "/media/images/ecole-maternelle-mohammedia-ateliers-creatifs.webp",
    "/media/images/ecole-maternelle-mohammedia-classe-prescolaire.webp",
    "/media/images/ecole-maternelle-mohammedia-bricolage.webp",
  ],
  [
    "/media/images/ecole-maternelle-mohammedia-accueil.webp",
    "/media/images/ecole-maternelle-mohammedia-activites.webp",
    "/media/images/ecole-maternelle-mohammedia-salle-de-classe.webp",
    "/media/images/ecole-maternelle-mohammedia-cour-evenements.webp",
    "/media/images/ecole-maternelle-mohammedia-espace-jeux.webp",
  ],
  [
    "/media/images/ecole-maternelle-mohammedia-espaces-communs.webp",
    "/media/images/ecole-maternelle-mohammedia-salle-multimedia.webp",
    "/media/images/ecole-maternelle-mohammedia-apprentissage.webp",
    "/media/images/ecole-maternelle-mohammedia-classe-primaire.webp",
    "/media/images/ecole-maternelle-mohammedia-enfants.webp",
  ],
] as const;

export const vieEcoleMedia = [
  {
    label: "Mascotte & kermesse",
    tone: "orange" as const,
    image: "/media/images/ecole-maternelle-mohammedia-kermesse.webp",
  },
  {
    label: "Accueil & bienvenue",
    tone: "coral" as const,
    image: "/media/images/ecole-maternelle-mohammedia-accueil.webp",
  },
  {
    label: "Ateliers créatifs",
    tone: "green" as const,
    image: "/media/images/ecole-maternelle-mohammedia-ateliers-creatifs.webp",
  },
  {
    label: "Salles de classe",
    tone: "navy" as const,
    image: "/media/images/ecole-maternelle-mohammedia-salle-de-classe.webp",
  },
  {
    label: "Bricolage & mobiles",
    tone: "orange" as const,
    image: "/media/images/ecole-maternelle-mohammedia-bricolage.webp",
  },
  {
    label: "Salle multimédia",
    tone: "coral" as const,
    image: "/media/images/ecole-maternelle-mohammedia-salle-multimedia.webp",
  },
] as const;

export const videos = {
  hero: "/media/videos/video_presentative.mp4",
  heroPoster: "/media/videos/video_presentative.jpg",
  vie: [
    {
      src: "/media/videos/video2.mp4",
      poster: "/media/videos/video2.jpg",
    },
    {
      src: "/media/videos/video3.mp4",
      poster: "/media/videos/video3.jpg",
    },
    {
      src: "/media/videos/video4.mp4",
      poster: "/media/videos/video4.jpg",
    },
    {
      src: "/media/videos/vid3.mp4",
    },
  ],
} as const;
