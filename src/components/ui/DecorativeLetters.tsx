"use client";

import { motion, useReducedMotion } from "motion/react";

const letters = [
  { char: "A", color: "#F5A623", x: "6%", y: "16%", rotate: -8, size: "2.4rem" },
  { char: "B", color: "#5FAE3E", x: "88%", y: "10%", rotate: 10, size: "1.9rem" },
  { char: "C", color: "#E4483C", x: "14%", y: "78%", rotate: 6, size: "2.1rem" },
  { char: "J", color: "#1E3A6E", x: "92%", y: "62%", rotate: -12, size: "2.6rem" },
  { char: "U", color: "#F5A623", x: "72%", y: "84%", rotate: 8, size: "1.8rem" },
  { char: "N", color: "#5FAE3E", x: "48%", y: "8%", rotate: -4, size: "1.7rem" },
] as const;

type DecorativeLettersProps = {
  density?: "hero" | "section";
};

export function DecorativeLetters({ density = "hero" }: DecorativeLettersProps) {
  const prefersReducedMotion = useReducedMotion();
  const items = density === "hero" ? letters : letters.slice(0, 4);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {items.map((letter, index) => (
        <motion.span
          key={`${letter.char}-${index}`}
          className="absolute font-display font-semibold leading-none"
          style={{
            left: letter.x,
            top: letter.y,
            color: letter.color,
            fontSize: letter.size,
            opacity: 0.14,
            rotate: `${letter.rotate}deg`,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotate: [
                    letter.rotate,
                    letter.rotate + (index % 2 === 0 ? 3 : -3),
                    letter.rotate,
                  ],
                }
          }
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
        >
          {letter.char}
        </motion.span>
      ))}
    </div>
  );
}
