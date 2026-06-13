// src/app/dashboard/_components/bento/ActivityTile.tsx
// Contribution-graph style activity tile — all mock data, client-rendered.

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import BentoTile from "./BentoTile";

interface ActivityTileProps {
  className?: string;
}

const WEEKS = 15;
const DAYS  = 7;

// Deterministic mock activity levels (0–4)
function generateGrid(): number[][] {
  return Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: DAYS }, (_, d) => {
      const val = Math.sin(w * 0.6 + d * 1.1) * 2 + 2;
      return Math.round(Math.min(4, Math.max(0, val)));
    })
  );
}

const LEVEL_COLORS = [
  "bg-neutral-800",           // 0 — no activity
  "bg-violet-900/70",         // 1
  "bg-violet-700/70",         // 2
  "bg-violet-500/80",         // 3
  "bg-violet-400",            // 4 — peak
];

export default function ActivityTile({ className = "" }: ActivityTileProps) {
  const grid = useMemo(generateGrid, []);

  return (
    <BentoTile className={`p-5 ${className}`} glowColor="violet">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-500">
        Activity
      </p>
      <h2 className="mb-4 text-sm font-semibold text-neutral-300">Last 15 weeks</h2>

      {/* Contribution grid */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (wi * DAYS + di) * 0.004,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`h-3 w-3 rounded-sm ${LEVEL_COLORS[level]}`}
                title={`Level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-xs text-neutral-600">Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-neutral-600">More</span>
      </div>
    </BentoTile>
  );
}