export const navLinks = [
  { href: "#parcours", label: "Parcours" },
  { href: "#valeurs", label: "Valeurs" },
  { href: "#espaces", label: "Espaces" },
  { href: "#vie", label: "Vie à l'école" },
  { href: "#contact", label: "Contact" },
] as const;

/** WhatsApp — 0664617070 (Maroc) */
export const contact = {
  phoneDisplay: "06 64 61 70 70",
  phoneHref: "tel:+212664617070",
  whatsapp:
    "https://wa.me/212664617070?text=" +
    encodeURIComponent(
      "Bonjour, je souhaite des informations sur les inscriptions Mot de Passe Junior.",
    ),
} as const;

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
    title: "Préscolaire",
    description:
      "Des couleurs, des jeux, des espaces pour apprendre, créer et s'amuser — les premiers pas de l'aventure.",
    accent: "orange" as const,
    image: "/media/images/parcours-prescolaire.png",
  },
  {
    id: "primaire",
    title: "Primaire",
    description:
      "De nouvelles classes, de nouvelles découvertes, et toujours plus de choses à apprendre.",
    accent: "green" as const,
    image: "/media/images/parcours-primaire.png",
  },
] as const;

export const espacesRow1 = [
  { image: "/media/images/img-06.png", alt: "Façade de l'école" },
  { image: "/media/images/img-11.png", alt: "Classe préscolaire" },
  { image: "/media/images/img-01.png", alt: "Cour et événements" },
  { image: "/media/images/img-14.png", alt: "Salle de classe" },
  { image: "/media/images/parcours-prescolaire.png", alt: "Vie préscolaire" },
] as const;

export const espacesRow2 = [
  { image: "/media/images/img-13.png", alt: "Espaces communs" },
  { image: "/media/images/img-10.png", alt: "Espace de jeux" },
  { image: "/media/images/img-17.png", alt: "Salle multimédia" },
  { image: "/media/images/img-15.png", alt: "Classe primaire" },
  { image: "/media/images/parcours-primaire.png", alt: "Vie primaire" },
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
    "/media/images/img-02.png",
    "/media/images/img-12.png",
    "/media/images/img-09.png",
    "/media/images/img-11.png",
    "/media/images/img-07.png",
  ],
  [
    "/media/images/img-08.png",
    "/media/images/img-16.png",
    "/media/images/img-14.png",
    "/media/images/img-01.png",
    "/media/images/img-10.png",
  ],
  [
    "/media/images/img-13.png",
    "/media/images/img-17.png",
    "/media/images/img-18.png",
    "/media/images/img-15.png",
    "/media/images/img-19.png",
  ],
] as const;

export const vieEcoleMedia = [
  {
    label: "Mascotte & kermesse",
    tone: "orange" as const,
    image: "/media/images/img-02.png",
  },
  {
    label: "Accueil & bienvenue",
    tone: "coral" as const,
    image: "/media/images/img-08.png",
  },
  {
    label: "Ateliers créatifs",
    tone: "green" as const,
    image: "/media/images/img-09.png",
  },
  {
    label: "Salles de classe",
    tone: "navy" as const,
    image: "/media/images/img-14.png",
  },
  {
    label: "Bricolage & mobiles",
    tone: "orange" as const,
    image: "/media/images/img-07.png",
  },
  {
    label: "Salle multimédia",
    tone: "coral" as const,
    image: "/media/images/img-17.png",
  },
] as const;

export const videos = {
  hero: "/media/videos/video_presentative.mp4",
  vie: [
    "/media/videos/video2.mp4",
    "/media/videos/video3.mp4",
    "/media/videos/video4.mp4",
  ],
} as const;
