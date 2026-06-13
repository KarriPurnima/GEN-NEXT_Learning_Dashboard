"use client";

import { motion } from "framer-motion";

interface SkeletonTileProps {
  className?: string;
  variant?: "hero" | "course" | "activity";
}

export default function SkeletonTile({
  className = "",
  variant = "course",
}: SkeletonTileProps) {
  const shimmer = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  };

  return (
    <motion.article
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={shimmer.animate}
        transition={shimmer.transition}
      />

      {variant === "hero" && (
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="h-7 w-56 animate-pulse rounded-lg bg-white/10" />
            <div className="h-5 w-40 animate-pulse rounded-lg bg-white/[0.07]" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />
            <div className="space-y-2">
              <div className="h-3 w-20 animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-14 animate-pulse rounded-full bg-white/[0.07]" />
            </div>
          </div>
        </div>
      )}

      {variant === "course" && (
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />
            <div className="h-5 w-12 animate-pulse rounded-full bg-white/[0.07]" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-white/10" />
            <div className="h-3 w-1/2 animate-pulse rounded-lg bg-white/[0.07]" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-16 animate-pulse rounded-full bg-white/[0.07]" />
              <div className="h-3 w-8 animate-pulse rounded-full bg-white/[0.07]" />
            </div>
            <div className="h-1.5 w-full animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      )}

      {variant === "activity" && (
        <div className="flex h-full flex-col gap-4">
          <div className="h-4 w-32 animate-pulse rounded-lg bg-white/10" />
          <div className="grid flex-1 grid-cols-12 grid-rows-7 gap-1">
            {Array.from({ length: 84 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-sm bg-white/10"
                style={{ animationDelay: `${(i % 12) * 0.05}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}