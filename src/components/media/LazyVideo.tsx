"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  eager?: boolean;
  "aria-hidden"?: boolean;
};

export function LazyVideo({
  src,
  className,
  poster,
  eager = false,
  "aria-hidden": ariaHidden,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const activate = () => {
      if (video.dataset.ready !== "1") {
        video.src = src;
        video.dataset.ready = "1";
        video.load();
      }
      void video.play().catch(() => {});
    };

    if (eager) {
      activate();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) activate();
        else video.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.05 },
    );

    io.observe(video);
    return () => io.disconnect();
  }, [eager, src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "metadata" : "none"}
      aria-hidden={ariaHidden}
    />
  );
}
