"use client";

import {
  Fragment,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";
import "./TextLoop.css";

const VIEW_W = 1200;
const VIEW_H = 220;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const EDGE_PAD = 6;
const SEP = "✦";

const buildPath = (
  shape: "wave" | "line" | "circle" | "infinity" | "arch",
  curviness: number,
  ribbonWidth: number,
) => {
  const c = Math.max(0, curviness);
  const room = Math.max(20, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case "circle": {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${CX - r} ${CY} A ${r} ${r} 0 1 1 ${CX + r} ${CY} A ${r} ${r} 0 1 1 ${CX - r} ${CY} Z`;
    }
    case "infinity": {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r} ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r} ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        "Z",
      ].join(" ");
    }
    case "arch": {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise * 1.5} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case "line":
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
    case "wave":
    default: {
      const a = Math.min(c * 2.2, room * 2);
      return `M -320 ${CY} Q -160 ${CY - a} 0 ${CY} T 320 ${CY} T 640 ${CY} T 960 ${CY} T 1280 ${CY} T ${VIEW_W + 320} ${CY}`;
    }
  }
};

function placeLogos(
  textPath: SVGTextPathElement | null,
  images: (SVGImageElement | null)[],
  logoSize: number,
) {
  images.forEach((image) => image?.setAttribute("opacity", "0"));
  if (!textPath) return;

  const content = textPath.textContent ?? "";
  let logoIndex = 0;

  for (let i = 0; i < content.length; i += 1) {
    if (content[i] !== SEP) continue;
    const image = images[logoIndex];
    logoIndex += 1;
    if (!image) continue;
    try {
      const point = textPath.getStartPositionOfChar(i);
      if (
        !Number.isFinite(point.x) ||
        !Number.isFinite(point.y) ||
        point.x < 8 ||
        point.x > VIEW_W - 8
      ) {
        continue;
      }
      const rotation = textPath.getRotationOfChar(i);
      image.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${rotation})`,
      );
      image.setAttribute("x", String(-logoSize / 2));
      image.setAttribute("y", String(-logoSize / 2));
      image.setAttribute("opacity", "1");
    } catch {
      image.setAttribute("opacity", "0");
    }
  }
}

export function TextLoop({
  text = "React ✦ Bits",
  shape = "wave",
  path,
  speed = 90,
  direction = "forward",
  separator = SEP,
  separatorImage,
  curviness = 90,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = "#ffffff",
  ribbon = true,
  ribbonColor = "#5227FF",
  ribbonWidth = 86,
  pauseOnHover = false,
  className = "",
  style = {},
}: {
  text?: string;
  shape?: "wave" | "line" | "circle" | "infinity" | "arch";
  path?: string;
  speed?: number;
  direction?: "forward" | "reverse";
  separator?: string;
  separatorImage?: string;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  pauseOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const headRef = useRef<SVGTextPathElement>(null);
  const tailRef = useRef<SVGTextPathElement>(null);
  const headLogosRef = useRef<(SVGImageElement | null)[]>([]);
  const tailLogosRef = useRef<(SVGImageElement | null)[]>([]);

  const [metrics, setMetrics] = useState({ length: 0, reps: 1 });

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, "")}`;
  const logoSize = Math.round(fontSize * 1.25);

  const d = useMemo(
    () => path || buildPath(shape, curviness, ribbonWidth),
    [path, shape, curviness, ribbonWidth],
  );

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator
      ? `\u00A0\u00A0\u2003${separator}\u2003\u00A0\u00A0`
      : "\u00A0\u00A0\u00A0\u00A0";
    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  const textStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing],
  );

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    if (!pathEl || !measureEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length) return;

      const reps =
        unitWidth > 0 ? Math.max(1, Math.floor(length / unitWidth)) : 1;
      setMetrics((prev) =>
        prev.length === length && prev.reps === reps ? prev : { length, reps },
      );
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [d, unit, fontSize, fontWeight, letterSpacing]);

  useEffect(() => {
    const { length } = metrics;
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !length) return undefined;

    const apply = (offset: number) => {
      const partner = offset >= 0 ? offset - length : offset + length;
      head.setAttribute("startOffset", String(offset));
      tail.setAttribute("startOffset", String(partner));
      if (separatorImage) {
        placeLogos(head, headLogosRef.current, logoSize);
        placeLogos(tail, tailLogosRef.current, logoSize);
      }
    };

    apply(0);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || speed <= 0) return undefined;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === "reverse" ? -length : length,
      duration: length / speed,
      ease: "none",
      repeat: -1,
      onUpdate: () => apply(state.offset),
    });

    return () => {
      tween.kill();
    };
  }, [metrics, speed, direction, pauseOnHover, separatorImage, logoSize]);

  const loopText = unit.repeat(metrics.reps);
  const logoCount = separatorImage
    ? (loopText.match(new RegExp(SEP, "g")) ?? []).length
    : 0;

  const loopChunks = loopText.split(SEP);

  return (
    <div
      ref={rootRef}
      className={`text-loop ${className}`.trim()}
      style={style}
    >
      <svg
        className="text-loop-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={ribbon ? ribbonColor : "none"}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          ref={measureRef}
          className="text-loop-measure"
          style={textStyle}
          aria-hidden
        >
          {unit}
        </text>

        <text
          className="text-loop-text"
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          aria-hidden
        >
          <textPath ref={headRef} href={`#${pathId}`} startOffset={0}>
            {loopChunks.map((chunk, index) => (
              <Fragment key={`head-${index}`}>
                {chunk}
                {index < loopChunks.length - 1 ? (
                  <tspan fill="transparent">{SEP}</tspan>
                ) : null}
              </Fragment>
            ))}
          </textPath>
        </text>

        <text
          className="text-loop-text"
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          aria-hidden
        >
          <textPath ref={tailRef} href={`#${pathId}`} startOffset={0}>
            {loopChunks.map((chunk, index) => (
              <Fragment key={`tail-${index}`}>
                {chunk}
                {index < loopChunks.length - 1 ? (
                  <tspan fill="transparent">{SEP}</tspan>
                ) : null}
              </Fragment>
            ))}
          </textPath>
        </text>

        {separatorImage
          ? Array.from({ length: logoCount }, (_, index) => (
              <image
                key={`head-logo-${index}`}
                ref={(node) => {
                  headLogosRef.current[index] = node;
                }}
                href={separatorImage}
                width={logoSize}
                height={logoSize}
                opacity={0}
                aria-hidden
              />
            ))
          : null}
        {separatorImage
          ? Array.from({ length: logoCount }, (_, index) => (
              <image
                key={`tail-logo-${index}`}
                ref={(node) => {
                  tailLogosRef.current[index] = node;
                }}
                href={separatorImage}
                width={logoSize}
                height={logoSize}
                opacity={0}
                aria-hidden
              />
            ))
          : null}
      </svg>
    </div>
  );
}
