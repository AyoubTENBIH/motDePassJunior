"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { contact, navLinks } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const inner = (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-2.5 md:px-8">
      <a href="#accueil" className="group relative z-10 shrink-0">
        <Image
          src="/media/logo-brand-v3.png"
          alt="Mot de Passe Junior"
          width={220}
          height={74}
          priority
          className="h-11 w-auto object-contain transition-opacity group-hover:opacity-90 md:h-12"
        />
      </a>

      <nav className="hidden items-center gap-1 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-navy/5 hover:text-navy"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden lg:block">
        <Button href={contact.whatsapp} className="!h-10 !px-5 !text-xs md:!text-sm">
          Inscriptions 2026-2027
        </Button>
      </div>

      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-navy/12 bg-white/80 text-navy lg:hidden"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Menu</span>
        <span className="flex w-5 flex-col gap-1.5">
          <span
            className={`h-0.5 w-full rounded bg-navy transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-full rounded bg-navy transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-full rounded bg-navy transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </span>
      </button>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-all duration-300 ${
          scrolled ? "px-3 pt-3 md:px-5 md:pt-4" : "px-0 pt-0"
        }`}
      >
        {scrolled ? (
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={24}
            brightness={55}
            opacity={0.9}
            blur={20}
            backgroundOpacity={0.78}
            saturation={1.3}
            className="mx-auto max-w-7xl"
          >
            {inner}
          </GlassSurface>
        ) : (
          <div className="bg-transparent">{inner}</div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-3 top-full mt-2 overflow-hidden rounded-[24px] border border-white/50 bg-cream/80 px-5 py-6 shadow-lg backdrop-blur-xl md:inset-x-5 lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-lg font-semibold text-navy"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                href={contact.whatsapp}
                onClick={() => setOpen(false)}
                className="mt-2 w-full"
              >
                Inscriptions 2026-2027
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
