"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ImageTrail } from "@/components/effects/ImageTrail";
import { LazyVideo } from "@/components/media/LazyVideo";
import { Reveal } from "@/components/ui/Reveal";
import { vieEcoleColumns, videos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const trailImages = [...new Set(vieEcoleColumns.flat())];

export function VieEcole() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isPhone = window.matchMedia("(max-width: 640px)").matches;

      if (!isPhone) {
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
      }

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

        <div className="mx-auto mt-8 grid max-w-[920px] grid-cols-2 gap-[2vw] sm:grid-cols-4 md:mt-10">
          {videos.vie.map((item) => (
            <div
              key={item.src}
              className="vie-video overflow-hidden rounded-[14px] bg-[#f0ebe3]"
            >
              <LazyVideo
                src={item.src}
                poster={item.poster}
                className="h-full w-full object-cover"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
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
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 360px"
                        quality={70}
                      />
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block md:pointer-events-auto">
          <ImageTrail items={trailImages} variant={1} />
        </div>
      </div>
    </section>
  );
}
