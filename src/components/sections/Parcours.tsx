"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { parcours } from "@/lib/content";

function CartoonSide({
  src,
  delay = 0,
}: {
  src: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="hidden h-full lg:flex lg:items-center lg:justify-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="relative h-[min(48vh,380px)] w-full max-w-[180px]"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-contain object-center"
          sizes="180px"
        />
      </motion.div>
    </Reveal>
  );
}

function DecoSide({
  src,
  delay = 0,
}: {
  src: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="hidden h-full lg:flex lg:items-center lg:justify-center"
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="relative aspect-[3/4] max-h-[min(48vh,360px)] w-full max-w-[160px] overflow-hidden rounded-[22px] shadow-md ring-1 ring-navy/5"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover object-center"
          sizes="160px"
        />
      </motion.div>
    </Reveal>
  );
}

export function Parcours() {
  return (
    <section
      id="parcours"
      className="relative scroll-mt-28 overflow-x-hidden bg-cream py-12 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-dark md:text-sm">
            Deux parcours, une même aventure
          </p>
          <h2 className="font-display text-2xl font-bold leading-snug text-navy md:text-3xl lg:text-[2.15rem]">
            Du préscolaire au primaire,{" "}
            <span className="relative inline whitespace-nowrap">
              un chemin qui grandit
              <svg
                aria-hidden
                className="absolute -bottom-0.5 left-0 w-full text-navy"
                viewBox="0 0 220 8"
                fill="none"
              >
                <path
                  d="M2 5C50 1 100 1 120 3C160 6 190 2 218 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            avec votre enfant
          </h2>
          <p className="mt-2 whitespace-nowrap text-sm text-ink/65 md:mt-2.5 md:text-base">
            Des programmes pensés pour accompagner chaque étape de sa croissance.
          </p>
        </Reveal>

        {/* Cartoon | Déco | Box | Box | Déco | Cartoon */}
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-[0.85fr_0.9fr_1.25fr_1.25fr_0.9fr_0.85fr] lg:gap-x-5 lg:gap-y-6">
          <CartoonSide src="/media/icons/cartoon-yellow.png" delay={0.05} />

          <DecoSide src="/media/images/parcours-deco-left.png" delay={0.08} />

          {parcours.map((item, index) => (
            <Reveal key={item.id} delay={0.1 + index * 0.08} className="h-full">
              <Link href={item.href} className="block h-full">
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative aspect-[3/4] max-h-[min(52vh,400px)] w-full overflow-hidden rounded-[24px] shadow-md ring-1 ring-navy/5"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                      {index === 0 ? "01" : "02"}
                    </p>
                    <h3 className="mt-0.5 font-display text-xl font-bold text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-snug text-white/85 md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              </Link>
            </Reveal>
          ))}

          <DecoSide src="/media/images/parcours-deco-right.png" delay={0.2} />

          <CartoonSide src="/media/icons/cartoon-pink.png" delay={0.25} />
        </div>
      </div>
    </section>
  );
}
