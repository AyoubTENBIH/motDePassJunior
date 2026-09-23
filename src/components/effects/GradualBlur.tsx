"use client";

import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type RefObject,
} from "react";

const DEFAULT_CONFIG = {
  position: "bottom" as
    | "top"
    | "bottom"
    | "left"
    | "right",
  strength: 2,
  height: "6rem",
  width: "" as string,
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false as boolean | "scroll",
  duration: "0.3s",
  easing: "ease-out",
  opacity: 1,
  curve: "linear" as keyof typeof CURVE_FUNCTIONS,
  responsive: false,
  target: "parent" as "parent" | "page",
  className: "",
  style: {} as CSSProperties,
  hoverIntensity: 0 as number,
};

const PRESETS = {
  top: { position: "top" as const, height: "6rem" },
  bottom: { position: "bottom" as const, height: "6rem" },
  left: { position: "left" as const, height: "6rem" },
  right: { position: "right" as const, height: "6rem" },
  subtle: { height: "4rem", strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: "10rem", strength: 4, divCount: 8, exponential: true },
  smooth: { height: "8rem", curve: "bezier" as const, divCount: 10 },
  sharp: { height: "5rem", curve: "linear" as const, divCount: 4 },
  header: { position: "top" as const, height: "8rem", curve: "ease-out" as const },
  footer: { position: "bottom" as const, height: "8rem", curve: "ease-out" as const },
  sidebar: { position: "left" as const, height: "6rem", strength: 2.5 },
  "page-header": {
    position: "top" as const,
    height: "10rem",
    target: "page" as const,
    strength: 3,
  },
  "page-footer": {
    position: "bottom" as const,
    height: "10rem",
    target: "page" as const,
    strength: 3,
  },
} as const;

const CURVE_FUNCTIONS = {
  linear: (p: number) => p,
  bezier: (p: number) => p * p * (3 - 2 * p),
  "ease-in": (p: number) => p * p,
  "ease-out": (p: number) => 1 - (1 - p) ** 2,
  "ease-in-out": (p: number) =>
    p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2,
} as const;

function mergeConfigs<T extends Record<string, unknown>>(
  ...configs: Partial<T>[]
): T {
  const out = {} as T;
  for (const c of configs) {
    Object.assign(out, c);
  }
  return out;
}

function getGradientDirection(
  position: (typeof DEFAULT_CONFIG)["position"],
) {
  const map = {
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  } as const;
  return map[position] ?? "to bottom";
}

function debounce<T extends (...args: unknown[]) => void>(fn: T, wait: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...a: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
}

type MergedConfig = typeof DEFAULT_CONFIG & {
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
  onAnimationComplete?: () => void;
};

function useResponsiveDimension(
  responsive: boolean,
  config: MergedConfig,
  key: "height" | "width",
) {
  const capKey = key[0].toUpperCase() + key.slice(1);
  const [value, setValue] = useState<string>(() =>
    String(config[key] || ""),
  );

  useEffect(() => {
    if (!responsive) return;

    const calc = () => {
      const w = window.innerWidth;
      let v = String(config[key] || "");
      const mobile = config[`mobile${capKey}` as keyof MergedConfig];
      const tablet = config[`tablet${capKey}` as keyof MergedConfig];
      const desktop = config[`desktop${capKey}` as keyof MergedConfig];
      if (w <= 480 && typeof mobile === "string") v = mobile;
      else if (w <= 768 && typeof tablet === "string") v = tablet;
      else if (w <= 1024 && typeof desktop === "string") v = desktop;
      setValue(v);
    };

    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [responsive, config, key, capKey]);

  return responsive ? value : String(config[key] || "");
}

function useIntersectionObserver(
  ref: RefObject<HTMLDivElement | null>,
  shouldObserve: boolean,
) {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
}

export type GradualBlurProps = Partial<MergedConfig> & {
  preset?: keyof typeof PRESETS;
};

function GradualBlurComponent(props: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { preset, ...restProps } = props;
  const presetConfig =
    preset && preset in PRESETS
      ? PRESETS[preset as keyof typeof PRESETS]
      : {};
  const config = mergeConfigs<MergedConfig>(
    DEFAULT_CONFIG,
    presetConfig as Partial<MergedConfig>,
    restProps as Partial<MergedConfig>,
  );

  const responsiveHeight = useResponsiveDimension(
    config.responsive,
    config,
    "height",
  );
  const responsiveWidth = useResponsiveDimension(
    config.responsive,
    config,
    "width",
  );

  const isVisible = useIntersectionObserver(
    containerRef,
    config.animated === "scroll",
  );

  const blurDivs = useMemo(() => {
    const divs: ReactElement[] = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity
        ? config.strength * config.hoverIntensity
        : config.strength;

    const curveFunc =
      CURVE_FUNCTIONS[config.curve] ?? CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue: number;
      if (config.exponential) {
        blurValue = 2 ** (progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue =
          0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position);

      const divStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== "scroll"
            ? `backdrop-filter ${config.duration} ${config.easing}`
            : undefined,
      };

      divs.push(<div key={i} style={divStyle} aria-hidden />);
    }

    return divs;
  }, [
    config.curve,
    config.divCount,
    config.exponential,
    config.opacity,
    config.position,
    config.strength,
    config.animated,
    config.duration,
    config.easing,
    isHovered,
    config.hoverIntensity,
  ]);

  const containerStyle = useMemo(() => {
    const isVertical = ["top", "bottom"].includes(config.position);
    const isHorizontal = ["left", "right"].includes(config.position);
    const isPageTarget = config.target === "page";

    const baseStyle: CSSProperties = {
      position: isPageTarget ? "fixed" : "absolute",
      pointerEvents: config.hoverIntensity ? "auto" : "none",
      opacity: isVisible ? 1 : 0,
      transition: config.animated
        ? `opacity ${config.duration} ${config.easing}`
        : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style,
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || "100%";
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = "100%";
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [
    config,
    responsiveHeight,
    responsiveWidth,
    isVisible,
  ]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config;

  useEffect(() => {
    if (isVisible && animated === "scroll" && onAnimationComplete) {
      const ms = parseFloat(String(duration)) * 1000;
      const t = window.setTimeout(() => onAnimationComplete(), ms);
      return () => window.clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  const pageClass = config.target === "page" ? "gradual-blur-page" : "gradual-blur-parent";

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${pageClass} ${config.className}`.trim()}
      style={containerStyle}
      onMouseEnter={
        hoverIntensity ? () => setIsHovered(true) : undefined
      }
      onMouseLeave={
        hoverIntensity ? () => setIsHovered(false) : undefined
      }
    >
      <div
        className="gradual-blur-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {blurDivs}
      </div>
    </div>
  );
}

export const GradualBlur = memo(GradualBlurComponent);
GradualBlur.displayName = "GradualBlur";
