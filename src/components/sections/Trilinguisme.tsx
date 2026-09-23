"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { trilangues } from "@/lib/content";

function ScallopedBadge({
  bg,
  children,
  size = "md",
}: {
  bg: string;
  children: ReactNode;
  size?: "sm" | "md";
}) {
  const dim =
    size === "sm"
      ? "h-[3.75rem] w-[3.75rem] md:h-[4.25rem] md:w-[4.25rem]"
      : "h-[4.75rem] w-[4.75rem] md:h-[5.25rem] md:w-[5.25rem]";

  return (
    <div className={`relative flex items-center justify-center ${dim}`}>
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        <path
          fill={bg}
          d="M50 4c4.2 0 6.4 3.2 9.8 4.2 3.5 1 7.2-.6 10.2 1.5 3 2.1 3.2 6.2 5.6 8.8 2.4 2.6 6.5 2.8 8.2 5.9 1.7 3.1.1 7-1.1 10.3-1.2 3.3-4.4 5.6-4.4 9.3 0 3.7 3.2 6 4.4 9.3 1.2 3.3 2.8 7.2 1.1 10.3-1.7 3.1-5.8 3.3-8.2 5.9-2.4 2.6-2.6 6.7-5.6 8.8-3 2.1-6.7.5-10.2 1.5-3.4 1-5.6 4.2-9.8 4.2s-6.4-3.2-9.8-4.2c-3.5-1-7.2.6-10.2-1.5-3-2.1-3.2-6.2-5.6-8.8-2.4-2.6-6.5-2.8-8.2-5.9-1.7-3.1-.1-7 1.1-10.3 1.2-3.3 4.4-5.6 4.4-9.3 0-3.7-3.2-6-4.4-9.3-1.2-3.3-2.8-7.2-1.1-10.3 1.7-3.1 5.8-3.3 8.2-5.9 2.4-2.6 2.6-6.7 5.6-8.8 3-2.1 6.7-.5 10.2-1.5C43.6 7.2 45.8 4 50 4z"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </div>
  );
}

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z"
        fill="#2F6B3A"
      />
      <path
        d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v16h5.5A2.5 2.5 0 0 1 20 21.5V5.5Z"
        fill="#3D8B4A"
      />
      <path d="M12 3v16" stroke="#1E4D28" strokeWidth="1.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 5 6v5.5c0 4.4 2.9 8.4 7 9.5 4.1-1.1 7-5.1 7-9.5V6l-7-3Z"
        fill="#F5C542"
      />
      <path
        d="M10.2 12.6 8.8 11.2l-1.3 1.3 2.7 2.7 5-5-1.3-1.3-3.7 3.7Z"
        fill="#2F6B3A"
      />
    </svg>
  );
}

function EducatorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" fill="#2F6B3A" />
      <path
        d="M5.5 19.5c.8-3.4 3.3-5 6.5-5s5.7 1.6 6.5 5"
        stroke="#2F6B3A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="18.2" cy="14.2" r="3.1" fill="#2F6B3A" />
      <path
        d="M16.9 14.2h2.6M18.2 12.9v2.6"
        stroke="#B8E8E0"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SideCartoon({
  src,
  side,
}: {
  src: string;
  side: "left" | "right";
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: side === "left" ? 4.4 : 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute bottom-[22%] z-10 hidden w-[170px] sm:block md:bottom-[26%] md:w-[210px] lg:w-[250px] xl:w-[280px] ${
        side === "left"
          ? "left-1 md:left-3 lg:left-4"
          : "right-1 md:right-3 lg:right-4"
      }`}
    >
      <div className="relative aspect-square w-full">
        <Image
          src={src}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 210px, 280px"
        />
      </div>
    </motion.div>
  );
}

export function Trilinguisme() {
  const { title, underlineWord, left, center, right, cartoons } = trilangues;
  const [before, after] = title.split(underlineWord);

  return (
    <section
      id="trilangues"
      className="relative scroll-mt-24 overflow-hidden bg-[#FEFBEA] pb-20 pt-16 md:pb-24 md:pt-24"
    >
      <SideCartoon src={cartoons.left} side="left" />
      <SideCartoon src={cartoons.right} side="right" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-[2.75rem]">
            {before}
            <span className="relative inline-block whitespace-nowrap">
              {underlineWord}
              <svg
                aria-hidden
                className="absolute -bottom-1 left-0 w-full text-[#4B6FA8]"
                viewBox="0 0 160 10"
                fill="none"
              >
                <path
                  d="M2 6C28 2.5 55 2 78 4.5C105 7.5 132 3.5 158 5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M6 8.5C34 5 62 4.5 86 6.5C112 8.8 136 5.5 154 7"
                  stroke="#7B6BB8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </svg>
            </span>
            {after}
          </h2>
          <p className="mt-4">
            <Link
              href="/trilingue"
              className="text-sm font-semibold text-navy underline decoration-orange/50 hover:text-orange"
            >
              Découvrir l&apos;approche trilingue →
            </Link>
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Français */}
          <Reveal className="flex flex-col items-center text-center">
            <ScallopedBadge bg="#F5C542">
              <BookIcon />
            </ScallopedBadge>
            <h3 className="mt-5 font-display text-xl font-bold text-navy md:text-2xl">
              {left.title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-navy/75 md:text-base">
              {left.description}
            </p>
          </Reveal>

          {/* Anglais + photos en V */}
          <Reveal
            delay={0.08}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-1 flex h-[250px] w-full max-w-[280px] items-end justify-center sm:h-[200px] sm:max-w-[300px]">
              <div className="absolute bottom-10 left-0 z-[1] aspect-[3/4] w-[52%] -rotate-[10deg] overflow-hidden rounded-2xl shadow-[0_12px_28px_-12px_rgba(30,58,110,0.35)]">
                <Image
                  src={center.images[0]}
                  alt="Façade Mot de Passe Junior"
                  fill
                  className="object-cover"
                  sizes="160px"
                  quality={70}
                />
              </div>
              <div className="absolute bottom-10 right-0 z-[2] aspect-[3/4] w-[52%] rotate-[10deg] overflow-hidden rounded-2xl shadow-[0_12px_28px_-12px_rgba(30,58,110,0.35)]">
                <Image
                  src={center.images[1]}
                  alt="Élève Mot de Passe Junior"
                  fill
                  className="object-cover"
                  sizes="160px"
                  quality={70}
                />
              </div>
              <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
                <ScallopedBadge bg="#2F6B3A" size="sm">
                  <ShieldIcon />
                </ScallopedBadge>
              </div>
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-navy md:text-2xl">
              {center.title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-navy/75 md:text-base">
              {center.description}
            </p>
          </Reveal>

          {/* Arabe */}
          <Reveal
            delay={0.16}
            className="flex flex-col items-center text-center"
          >
            <ScallopedBadge bg="#A8DED6">
              <EducatorIcon />
            </ScallopedBadge>
            <h3 className="mt-5 font-display text-xl font-bold text-navy md:text-2xl">
              {right.title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-navy/75 md:text-base">
              {right.description}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
