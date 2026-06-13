// src/app/dashboard/_components/bento/HeroTile.tsx

"use client";

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import BentoTile from "./BentoTile";

interface HeroTileProps {
  userName: string;
  streakDays: number;
  className?: string;
}

export default function HeroTile({ userName, streakDays, className = "" }: HeroTileProps) {
  return (
    <BentoTile className={`min-h-[192px] p-6 ${className}`} glowColor="violet">
      {/* Gradient mesh behind content */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[radial-gradient(ellipse_70%_80%_at_0%_100%,rgba(139,92,246,0.18),transparent)]
        "
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Greeting */}
        <div>
          <p className="text-sm font-medium text-neutral-400">Good morning</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-50">
            Welcome back, {userName} 👋
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            You have 3 lessons queued for today.
          </p>
        </div>

        {/* Streak indicator */}
        <div className="mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-orange-950/50 px-4 py-2 ring-1 ring-orange-500/30">
          <Flame className="h-5 w-5 text-orange-400" />
          <span className="text-sm font-semibold text-orange-300">
            {streakDays}-day streak
          </span>
          <Zap className="h-4 w-4 text-orange-400 opacity-70" />
        </div>
      </div>
    </BentoTile>
  );
}