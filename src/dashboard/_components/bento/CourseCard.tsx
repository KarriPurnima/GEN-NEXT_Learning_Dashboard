// src/app/dashboard/_components/bento/CourseCard.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import BentoTile from "./BentoTile";
import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  animationIndex: number;
}

function getIcon(name: string): React.ElementType {
  const icon = (LucideIcons as Record<string, unknown>)[name];
  return (typeof icon === "function" ? icon : LucideIcons.BookOpen) as React.ElementType;
}

function useCountUp(target: number, delay: number = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(0, target, {
      duration: 1.2,
      delay,
      ease: "easeOut",
      onUpdate: (v) => { el.textContent = Math.round(v).toString(); },
    });
    return controls.stop;
  }, [target, delay]);
  return ref;
}

const GLOW_COLORS = ["violet", "cyan", "emerald", "amber", "rose"] as const;

export default function CourseCard({ course, animationIndex }: CourseCardProps) {
  const Icon       = getIcon(course.icon_name);
  const glowColor  = GLOW_COLORS[animationIndex % GLOW_COLORS.length];
  const delay      = animationIndex * 0.1;
  const countRef   = useCountUp(course.progress, delay + 0.4);
  const isComplete = course.progress === 100;

  const progressMV     = useMotionValue(0);
  const progressSpring = useSpring(progressMV, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const t = setTimeout(
      () => progressMV.set(course.progress),
      (delay + 0.3) * 1000
    );
    return () => clearTimeout(t);
  }, [course.progress, delay, progressMV]);

  return (
    <BentoTile className="p-5" glowColor={glowColor}>
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-neutral-800/30 via-transparent to-transparent"
      />

      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 rounded-xl bg-neutral-800/80 p-2.5 ring-1 ring-neutral-700/60">
            <Icon className="h-5 w-5 text-violet-400" strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold leading-snug text-neutral-100 line-clamp-2">
              {course.title}
            </h3>
            {course.category && (
              <span className="mt-1 inline-block text-xs text-neutral-500">
                {course.category}
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-neutral-500">Progress</span>
            <span className="text-xs font-semibold text-neutral-300">
              <span ref={countRef}>0</span>%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
              style={{ width: progressSpring }}
            />
          </div>
        </div>

        {/* Continue Learning button */}
        <Link
          href={`/dashboard/courses/${course.id}`}
          className="
            mt-auto inline-flex items-center justify-center gap-1.5
            rounded-xl bg-violet-600/20 px-4 py-2
            text-xs font-semibold text-violet-300
            ring-1 ring-violet-500/30
            hover:bg-violet-600/30 hover:text-violet-200
            transition-colors duration-200
          "
        >
          {isComplete ? "Review Course →" : "Continue Learning →"}
        </Link>
      </div>
    </BentoTile>
  );
}