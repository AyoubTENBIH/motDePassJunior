"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DecorativeLetters } from "@/components/ui/DecorativeLetters";
import { contact, heroHighlights, videos } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-[8%] h-[65%] w-[50%] rounded-[48%_52%_45%_55%] bg-[#FFF3D6]" />
        <div className="absolute -left-10 bottom-[10%] h-52 w-52 rounded-full bg-orange/10 blur-3xl" />
        <div className="absolute right-[18%] top-[14%] h-36 w-36 rounded-full bg-green/10 blur-3xl" />
      </div>

      <DecorativeLetters />

      <div className="relative z-10 flex flex-1 items-center px-4 py-5 pt-20 sm:px-6 md:pt-24 lg:px-10 xl:px-14">
        <div className="mx-auto flex w-full max-w-[92rem] flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-3 xl:gap-4">
          {/* Texte élargi */}
          <div className="flex min-w-0 flex-1 flex-col justify-center lg:max-w-[58%]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl"
            >
              <Image
                src="/media/logo-brand-v3.png"
                alt="Mot de Passe Junior — Maternelle & Primaire"
                width={1024}
                height={342}
                priority
                className="h-auto w-full object-contain"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-2 font-display text-[1.45rem] font-bold leading-[1.2] text-navy sm:text-2xl md:mt-3 md:text-[1.85rem] lg:text-[2.15rem]"
            >
              École maternelle et primaire à Mohammedia
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-3 max-w-2xl text-base leading-relaxed text-ink/65 md:text-lg"
            >
              Mot de Passe Junior accueille les enfants en préscolaire,
              maternelle et primaire à Mohammedia, au quartier La Coline, dans
              un environnement bienveillant, stimulant et trilingue.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-4 font-display text-[1.25rem] font-semibold leading-snug text-navy md:text-[1.5rem]"
            >
              <span className="block">On a tous une famille à la maison.</span>
              <span className="mt-1 block text-coral underline decoration-orange decoration-[3px] underline-offset-[10px]">
                Ici, on en découvre une deuxième.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <MagneticButton>
                <Button href={contact.whatsapp} variant="primary">
                  Places limitées — Offre 20 premiers
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="#parcours" variant="ghost">
                  Découvrir l&apos;école
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3"
            >
              {heroHighlights.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center">
                    <Image
                      src={item.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold leading-tight text-navy">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-ink/55 md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Vidéo plus large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-[360px] shrink-0 items-center justify-center sm:max-w-[400px] lg:mx-0 lg:max-w-[420px] xl:max-w-[460px]"
          >
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 bg-navy/8"
              style={{
                borderRadius: "42% 58% 48% 52% / 48% 42% 58% 52%",
              }}
            />
            <div
              aria-hidden
              className="absolute -right-2 -top-3 h-14 w-14 rounded-full border-2 border-dashed border-orange/35"
            />
            <div
              aria-hidden
              className="absolute -bottom-1 -left-1 h-9 w-9 rounded-full bg-green/25"
            />

            <div className="relative w-full overflow-hidden rounded-[28px] shadow-[0_24px_50px_-24px_rgba(30,58,110,0.4)] md:rounded-[32px]">
              <video
                className="h-[80vh] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={videos.hero} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
