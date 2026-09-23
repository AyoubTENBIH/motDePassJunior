"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { valeurs } from "@/lib/content";

export function Valeurs() {
  return (
    <section
      id="valeurs"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-12 md:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-orange/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-green/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-dark md:text-sm">
            Notre identité
          </p>
          <h2 className="font-display text-2xl font-bold leading-snug text-navy md:text-3xl lg:text-[2.15rem]">
            Quatre mots qui nous définissent
          </h2>
          <p className="mt-2 whitespace-nowrap text-sm text-ink/65 md:mt-2.5 md:text-base">
            Ces valeurs sont affichées sur nos murs, chaque jour, sous les yeux des enfants.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-12 lg:grid-cols-4 lg:gap-x-10">
          {valeurs.map((valeur, index) => (
            <Reveal key={valeur.title} delay={0.08 * index}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative h-36 w-36 sm:h-44 sm:w-44 lg:h-48 lg:w-48">
                  <Image
                    src={valeur.image}
                    alt={valeur.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 144px, 192px"
                  />
                </div>
                <h3 className="sr-only">{valeur.title}</h3>
                <p className="mt-4 max-w-[16rem] text-sm leading-snug text-ink/70">
                  {valeur.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
