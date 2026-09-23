"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { Reveal } from "@/components/ui/Reveal";
import { GradualBlur } from "@/components/effects/GradualBlur";
import { horizontalLoop } from "@/lib/gsap/horizontalLoop";
import { espacesRow1, espacesRow2 } from "@/lib/content";

const RAIL_REPEAT = 2;
const RAIL_GAP_PX = 20;

type Slide = { image: string; alt: string };

function railSlots(rail: HTMLElement) {
  return Array.from(rail.children) as HTMLElement[];
}

function clearRailTransforms(rail: HTMLElement) {
  gsap.set(railSlots(rail), { clearProps: "transform" });
}

function MarqueeCard({
  slide,
  tall = false,
}: {
  slide: Slide;
  tall?: boolean;
}) {
  return (
    <figure
      className={`espaces-marquee__card ${tall ? "espaces-marquee__card--tall" : "espaces-marquee__card--wide"}`}
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 260px, 320px"
        quality={70}
        draggable={false}
      />
    </figure>
  );
}

function railChildren(slides: readonly Slide[], keyPrefix: string, tall: boolean) {
  const out: ReactNode[] = [];
  for (let r = 0; r < RAIL_REPEAT; r++) {
    slides.forEach((slide, i) => {
      out.push(
        <div
          key={`${keyPrefix}-${r}-${i}`}
          className="espaces-marquee__rail-slot shrink-0"
        >
          <MarqueeCard slide={slide} tall={tall} />
        </div>,
      );
    });
  }
  return out;
}

export function Espaces() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rail1Ref = useRef<HTMLDivElement | null>(null);
  const rail2Ref = useRef<HTMLDivElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const rail1 = rail1Ref.current;
    const rail2 = rail2Ref.current;
    if (!rail1 || !rail2) return;

    let cancelled = false;
    let tl1: ReturnType<typeof horizontalLoop> | null = null;
    let tl2: ReturnType<typeof horizontalLoop> | null = null;
    let layoutSignature = "";
    let installTimer = 0;
    let raf1 = 0;
    let raf2 = 0;

    const killMarquees = () => {
      tl1?.kill();
      tl1 = null;
      tl2?.kill();
      tl2 = null;
      clearRailTransforms(rail1);
      clearRailTransforms(rail2);
    };

    const installMarquees = () => {
      if (cancelled) return;

      const nodes1 = railSlots(rail1);
      const nodes2 = railSlots(rail2);
      if (nodes1.length === 0 || nodes2.length === 0) return;

      const widths1 = nodes1.map((n) => n.getBoundingClientRect().width);
      const widths2 = nodes2.map((n) => n.getBoundingClientRect().width);
      if (
        widths1.some((w) => !Number.isFinite(w) || w < 1) ||
        widths2.some((w) => !Number.isFinite(w) || w < 1)
      ) {
        return;
      }

      const nextSignature = `${widths1.join(",")}|${widths2.join(",")}`;
      if (nextSignature === layoutSignature && tl1 && tl2) return;

      killMarquees();
      layoutSignature = nextSignature;

      tl1 = horizontalLoop(nodes1, {
        repeat: -1,
        paddingRight: RAIL_GAP_PX,
        speed: 0.42,
      });
      tl1.play();

      tl2 = horizontalLoop(nodes2, {
        repeat: -1,
        paddingRight: RAIL_GAP_PX,
        speed: 0.42,
      });
      tl2.progress(1, true);
      gsap.set(tl2, { timeScale: -1 });
      tl2.play();
    };

    const scheduleInstall = () => {
      if (cancelled) return;
      if (installTimer) window.clearTimeout(installTimer);
      installTimer = window.setTimeout(() => {
        installTimer = 0;
        installMarquees();
      }, 40);
    };

    const ro = new ResizeObserver(() => {
      if (!cancelled) scheduleInstall();
    });
    ro.observe(rail1);
    ro.observe(rail2);

    const onImageReady = () => scheduleInstall();
    const images = stageRef.current?.querySelectorAll("img") ?? [];
    images.forEach((img) => {
      img.addEventListener("load", onImageReady);
      img.addEventListener("error", onImageReady);
    });

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) scheduleInstall();
      });
    });

    const t = window.setTimeout(scheduleInstall, 200);
    const tLate = window.setTimeout(scheduleInstall, 700);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (installTimer) window.clearTimeout(installTimer);
      window.clearTimeout(t);
      window.clearTimeout(tLate);
      ro.disconnect();
      images.forEach((img) => {
        img.removeEventListener("load", onImageReady);
        img.removeEventListener("error", onImageReady);
      });
      killMarquees();
    };
  }, [reduceMotion]);

  return (
    <section
      id="espaces"
      className="relative scroll-mt-28 overflow-hidden bg-cream pb-0 pt-14 md:pt-16"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-dark md:text-sm">
            Nos infrastructures
          </p>
          <h2 className="whitespace-nowrap font-display text-2xl font-bold leading-snug text-navy md:text-3xl lg:text-[2.15rem]">
            Des espaces pensés pour{" "}
            <span className="relative inline-block">
              chaque moment
              <svg
                aria-hidden
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 14"
                fill="none"
              >
                <path
                  d="M2 6C40 2 80 2 100 5C130 9 160 3 198 6"
                  stroke="#1E3A6E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 10C45 7 85 7 105 9C135 12 165 8 192 10"
                  stroke="#5B8DEF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
          </h2>
          <p className="mt-2 whitespace-nowrap text-sm text-ink/65 md:mt-2.5 md:text-base">
            Découvrez les lieux où vos enfants apprennent, jouent et grandissent.
          </p>
        </Reveal>
      </div>

      <div ref={stageRef} className="espaces-marquee relative mt-10 md:mt-12">
        <GradualBlur
          target="parent"
          position="left"
          height="clamp(4rem, 12vw, 7rem)"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          zIndex={7}
        />
        <GradualBlur
          target="parent"
          position="right"
          height="clamp(4rem, 12vw, 7rem)"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          zIndex={7}
        />

        {reduceMotion ? (
          <div className="espaces-marquee__static">
            <div className="espaces-marquee__static-row">
              {espacesRow1.map((slide) => (
                <MarqueeCard key={slide.image} slide={slide} tall />
              ))}
            </div>
            <div className="espaces-marquee__static-row">
              {espacesRow2.map((slide) => (
                <MarqueeCard key={slide.image} slide={slide} />
              ))}
            </div>
          </div>
        ) : (
          <div className="espaces-marquee__rows">
            <div className="espaces-marquee__viewport">
              <div ref={rail1Ref} className="espaces-marquee__rail">
                {railChildren(espacesRow1, "r1", true)}
              </div>
            </div>
            <div className="espaces-marquee__viewport">
              <div ref={rail2Ref} className="espaces-marquee__rail">
                {railChildren(espacesRow2, "r2", false)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vague blanche en bas */}
      <div className="pointer-events-none relative z-10 -mt-6 md:-mt-10 lg:-mt-14">
        <svg
          className="block w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 80C120 40 180 100 300 70C420 40 480 20 600 50C720 80 780 100 900 60C1020 20 1080 50 1200 70C1320 90 1380 40 1440 50V120H0V80Z"
            fill="white"
          />
          <path
            d="M0 95C100 70 200 110 340 85C480 60 560 45 700 75C840 105 920 90 1060 65C1200 40 1300 80 1440 70V120H0V95Z"
            fill="white"
            opacity="0.95"
          />
        </svg>
      </div>
    </section>
  );
}
