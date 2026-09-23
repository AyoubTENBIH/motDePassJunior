export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  dateModified: string;
  related: string[];
  pillar: string;
  published: boolean;
  body: { heading?: string; paragraphs: string[] }[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "choisir-ecole-maternelle-mohammedia",
    title: "Comment choisir une école maternelle à Mohammedia",
    description:
      "Les critères utiles pour comparer une école maternelle à Mohammedia : langues, encadrement, espaces et première visite.",
    category: "Choisir son école",
    datePublished: "2026-09-23",
    dateModified: "2026-09-23",
    related: [
      "ecole-maternelle-la-coline-mohammedia",
      "criteres-inscription-maternelle-mohammedia",
    ],
    pillar: "/maternelle",
    published: true,
    body: [
      {
        paragraphs: [
          "Choisir une école maternelle à Mohammedia, c'est d'abord trouver un lieu où votre enfant se sentira en sécurité, curieux et accompagné. Le quartier, les langues, le rythme de la journée et la qualité de l'accueil comptent autant que le bâtiment.",
          "Mot de Passe Junior se situe à Mohammedia, au quartier La Coline. L'école accueille le préscolaire, la maternelle et le primaire, avec un enseignement en français, arabe et anglais.",
        ],
      },
      {
        heading: "Ce qu'il est utile de vérifier",
        paragraphs: [
          "Observez les espaces : classes, cour, circulation. Demandez comment les enfants sont accompagnés à l'arrivée et comment l'équipe communique avec les familles.",
          "Clarifiez le projet linguistique. Ici, le français structure la journée, l'arabe ancre l'identité, et l'anglais occupe une place importante dès le plus jeune âge.",
        ],
      },
      {
        heading: "La visite, meilleure première étape",
        paragraphs: [
          "Une visite permet de sentir l'ambiance mieux qu'une fiche. Vous pouvez nous écrire sur WhatsApp pour poser vos questions ou convenir d'un passage à l'école.",
        ],
      },
    ],
  },
  {
    slug: "ecole-maternelle-la-coline-mohammedia",
    title: "École maternelle à La Coline, Mohammedia : ce qu'il faut savoir",
    description:
      "Ce que les familles regardent souvent avant d'inscrire un enfant en maternelle à La Coline, Mohammedia.",
    category: "Choisir son école",
    datePublished: "2026-09-23",
    dateModified: "2026-09-23",
    related: [
      "choisir-ecole-maternelle-mohammedia",
      "education-trilingue-jeune-age",
    ],
    pillar: "/maternelle",
    published: true,
    body: [
      {
        paragraphs: [
          "La Coline, à Mohammedia, concentre plusieurs écoles. Pour une famille, l'enjeu n'est pas seulement « une école près de chez soi », mais un lieu cohérent avec l'âge de l'enfant et le rythme de la maison.",
          "Mot de Passe Junior y propose un parcours maternelle et primaire, dans un cadre pensé pour apprendre, découvrir et grandir.",
        ],
      },
      {
        heading: "Un quartier, une école, un projet",
        paragraphs: [
          "Avant d'inscrire, demandez comment se passe une journée, quelles langues sont réellement parlées en classe, et comment l'enfant est accompagné les premières semaines.",
          "Ces questions valent pour n'importe quelle école du quartier. Elles aident aussi à voir si le projet correspond à votre enfant, pas seulement à une adresse.",
        ],
      },
    ],
  },
  {
    slug: "prescolaire-ou-maternelle-maroc",
    title: "Préscolaire ou maternelle : quelle différence au Maroc ?",
    description:
      "Une explication simple de la différence entre préscolaire et maternelle, pour les parents de Mohammedia.",
    category: "Petite enfance & développement",
    datePublished: "2026-09-23",
    dateModified: "2026-09-23",
    related: [
      "choisir-ecole-maternelle-mohammedia",
      "a-quel-age-commencer-maternelle",
    ],
    pillar: "/prescolaire",
    published: true,
    body: [
      {
        paragraphs: [
          "Les mots « préscolaire » et « maternelle » se recouvrent souvent dans le langage des familles. En pratique, le préscolaire désigne les premiers pas — le jeu, les couleurs, l'adaptation — avant un rythme plus structuré.",
          "À Mot de Passe Junior, le préscolaire est présenté comme le début de l'aventure : des espaces pour apprendre, créer et s'amuser. La maternelle et le primaire prolongent ce chemin.",
        ],
      },
      {
        heading: "Comment s'y retrouver",
        paragraphs: [
          "L'essentiel est l'âge de votre enfant et ce dont il a besoin aujourd'hui : plus de jeu et d'accompagnement, ou déjà un cadre plus scolaire. L'équipe peut vous orienter lors d'un échange, sans remplacer un avis pédagogique personnalisé en visite.",
        ],
      },
    ],
  },
  {
    slug: "education-trilingue-jeune-age",
    title: "Pourquoi une éducation trilingue dès le plus jeune âge",
    description:
      "Français, arabe et anglais à l'école : ce que cela change concrètement pour un jeune enfant.",
    category: "Langues & pédagogie",
    datePublished: "2026-09-23",
    dateModified: "2026-09-23",
    related: [
      "choisir-ecole-maternelle-mohammedia",
      "ecole-maternelle-la-coline-mohammedia",
    ],
    pillar: "/trilingue",
    published: true,
    body: [
      {
        paragraphs: [
          "Un enfant n'apprend pas trois langues comme un adulte apprend un vocabulaire. Il les entend, les chante, les utilise dans le jeu et les routines.",
          "À Mot de Passe Junior, le français est la langue de l'enseignement au quotidien, l'arabe ancre l'identité, et l'anglais a une place importante dès le plus jeune âge.",
        ],
      },
      {
        heading: "Ce que les parents peuvent observer",
        paragraphs: [
          "Demandez comment les langues apparaissent dans la journée — pas seulement sur une affiche. L'objectif n'est pas de « forcer » trois programmes, mais d'ouvrir l'oreille et la confiance.",
        ],
      },
    ],
  },
];

export function getPublishedArticles() {
  return blogArticles.filter((article) => article.published);
}

export function getArticle(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article: BlogArticle) {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((item): item is BlogArticle => Boolean(item));
}
