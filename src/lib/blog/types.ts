export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

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
  image?: string;
  /** Raison du brouillon — jamais affiché si published = false */
  draftTodo?: string;
  body: BlogBlock[];
};

export const h2 = (text: string): BlogBlock => ({ type: "h2", text });
export const h3 = (text: string): BlogBlock => ({ type: "h3", text });
export const p = (text: string): BlogBlock => ({ type: "p", text });
export const ul = (...items: string[]): BlogBlock => ({ type: "ul", items });
