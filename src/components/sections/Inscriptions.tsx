"use client";

import Link from "next/link";

/**
 * Étape 1 — Structure seule (sans cartoon / sans photo)
 * Tailles & espacements calqués sur la référence FunCare.
 *
 * Correctif : la boîte ne dépend plus d'une hauteur héritée d'une classe
 * externe ("inscription-banner"). Avant, la grille interne utilisait
 * `h-full min-h-[inherit]` sans hauteur explicite sur le parent, ce qui
 * cassait le calcul de hauteur (vague étirée en zigzag, texte qui déborde
 * hors du bloc coloré). Ici, la hauteur minimale est posée directement en
 * Tailwind sur la grille, et le viewBox du SVG a été rapproché du ratio
 * réel du bloc pour éviter la distorsion de la vague.
 */
export function Inscriptions() {
  return (
    <section
      id="inscriptions"
      className="relative scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="inscription-banner relative overflow-hidden rounded-[2rem] md:rounded-[2.75rem]">
          {/* Fond coral + menthe organique */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 480"
            preserveAspectRatio="none"
            aria-hidden
          >
            <rect width="1200" height="480" fill="#ff452b" />
            {/* Menthe — un seul blob organique, pas de zigzag */}
            <path
              d="M660 0
                 C 560 90, 700 160, 660 240
                 C 620 320, 760 360, 720 440
                 C 705 465, 750 475, 745 480
                 L 1200 480 L 1200 0 Z"
              fill="#7dded3"
            />
            {/* Soft blob blanc pour profondeur */}
            <path
              d="M800 30
                 C 760 100, 900 140, 860 220
                 C 820 300, 940 330, 900 410
                 C 885 440, 940 460, 920 480
                 L 1200 480 L 1200 0 Z"
              fill="#ffffff"
              opacity="0.12"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 md:min-h-[440px] lg:min-h-[480px]">
            {/* Colonne texte */}
            <div className="flex flex-col justify-center px-8 py-14 md:px-12 md:py-16 lg:px-16 lg:py-[4.5rem]">
              <h2 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-tight text-white md:text-[2.7rem] lg:text-[3.1rem]">
                Donnez-leur
                <br />
                le meilleur départ.
              </h2>

              <svg
                className="mt-3 w-24 md:w-[6.5rem]"
                viewBox="0 0 104 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 7 C 12 2, 20 10, 32 6 C 44 2, 52 10, 64 5 C 76 2, 86 9, 103 6"
                  stroke="#2f9e44"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              <p
                className="mt-5 max-w-[34ch] text-[0.95rem] leading-[1.55] md:mt-6 md:text-[1.05rem] md:leading-[1.6]"
                style={{ color: "rgba(255,255,255,0.95)" }}
              >
                Les inscriptions pour la prochaine rentrée sont ouvertes. Places
                limitées pour garantir des classes à taille humaine et un
                accompagnement personnalisé.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-9">
                <Link
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center rounded-full px-7 text-[0.9rem] font-bold transition hover:brightness-105"
                  style={{ backgroundColor: "#ffe600", color: "#ff452b" }}
                >
                  Je pré-inscris mon enfant
                </Link>
                <Link
                  href="#parcours"
                  className="inline-flex h-12 items-center justify-center rounded-full px-6 text-[0.9rem] font-semibold text-white transition hover:bg-white/10"
                  style={{ border: "2.5px solid #ff8a6b" }}
                >
                  Découvrir les parcours
                </Link>
              </div>

              <svg
                className="mt-6 w-11 md:mt-7 md:w-12"
                viewBox="0 0 56 40"
                fill="none"
                aria-hidden
              >
                <path
                  d="M8 30 C 6 16, 18 7, 28 12 C 36 16, 35 28, 24 29 C 17 30, 14 24, 19 21"
                  stroke="#ffe600"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <path
                  d="M34 9 L 46 5 L 42 16"
                  stroke="#ffe600"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Colonne droite — réservée (photo étape suivante) */}
            <div className="hidden md:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}