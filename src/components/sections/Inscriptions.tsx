"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { contact } from "@/lib/content";

export function Inscriptions() {
  return (
    <section id="inscriptions" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Espace haut : cartoon + tête de la fille */}
        <div className="pt-[5.5rem] md:pt-24 lg:pt-28">
          <div className="relative">
            {/* Cartoon — pieds collés au bord haut gauche (ancre bottom:100%) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[clamp(0.85rem,3.2%,1.75rem)] z-30 w-[clamp(4.75rem,13vw,7.25rem)]"
              style={{ bottom: "100%", transform: "translateY(3.5%)" }}
            >
              <Image
                src="/media/icons/inscription-cartoon.png"
                alt=""
                width={578}
                height={614}
                className="h-auto w-full select-none"
                unoptimized
              />
            </div>

            {/* Bandeau coloré (coins arrondis) */}
            <div className="inscription-banner relative overflow-hidden rounded-[2rem] md:rounded-[2.75rem]">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1200 480"
                preserveAspectRatio="none"
                aria-hidden
              >
                <rect width="1200" height="480" fill="var(--coral)" />
                <path
                  d="M660 0
                     C 560 90, 700 160, 660 240
                     C 620 320, 760 360, 720 440
                     C 705 465, 750 475, 745 480
                     L 1200 480 L 1200 0 Z"
                  fill="color-mix(in srgb, var(--green) 52%, white)"
                />
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

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] md:min-h-[340px] lg:min-h-[360px]">
                <div className="flex flex-col justify-center px-8 pb-16 pt-10 md:px-12 md:pb-[4.25rem] md:pt-12 lg:px-16 lg:pt-14">
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
                      stroke="var(--green)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>

                  <p
                    className="mt-5 max-w-[34ch] text-[0.95rem] leading-[1.55] md:mt-6 md:text-[1.05rem] md:leading-[1.6]"
                    style={{ color: "rgba(255,255,255,0.95)" }}
                  >
                    Les inscriptions pour la prochaine rentrée sont ouvertes.
                    Places limitées pour garantir des classes à taille humaine et
                    un accompagnement personnalisé.
                  </p>

                  <div className="relative mt-8 flex flex-wrap items-center gap-3 md:mt-9">
                    <MagneticButton>
                      <Button href={contact.whatsapp} variant="banner">
                        Je pré-inscris mon enfant
                      </Button>
                    </MagneticButton>
                    <MagneticButton>
                      <Button href="#parcours" variant="bannerGhost">
                        Découvrir les parcours
                      </Button>
                    </MagneticButton>
                    <Image
                      src="/media/icons/inscription-arrow.png"
                      alt=""
                      width={120}
                      height={118}
                      className="pointer-events-none absolute left-6 top-full mt-3 w-[3.75rem] md:left-8 md:w-[4.5rem]"
                      unoptimized
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="hidden md:block" aria-hidden />
              </div>

              <div className="relative z-10 flex justify-center px-6 pb-0 pt-2 md:hidden">
                <Image
                  src="/media/images/inscription-fille-nobg.png"
                  alt="Élève Mot de Passe Junior"
                  width={280}
                  height={428}
                  className="h-auto w-[68%] max-w-[250px] object-contain object-bottom drop-shadow-[0_18px_40px_rgba(19,38,70,0.22)]"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Desktop — bas du bandeau, tête qui dépasse vers le haut */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 z-20 hidden md:block"
              style={{ width: "44%", height: "calc(100% + 5.5rem)" }}
            >
              <Image
                src="/media/images/inscription-fille-nobg.png"
                alt="Élève Mot de Passe Junior"
                fill
                className="object-contain object-bottom object-right drop-shadow-[0_20px_44px_rgba(19,38,70,0.28)]"
                sizes="460px"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
