"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { BubbleMenu, type BubbleMenuItem } from "@/components/ui/BubbleMenu";
import { contact, navLinks } from "@/lib/content";

const hoverPalette = [
  { bgColor: "#f5a623", textColor: "#1e3a6e" },
  { bgColor: "#5fae3e", textColor: "#ffffff" },
  { bgColor: "#1e3a6e", textColor: "#fffbf3" },
  { bgColor: "#e4483c", textColor: "#ffffff" },
  { bgColor: "#1e3a6e", textColor: "#fffbf3" },
] as const;

const bubbleItems: BubbleMenuItem[] = [
  ...navLinks.map((link, index) => ({
    label: link.label,
    href: link.href,
    ariaLabel: link.label,
    rotation: index % 2 === 0 ? -8 : 8,
    hoverStyles: hoverPalette[index] ?? hoverPalette[0],
  })),
  {
    label: "Inscriptions",
    href: contact.whatsapp,
    ariaLabel: "Inscriptions 2026-2027",
    rotation: 8,
    hoverStyles: { bgColor: "#f5a623", textColor: "#1e3a6e" },
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inner = (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-2.5 md:px-8">
      <a href="/" className="group relative z-10 shrink-0">
        <Image
          src="/media/logo-brand-v3.png"
          alt="Mot de Passe Junior"
          width={220}
          height={74}
          priority
          sizes="220px"
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
        <MagneticButton>
          <Button
            href={contact.whatsapp}
            className="!h-10 !px-5 !text-xs md:!text-sm"
          >
            Inscriptions 2026-2027
          </Button>
        </MagneticButton>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <BubbleMenu
          logo={
            <Image
              src="/media/logo-brand-v3.png"
              alt=""
              width={220}
              height={74}
              priority
              className="bubble-logo"
            />
          }
          items={bubbleItems}
          menuAriaLabel="Ouvrir le menu"
          menuBg="#ffffff"
          menuContentColor="#1e3a6e"
          useFixedPosition
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 hidden lg:block">
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
      </header>
    </>
  );
}
