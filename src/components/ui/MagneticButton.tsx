"use client";

import { useRef } from "react";
import gsap from "gsap";
import type { ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function MagneticButton({
  children,
  strength = 0.35,
  className = "",
}: MagneticButtonProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const zone = zoneRef.current;
    const btn = btnRef.current;
    if (!zone || !btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = zone.getBoundingClientRect();
    const x = gsap.utils.mapRange(
      rect.left,
      rect.right,
      -rect.width / 2,
      rect.width / 2,
      e.clientX,
    );
    const y = gsap.utils.mapRange(
      rect.top,
      rect.bottom,
      -rect.height / 2,
      rect.height / 2,
      e.clientY,
    );

    gsap.to(btn, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const onLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: true,
    });
  };

  return (
    <div
      ref={zoneRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex ${className}`}
    >
      <div ref={btnRef} className="inline-flex will-change-transform">
        {children}
      </div>
    </div>
  );
}
