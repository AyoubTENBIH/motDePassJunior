import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

const styles: Record<Variant, string> = {
  primary: "bg-orange text-white hover:bg-orange-dark",
  secondary: "bg-navy text-cream hover:bg-navy-dark",
  ghost:
    "bg-transparent text-navy border border-navy/20 hover:border-navy/40 hover:bg-navy/5",
  link: "bg-transparent text-navy px-0 border-0 hover:text-orange-dark hover:translate-y-0",
};

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("tel:");
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${styles[variant]} ${className}`;

  if (isExternal(href)) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
