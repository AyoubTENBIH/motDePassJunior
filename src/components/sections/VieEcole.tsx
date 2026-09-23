"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/ui/Reveal";
import { vieEcoleColumns, videos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Animation basée sur Codrops Demo 1 — On-Scroll Columns
 * https://github.com/codrops/OnScrollColumnsRows
 */
export function VieEcole() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const columns = gsap.utils.toArray<HTMLElement>(
        grid.querySelectorAll(".vie-column"),
      );

      columns.forEach((column, pos) => {
        gsap.to(column, {
          ease: "none",
          yPercent: -1 * pos * 10,
          scrollTrigger: {
            trigger: grid,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: true,
          },
        });
      });

      const wraps = gsap.utils.toArray<HTMLElement>(
        grid.querySelectorAll(".vie-column__item"),
      );

      wraps.forEach((item) => {
        const image = item.querySelector(".vie-column__img");
        if (!image) return;

        gsap.fromTo(
          image,
          { y: 30 },
          {
            ease: "none",
            y: -30,
            scrollTrigger: {
              trigger: item,
              start: "clamp(top bottom)",
              end: "clamp(bottom top)",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  useLayoutEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(t);
  }, []);

  // Relance l'autoplay dès que les vidéos entrent dans le viewport
  useEffect(() => {
    const root = videosRef.current;
    if (!root) return;
    const nodes = [...root.querySelectorAll("video")];

    const playVisible = () => {
      nodes.forEach((video) => {
        if (video.paused) void video.play().catch(() => {});
      });
    };

    playVisible();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.25 },
    );

    nodes.forEach((video) => io.observe(video));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="vie"
      ref={sectionRef}
      className="relative scroll-mt-28 overflow-hidden bg-white py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-dark md:text-sm">
            Vie à l&apos;école
          </p>
          <h2 className="font-display text-2xl font-bold leading-snug text-navy md:text-3xl lg:text-[2.15rem]">
            La vie à Mot de Passe Junior
          </h2>
          <p className="mt-2 text-sm text-ink/65 md:text-base">
            Parce qu&apos;ici, on réussit, on apprend, on découvre — et surtout, on grandit.
          </p>
        </Reveal>

        {/* Vidéos événements — portrait, autoplay, sans contrôles */}
        <div
          ref={videosRef}
          className="mx-auto mt-8 grid max-w-[720px] grid-cols-3 gap-[2vw] md:mt-10"
        >
          {videos.vie.map((src) => (
            <div
              key={src}
              className="vie-video overflow-hidden rounded-[14px] bg-[#f0ebe3]"
            >
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
              >
                <source src={src} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>

      {/* Colonnes Codrops Demo 1 */}
      <div
        ref={gridRef}
        className="vie-columns mx-auto mt-12 w-full max-w-[1100px] px-4 md:mt-16 md:px-6"
      >
        {vieEcoleColumns.map((column, colIndex) => (
          <div key={colIndex} className="vie-column">
            {column.map((src) => (
              <figure key={`${colIndex}-${src}`} className="vie-column__item">
                <div className="vie-column__imgwrap">
                  <div className="vie-column__img">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 360px"
                    />
                  </div>
                </div>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
