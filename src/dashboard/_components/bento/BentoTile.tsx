// src/app/dashboard/_components/bento/BentoTile.tsx
// ─────────────────────────────────────────────────────────────
// Base tile shared by every bento card.
// Handles:
//   • Stagger entrance (reads `tileVariants` from BentoGrid)
//   • Hover scale + border-glow via spring physics
//   • Grain texture overlay for depth
//   • NEVER uses width/height/margin in motion values — only
//     `transform` (scale) and `opacity` to guarantee zero layout shift.
// ─────────────────────────────────────────────────────────────

"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { tileVariants } from "./BentoGrid";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  glowColor?: string; // tailwind color class for the border glow, e.g. "violet"
}

export default function BentoTile({
  children,
  className = "",
  glowColor = "violet",
}: BentoTileProps) {
  // Map glowColor string → actual CSS glow shadow
  const glowMap: Record<string, string> = {
    violet: "0 0 0 1px rgba(139,92,246,0.5), 0 0 24px rgba(139,92,246,0.15)",
    cyan:   "0 0 0 1px rgba(34,211,238,0.5), 0 0 24px rgba(34,211,238,0.15)",
    emerald:"0 0 0 1px rgba(52,211,153,0.5), 0 0 24px rgba(52,211,153,0.15)",
    amber:  "0 0 0 1px rgba(251,191,36,0.5), 0 0 24px rgba(251,191,36,0.15)",
    rose:   "0 0 0 1px rgba(251,113,133,0.5), 0 0 24px rgba(251,113,133,0.15)",
  };

  const hoverGlow = glowMap[glowColor] ?? glowMap.violet;

  return (
    <motion.article
      variants={tileVariants}        // picked up by parent BentoGrid stagger
      whileHover={{
        scale: 1.015,
        boxShadow: hoverGlow,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`
        relative overflow-hidden rounded-2xl
        border border-neutral-800/60
        bg-neutral-900/60 backdrop-blur-md
        shadow-lg
        ${className}
      `}
    >
      {/* Grain texture — pure CSS, no image fetch */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0 rounded-2xl
          opacity-[0.03]
        "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content sits above grain */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.article>
  );
}