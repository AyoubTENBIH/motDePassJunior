import type { BlogArticle } from "@/lib/blog/types";
import { article as choisir } from "@/lib/blog/articles/choisir-ecole-maternelle-mohammedia";
import { article as laColine } from "@/lib/blog/articles/ecole-maternelle-la-coline-mohammedia";
import { article as prescolaireOuMaternelle } from "@/lib/blog/articles/prescolaire-ou-maternelle-maroc";
import { article as trilingue } from "@/lib/blog/articles/education-trilingue-jeune-age";
import { article as ageMaternelle } from "@/lib/blog/articles/a-quel-age-commencer-maternelle";
import { article as preparerRentree } from "@/lib/blog/articles/preparer-enfant-premiere-rentree-scolaire";
import { article as premiereRentree } from "@/lib/blog/articles/premiere-rentree-maternelle-transition";
import { article as jeu } from "@/lib/blog/articles/role-du-jeu-apprentissages-maternelle";
import { article as autonomie } from "@/lib/blog/articles/developper-autonomie-enfant-avant-ecole";
import { article as calendrier } from "@/lib/blog/articles/calendrier-scolaire-2026-2027-maroc-mohammedia";
import { article as questions } from "@/lib/blog/articles/questions-avant-inscrire-ecole-privee";
import { article as journeeType } from "@/lib/blog/articles/journee-type-maternelle-mot-de-passe-junior";
import { article as premieresSemaines } from "@/lib/blog/articles/premieres-semaines-accompagnement-mot-de-passe-junior";

export type { BlogArticle, BlogBlock } from "@/lib/blog/types";

export const blogArticles: BlogArticle[] = [
  choisir,
  laColine,
  prescolaireOuMaternelle,
  trilingue,
  ageMaternelle,
  preparerRentree,
  premiereRentree,
  jeu,
  autonomie,
  calendrier,
  questions,
  journeeType,
  premieresSemaines,
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
